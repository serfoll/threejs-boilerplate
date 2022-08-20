uniform vec4 uCorners;
uniform float uProgress;
uniform vec2 uQuadSize;
uniform vec2 uResolution;
uniform float time;

varying vec2 vUv;
varying vec2 vSize;


void main(){
  float PI = 3.1415926;
  vUv = uv;

  //Corner animation
  //combining the corners progressions into one, mixing it with the uv
  float cornersProgress = mix(
    mix(uCorners.z,uCorners.w,vUv.x),
    mix(uCorners.x,uCorners.y,vUv.x),
    vUv.y
  );

  float sine = sin(PI * 2.0 * cornersProgress);
  float waves = sine * 0.1 * sin(5. * length(vUv));

  vec4 defaultState = modelMatrix * vec4(position, 1.0);
  vec4 fullScreenState = vec4(position, 1.0);

  //increase scale on each step of the animation
  fullScreenState.x *= uResolution.x/uQuadSize.x;
  fullScreenState.y *= uResolution.y/uQuadSize.y;

  

  //changing scale on each step of the animation
  vec4 finalState = mix(defaultState,fullScreenState,cornersProgress + waves);

  //get size on each step of the animation
  vSize = mix(uQuadSize,uResolution,uProgress);

  gl_Position = projectionMatrix * viewMatrix * finalState;
  
}