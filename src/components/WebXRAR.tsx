import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

interface PlacedObject {
  id: string
  model: THREE.Group
  modelPath: string
}

interface InventoryItem {
  id: string
  name: string
  modelPath: string
  icon: string
}

const INVENTORY: InventoryItem[] = [
  { id: 'armchair', name: 'Armchair', modelPath: '/models/armchair-scaled.glb', icon: '🪑' },
  { id: 'cat', name: 'Toy Cat', modelPath: '/models/toy-cat.glb', icon: '🐱' },
]

export function WebXRAR() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null)
  const [isInAR, setIsInAR] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [placedObjects, setPlacedObjects] = useState<PlacedObject[]>([])
  const [statusMessage, setStatusMessage] = useState('')
  
  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sessionRef = useRef<XRSession | null>(null)
  const hitTestSourceRef = useRef<XRHitTestSource | null>(null)
  const reticleRef = useRef<THREE.Mesh | null>(null)
  const loaderRef = useRef<GLTFLoader | null>(null)
  const placedObjectsRef = useRef<PlacedObject[]>([])
  const selectedItemRef = useRef<string | null>(null)
  
  // Keep refs in sync with state
  useEffect(() => {
    placedObjectsRef.current = placedObjects
  }, [placedObjects])
  
  useEffect(() => {
    selectedItemRef.current = selectedItem
  }, [selectedItem])

  // Check WebXR support
  useEffect(() => {
    const checkSupport = async () => {
      if (!navigator.xr) {
        setIsARSupported(false)
        return
      }
      try {
        const supported = await navigator.xr.isSessionSupported('immersive-ar')
        setIsARSupported(supported)
      } catch {
        setIsARSupported(false)
      }
    }
    checkSupport()
  }, [])

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.xr.enabled = true
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
    light.position.set(0.5, 1, 0.25)
    scene.add(light)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 5, 5)
    scene.add(directionalLight)

    // Reticle (placement indicator)
    const reticleGeometry = new THREE.RingGeometry(0.1, 0.12, 32)
    reticleGeometry.rotateX(-Math.PI / 2)
    const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial)
    reticle.visible = false
    reticle.matrixAutoUpdate = false
    scene.add(reticle)
    reticleRef.current = reticle

    // GLTF Loader
    loaderRef.current = new GLTFLoader()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  const startAR = async () => {
    if (!navigator.xr || !rendererRef.current) return

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.getElementById('ar-overlay')! }
      })

      sessionRef.current = session
      setIsInAR(true)
      setStatusMessage('Point at a surface to place objects')

      rendererRef.current.xr.setReferenceSpaceType('local')
      await rendererRef.current.xr.setSession(session)

      // Set up hit test
      const referenceSpace = await session.requestReferenceSpace('local')
      const viewerSpace = await session.requestReferenceSpace('viewer')
      
      const hitTestSource = await session.requestHitTestSource!({ space: viewerSpace })
      hitTestSourceRef.current = hitTestSource

      // Handle session end
      session.addEventListener('end', () => {
        setIsInAR(false)
        hitTestSourceRef.current = null
        sessionRef.current = null
        if (reticleRef.current) {
          reticleRef.current.visible = false
        }
      })

      // Handle select (tap to place)
      session.addEventListener('select', () => {
        if (reticleRef.current?.visible && selectedItemRef.current) {
          placeObject(selectedItemRef.current)
        }
      })

      // Render loop
      rendererRef.current.setAnimationLoop((timestamp, frame) => {
        if (!frame || !sceneRef.current || !cameraRef.current || !rendererRef.current) return

        const hitTestResults = frame.getHitTestResults(hitTestSourceRef.current!)
        
        if (hitTestResults.length > 0 && reticleRef.current) {
          const hit = hitTestResults[0]
          const pose = hit.getPose(referenceSpace)
          
          if (pose) {
            reticleRef.current.visible = selectedItemRef.current !== null
            reticleRef.current.matrix.fromArray(pose.transform.matrix)
          }
        } else if (reticleRef.current) {
          reticleRef.current.visible = false
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current)
      })

    } catch (error) {
      console.error('Failed to start AR:', error)
      setStatusMessage('Failed to start AR session')
    }
  }

  const placeObject = async (itemId: string) => {
    const item = INVENTORY.find(i => i.id === itemId)
    if (!item || !loaderRef.current || !sceneRef.current || !reticleRef.current) return

    setStatusMessage(`Placing ${item.name}...`)

    try {
      const gltf = await loaderRef.current.loadAsync(item.modelPath)
      const model = gltf.scene

      // Position at reticle
      const position = new THREE.Vector3()
      const quaternion = new THREE.Quaternion()
      const scale = new THREE.Vector3()
      reticleRef.current.matrix.decompose(position, quaternion, scale)
      
      model.position.copy(position)
      model.quaternion.copy(quaternion)
      
      // Add to scene
      sceneRef.current.add(model)

      // Track placed object
      const placedObj: PlacedObject = {
        id: `${itemId}-${Date.now()}`,
        model,
        modelPath: item.modelPath
      }
      
      setPlacedObjects(prev => [...prev, placedObj])
      setStatusMessage(`${item.name} placed! Select another or tap existing to move.`)
      
    } catch (error) {
      console.error('Failed to load model:', error)
      setStatusMessage('Failed to load model')
    }
  }

  const exitAR = () => {
    sessionRef.current?.end()
  }

  const clearAll = () => {
    placedObjectsRef.current.forEach(obj => {
      sceneRef.current?.remove(obj.model)
    })
    setPlacedObjects([])
    setStatusMessage('All objects cleared')
  }

  if (isARSupported === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Checking AR support...</p>
      </div>
    )
  }

  if (isARSupported === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 text-center">
        <p className="text-xl mb-4">WebXR AR not supported on this device</p>
        <p className="text-gray-400 mb-4">
          This feature requires an ARCore-compatible Android device with Chrome.
        </p>
        <a 
          href="/ar-test.html" 
          className="bg-blue-500 px-6 py-3 rounded-full font-semibold"
        >
          Try Single-Object AR Instead
        </a>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Three.js container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* AR Overlay UI */}
      <div id="ar-overlay" className="absolute inset-0 pointer-events-none">
        {!isInAR ? (
          // Start screen
          <div className="flex flex-col items-center justify-center h-full text-white p-4 pointer-events-auto">
            <h1 className="text-3xl font-bold mb-4">🏠 AR Room Builder</h1>
            <p className="text-gray-300 mb-8 text-center">
              Place multiple items in your real room using AR!
            </p>
            <button
              onClick={startAR}
              className="bg-green-500 px-8 py-4 rounded-full text-xl font-bold hover:bg-green-600 transition-all"
            >
              Start AR Experience
            </button>
          </div>
        ) : (
          // In-AR UI
          <>
            {/* Status bar */}
            <div className="absolute top-4 left-4 right-4 bg-black/50 rounded-lg p-3 pointer-events-auto">
              <p className="text-white text-sm">{statusMessage}</p>
            </div>

            {/* Exit button */}
            <button
              onClick={exitAR}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full pointer-events-auto"
            >
              Exit AR
            </button>

            {/* Clear button */}
            {placedObjects.length > 0 && (
              <button
                onClick={clearAll}
                className="absolute top-16 right-4 bg-gray-700 text-white px-4 py-2 rounded-full pointer-events-auto"
              >
                Clear All ({placedObjects.length})
              </button>
            )}

            {/* Inventory */}
            <div className="absolute bottom-8 left-4 right-4 pointer-events-auto">
              <p className="text-white text-xs mb-2 text-center">Tap an item, then tap the floor to place:</p>
              <div className="flex justify-center gap-3">
                {INVENTORY.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                      selectedItem === item.id
                        ? 'bg-green-500 scale-110'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-white text-xs mt-1">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
