uniform float uProgress;
uniform vec2 uQuadSize;
uniform vec2 uResolution;
uniform float time;

varying vec2 vUv;
varying vec2 vSize;

void main(){
  vUv = uv;

  vec4 defaultState = modelMatrix * vec4(position, 1.0);
  vec4 fullScreenState = vec4(position, 1.0);
  //increase scale on each step of the animation
  fullScreenState.x *= uResolution.x/uQuadSize.x;
  fullScreenState.y *= uResolution.y/uQuadSize.y;

  //changing scale on each step of the animation
  vec4 finalState = mix(defaultState,fullScreenState,uProgress);

  //get size on each step of the animation
  vSize = mix(uQuadSize,uResolution,uProgress);

  gl_Position = projectionMatrix * viewMatrix * finalState;

  
}