import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import fragmentShader from './shaders/fragment.glsl'
import vertexShader from './shaders/vertex.glsl'

// texture/images
import testTexture from '../shared/img/texture.jpg'

console.log(testTexture)
export default class Sketch {
  constructor(options) {
    this.container = options.domElement
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth

    this.camera = new THREE.PerspectiveCamera(
      80,
      this.width / this.height,
      10,
      1000
    )
    this.camera.position.z = 600
    this.camera.fov = (2 * Math.atan(this.height / 2 / 600) * 180) / Math.PI

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.scene = new THREE.Scene()
    this.container.appendChild(this.renderer.domElement)

    this.controlls = new OrbitControls(this.camera, this.renderer.domElement)

    this.time = 0

    this.resize()
    this.addObject()
    this.render()

    this.onResize()
  }

  addObject() {
    // this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    // this.material = new THREE.MeshNormalMaterial()
    this.geometry = new THREE.SphereBufferGeometry(0.3, 130, 130)
    this.geometry = new THREE.PlaneBufferGeometry(350, 350, 100, 100)

    // this.material = new THREE.MeshBasicMaterial({
    //   color: 0xf000ff
    // })

    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      uniforms: {
        resolution: { value: new THREE.Vector2() },
        time: { value: 0 },
        uTexture: { value: new THREE.TextureLoader().load(testTexture) }
      },
      vertexShader: vertexShader
      // wireframe: true
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.mesh)
  }

  render() {
    this.time += 0.05

    this.material.uniforms.time.value = this.time

    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }

  resize() {
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth

    this.camera.aspect = this.width / this.height
    this.renderer.setSize(this.width, this.height)

    this.camera.updateProjectionMatrix()
  }

  onResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }
}
