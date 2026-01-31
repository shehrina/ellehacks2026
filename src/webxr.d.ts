// WebXR type declarations for TypeScript

interface XRHitTestSource {
  cancel(): void
}

interface XRHitTestResult {
  getPose(baseSpace: XRSpace): XRPose | null
}

interface XRFrame {
  getHitTestResults(hitTestSource: XRHitTestSource): XRHitTestResult[]
}

interface XRSession {
  requestHitTestSource?(options: { space: XRSpace }): Promise<XRHitTestSource>
}

interface XRSessionInit {
  domOverlay?: { root: Element }
}
