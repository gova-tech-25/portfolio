import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      primitive: any;
      bufferGeometry: any;
      bufferAttribute: any;
      points: any;
      pointsMaterial: any;
      group: any;
      ringGeometry: any;
      meshBasicMaterial: any;
      icosahedronGeometry: any;
      ambientLight: any;
      directionalLight: any;
    }
  }
}
