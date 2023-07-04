import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
scene.background = new THREE.Color('hsl(0, 0%, 10%)')

// Setup the frustum for the perspective camera
const fov: number = 100; // field of view: degrees in vertical
const aspect: number = (window.innerWidth / 2.1) / window.innerHeight; // width of canvas / height of canvar
const near: number = 0.1; // start of camera's range
const far: number = 1000;  // end of camera's range

const cameraPerspective = new THREE.PerspectiveCamera(fov, aspect, near, far)
cameraPerspective.position.z = 2

const canvasPerspective = document.getElementById("canvasPerspective") as HTMLCanvasElement
const rendererPerspective = new THREE.WebGL1Renderer({canvas: canvasPerspective})
rendererPerspective.setSize(window.innerWidth / 2.1 , window.innerHeight)


const cameraOrthographic = new THREE.OrthographicCamera(-2,2,2,-2)
cameraOrthographic.position.z = 2

const canvasOrthographic = document.getElementById("canvasOrthographic") as HTMLCanvasElement
const rendererOrthographic = new THREE.WebGL1Renderer({canvas: canvasOrthographic})
rendererOrthographic.setSize(window.innerWidth / 2.1 , window.innerHeight)

/* new OrbitControls(cameraPerspective, rendererPerspective.domElement) */

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

/* window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    cameraPerspective.aspect = aspect
    cameraPerspective.updateProjectionMatrix()
    rendererPerspective.setSize(window.innerWidth / 2.1 , window.innerHeight)
    render()
} */

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()
}

function render() {
    rendererPerspective.render(scene, cameraPerspective)
    rendererOrthographic.render(scene, cameraOrthographic)
}

animate()