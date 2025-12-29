import { ReactThreeFiber, ThreeElements } from '@react-three/fiber'
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        orbitControls: ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl>
      }
    }
  }
}
