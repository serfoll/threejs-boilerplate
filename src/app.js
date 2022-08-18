import Sketch from './app/Sketch'

class App {
  constructor() {
    this.sketch = new Sketch({
      domElement: document.getElementById('container')
    })
  }
}

new App()
