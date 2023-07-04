import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const CANVAS_SIDE = 400

const scene = new THREE.Scene()
scene.background = new THREE.Color('hsl(0, 0%, 10%)')

// Setup the frustum for the perspective camera
const fov: number = 100; // field of view: degrees in vertical
const aspect: number = (CANVAS_SIDE) / CANVAS_SIDE; // width of canvas / height of canvar
const near: number = 0.1; // start of camera's range
const far: number = 1000;  // end of camera's range

const canvasPerspective1 = document.getElementById("canvasPerspective1") as HTMLCanvasElement
const rendererPerspective1 = new THREE.WebGL1Renderer({canvas: canvasPerspective1})
rendererPerspective1.setSize(CANVAS_SIDE , CANVAS_SIDE)
const cameraPerspective1 = new THREE.PerspectiveCamera(fov, aspect, near, far)
cameraPerspective1.position.z = 2

const canvasOrthographic1 = document.getElementById("canvasOrthographic1") as HTMLCanvasElement
const rendererOrthographic1 = new THREE.WebGL1Renderer({canvas: canvasOrthographic1})
rendererOrthographic1.setSize(CANVAS_SIDE , CANVAS_SIDE)
const cameraOrthographic1 = new THREE.OrthographicCamera(-2,2,2,-2, near, far)
cameraOrthographic1.position.z = 2

const canvasPerspective2 = document.getElementById("canvasPerspective2") as HTMLCanvasElement
const rendererPerspective2 = new THREE.WebGL1Renderer({canvas: canvasPerspective2})
rendererPerspective2.setSize(CANVAS_SIDE , CANVAS_SIDE)
const cameraPerspective2 = new THREE.PerspectiveCamera(fov, aspect, near, far)
cameraPerspective2.position.z = 0.5
cameraPerspective2.position.y = 2
cameraPerspective2.lookAt(0, 0, 0)

const canvasOrthographic2 = document.getElementById("canvasOrthographic2") as HTMLCanvasElement
const rendererOrthographic2 = new THREE.WebGL1Renderer({canvas: canvasOrthographic2})
rendererOrthographic2.setSize(CANVAS_SIDE , CANVAS_SIDE)
const cameraOrthographic2 = new THREE.OrthographicCamera(-2,2,2,-2, near, far)
cameraOrthographic2.position.z = 2
cameraOrthographic2.position.x = -2
cameraOrthographic2.lookAt(new THREE.Vector3())

/* new OrbitControls(cameraPerspective1, rendererPerspective1.domElement) */

const geometry = new THREE.TorusKnotGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 'rgb(0, 200, 0)',
    wireframe: true,
})

const torusKnot = new THREE.Mesh(geometry, material)
const SCALE = 0.6
torusKnot.scale.x = SCALE
torusKnot.scale.y = SCALE
torusKnot.scale.z = SCALE
scene.add(torusKnot)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    cameraPerspective1.aspect = aspect
    cameraPerspective1.updateProjectionMatrix()
    rendererPerspective1.setSize(CANVAS_SIDE , CANVAS_SIDE)

    cameraOrthographic1.updateProjectionMatrix()
    rendererOrthographic1.setSize(CANVAS_SIDE , CANVAS_SIDE)

    render()
}

function animate() {
    requestAnimationFrame(animate)

    torusKnot.rotation.x += 0.01
    torusKnot.rotation.y += 0.01

    render()
}

function render() {
    rendererPerspective1.render(scene, cameraPerspective1)
    rendererOrthographic1.render(scene, cameraOrthographic1)
    rendererPerspective2.render(scene, cameraPerspective2)
    rendererOrthographic2.render(scene, cameraOrthographic2)
}

animate()