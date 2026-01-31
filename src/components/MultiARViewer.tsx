import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface PlacedModel {
  id: string
  modelPath: string
  name: string
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: number
}

interface MultiARViewerProps {
  items: Array<{ id: string; modelPath: string; name: string }>
  onPlaceModel?: (modelId: string, position: THREE.Vector3) => void
}

export function MultiARViewer({ items, onPlaceModel }: MultiARViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isARSupported, setIsARSupported] = useState(false)
  const [isARSessionActive, setIsARSessionActive] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(items[0]?.id || null)
  const [placedModels, setPlacedModels] = useState<PlacedModel[]>([])
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controllerRef = useRef<THREE.Group | null>(null)
  const hitTestSourceRef = useRef<XRHitTestSource | null>(null)
  const sessionRef = useRef<XRSession | null>(null)
  const modelsRef = useRef<Map<string, THREE.Group>>(new Map())

  useEffect(() => {
    // Check WebXR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported)
      })
    } else {
      setIsARSupported(false)
    }
  }, [])

  const loadModel = async (modelPath: string): Promise<THREE.Group> => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader()
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene
          model.scale.set(0.5, 0.5, 0.5) // Scale down models
          resolve(model)
        },
        undefined,
        reject
      )
    })
  }

  const startARSession = async () => {
    if (!navigator.xr || !containerRef.current) return

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor', 'hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: containerRef.current },
      })

      sessionRef.current = session

      // Set up Three.js scene
      const scene = new THREE.Scene()
      sceneRef.current = scene

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
      cameraRef.current = camera

      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        xr: true 
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      containerRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Set up lighting
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(1, 1, 1)
      scene.add(light)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      // Set up controller for hit testing
      const controller = renderer.xr.getController(0)
      controller.addEventListener('select', onSelect)
      scene.add(controller)
      controllerRef.current = controller

      // Set up hit test source
      const referenceSpace = await renderer.xr.getReferenceSpace()
      const viewerSpace = await session.requestReferenceSpace('viewer')
      const hitTestSource = await session.requestHitTestSource({ space: viewerSpace })
      hitTestSourceRef.current = hitTestSource

      // Start render loop
      renderer.setAnimationLoop(() => {
        if (controllerRef.current && hitTestSourceRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
          const frame = renderer.xr.getFrame()
          if (frame) {
            const referenceSpace = renderer.xr.getReferenceSpace()
            if (referenceSpace && controllerRef.current) {
              const hitTestResults = hitTestSourceRef.current.getHitTestResults(frame)
              if (hitTestResults.length > 0) {
                const hit = hitTestResults[0]
                const pose = hit.getPose(referenceSpace)
                if (pose) {
                  // Show preview of where model will be placed
                  // You can add a preview object here
                }
              }
            }
          }
        }
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
      })

      setIsARSessionActive(true)

      session.addEventListener('end', () => {
        setIsARSessionActive(false)
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
        rendererRef.current = null
        sceneRef.current = null
        cameraRef.current = null
        controllerRef.current = null
        hitTestSourceRef.current = null
        sessionRef.current = null
      })
    } catch (error) {
      console.error('Failed to start AR session:', error)
      alert('AR is not supported on this device or browser. Please use Safari on iOS or Chrome on Android.')
    }
  }

  const onSelect = async () => {
    if (!selectedItemId || !hitTestSourceRef.current || !rendererRef.current || !sceneRef.current) return

    const frame = rendererRef.current.xr.getFrame()
    if (!frame) return

    const referenceSpace = rendererRef.current.xr.getReferenceSpace()
    if (!referenceSpace) return

    const hitTestResults = hitTestSourceRef.current.getHitTestResults(frame)
    if (hitTestResults.length === 0) return

    const hit = hitTestResults[0]
    const pose = hit.getPose(referenceSpace)
    if (!pose) return

    const selectedItem = items.find((item) => item.id === selectedItemId)
    if (!selectedItem) return

    // Load and place the model
    try {
      const model = await loadModel(selectedItem.modelPath)
      const position = new THREE.Vector3(
        pose.transform.position.x,
        pose.transform.position.y,
        pose.transform.position.z
      )
      const rotation = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion(
          pose.transform.orientation.x,
          pose.transform.orientation.y,
          pose.transform.orientation.z,
          pose.transform.orientation.w
        )
      )

      model.position.copy(position)
      model.rotation.copy(rotation)

      if (sceneRef.current) {
        sceneRef.current.add(model)
        modelsRef.current.set(selectedItem.id, model)

        const placedModel: PlacedModel = {
          id: `${selectedItem.id}-${Date.now()}`,
          modelPath: selectedItem.modelPath,
          name: selectedItem.name,
          position: position.clone(),
          rotation: rotation.clone(),
          scale: 0.5,
        }

        setPlacedModels((prev) => [...prev, placedModel])
        onPlaceModel?.(selectedItem.id, position)
      }
    } catch (error) {
      console.error('Failed to load model:', error)
    }
  }

  const stopARSession = () => {
    if (sessionRef.current) {
      sessionRef.current.end()
    }
  }

  if (!isARSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          WebXR AR is not supported on this device. Please use Safari on iOS 12+ or Chrome on Android.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Item Selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Item to Place:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedItemId === item.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* AR Container */}
      <div ref={containerRef} className="w-full h-96 bg-black rounded-lg overflow-hidden" />

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        {!isARSessionActive ? (
          <button
            onClick={startARSession}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Start AR
          </button>
        ) : (
          <>
            <button
              onClick={stopARSession}
              className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Stop AR
            </button>
            <p className="text-sm text-gray-600 self-center px-4">
              Tap to place {items.find((i) => i.id === selectedItemId)?.name || 'item'}
            </p>
          </>
        )}
      </div>

      {/* Placed Models Info */}
      {placedModels.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ Placed {placedModels.length} item(s) in AR scene
          </p>
        </div>
      )}
    </div>
  )
}
