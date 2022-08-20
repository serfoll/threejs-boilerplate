uniform float time;
uniform sampler2D uTexture;

varying float pulse;
varying vec2 vUv;

void main() {

  vec4 sampleTexture = texture(uTexture, vUv + 0.01 * sin(vUv * 20. + time));

  float sinePulse = (1. + sin(vUv.x * 40. + time)) * 0.5;  
  gl_FragColor = vec4(vUv,0.,1.);
  gl_FragColor = vec4(sinePulse,0.,0.,1.);
  gl_FragColor = sampleTexture;

}