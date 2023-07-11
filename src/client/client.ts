import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const TILE_SIDE = 400
const BACKGROUND_COLOR = new THREE.Color('hsl(0, 0%, 10%)')

// 1. SCENE
const scene = new THREE.Scene()
scene.background = BACKGROUND_COLOR


// 2. RENDERER
const canvasPerspective1 = document.getElementById("canvasPerspective1") as HTMLCanvasElement
const rendererPerspective1 = new THREE.WebGL1Renderer({canvas: canvasPerspective1})
rendererPerspective1.setSize(TILE_SIDE , TILE_SIDE)


// 3. CAMERA
// Setup the frustum constants for the perspective camera
const fov: number = 100; // field of view: degrees in vertical
const aspect: number = (TILE_SIDE) / TILE_SIDE; // width of canvas / height of canvar
const near: number = 0.1; // start of camera's range
const far: number = 1000;  // end of camera's range

const cameraPerspective1 = new THREE.PerspectiveCamera(fov, aspect, near, far)
cameraPerspective1.position.z = 2

const canvasOrthographic1 = document.getElementById("canvasOrthographic1") as HTMLCanvasElement
const rendererOrthographic1 = new THREE.WebGL1Renderer({canvas: canvasOrthographic1})
rendererOrthographic1.setSize(TILE_SIDE , TILE_SIDE)
const cameraOrthographic1 = new THREE.OrthographicCamera(-2,2,2,-2, near, far)
cameraOrthographic1.position.z = 2

const canvasPerspective2 = document.getElementById("canvasPerspective2") as HTMLCanvasElement
const rendererPerspective2 = new THREE.WebGL1Renderer({canvas: canvasPerspective2})
rendererPerspective2.setSize(TILE_SIDE , TILE_SIDE)
const cameraPerspective2 = new THREE.PerspectiveCamera(fov, aspect, near, far)
cameraPerspective2.position.z = 0.5

// Move the camera up and look at the center 
cameraPerspective2.position.y = 2
cameraPerspective2.lookAt(0, 0, 0)

const canvasOrthographic2 = document.getElementById("canvasOrthographic2") as HTMLCanvasElement
const rendererOrthographic2 = new THREE.WebGL1Renderer({canvas: canvasOrthographic2})
rendererOrthographic2.setSize(TILE_SIDE , TILE_SIDE)
const cameraOrthographic2 = new THREE.OrthographicCamera(-2,2,2,-2, near, far)
cameraOrthographic2.position.z = 2
cameraOrthographic2.position.x = -2
cameraOrthographic2.lookAt(new THREE.Vector3())


// 4. GEOMETRY, MATERIAL & MESH
const geometryTorusKnot = new THREE.TorusKnotGeometry()
const materialTorusKnot = new THREE.MeshBasicMaterial({
    color: 'rgb(0, 200, 0)',
    wireframe: true,
})

const torusKnot = new THREE.Mesh(geometryTorusKnot, materialTorusKnot)
const SCALE = 0.6
torusKnot.scale.x = SCALE
torusKnot.scale.y = SCALE
torusKnot.scale.z = SCALE
scene.add(torusKnot)


const TORUS_WIDTH = window.innerWidth - 850
const TORUS_HEIGHT = window.innerHeight

const torusScene = new THREE.Scene()
torusScene.background = BACKGROUND_COLOR

const cameraTorus = new THREE.PerspectiveCamera(fov, aspect, near, far)
cameraTorus.position.z = 20
const canvasTorus = document.getElementById("staticTorus") as HTMLCanvasElement

const rendererTorus = new THREE.WebGL1Renderer({canvas: canvasTorus})
rendererTorus.setSize(TORUS_WIDTH, TORUS_HEIGHT)

const RADIUS_TORUS = 10
const TUBE_TORUS = 3
const RADIAL_SEGMENT = 16
const TUBULAR_SEGMENT = 100


const geometryTorus = new THREE.TorusGeometry(RADIUS_TORUS, TUBE_TORUS, RADIAL_SEGMENT, TUBULAR_SEGMENT)
const materialTorus = new THREE.MeshBasicMaterial({
    color: 'rgb(0, 0, 200)',
    wireframe: true
})
const torus = new THREE.Mesh(geometryTorus, materialTorus)
torusScene.add(torus)

new OrbitControls(cameraTorus, rendererTorus.domElement)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    /* 
    They have the default size: 400px 
    cameraPerspective1.aspect = aspect
    cameraPerspective1.updateProjectionMatrix()
    rendererPerspective1.setSize(TILE_SIDE , TILE_SIDE)
    
    cameraPerspective2.aspect = aspect
    cameraPerspective2.updateProjectionMatrix()
    rendererPerspective2.setSize(TILE_SIDE , TILE_SIDE)

    cameraOrthographic1.updateProjectionMatrix()
    rendererOrthographic1.setSize(TILE_SIDE , TILE_SIDE)

    cameraOrthographic2.updateProjectionMatrix()
    rendererOrthographic2.setSize(TILE_SIDE , TILE_SIDE) 
    */


   
   cameraTorus.aspect = aspect
   cameraTorus.updateProjectionMatrix()
   rendererTorus.setSize(window.innerWidth - 850, window.innerHeight)
   
   // If an animate loop is running, there is no need to call the render() function on window resize
   //render()
}

// 5. STATS
const stats = new Stats()
document.body.appendChild(stats.dom)


// 6. GUI
const axes: Array<keyof THREE.Vector3> = ["x", "y", "z"]
const gui = new GUI()


const torusFolder = gui.addFolder("Torus")

const torusPositionFolder = torusFolder.addFolder("Position")
const torusRotationFolder = torusFolder.addFolder("Rotation")
const torusScaleFolder = torusFolder.addFolder("Scale")

for (let axis of axes) {
    
    torusScaleFolder.add(torus.scale, axis, 0, 5)
    torusPositionFolder.add(torus.position, axis, -10, 10)
    
    /* torusRotationFolder.add(torus.rotation, axis, 0, Math.PI * 2) */
}



torusRotationFolder.add(torus.rotation, "x", 0, Math.PI * 2)
torusRotationFolder.add(torus.rotation, "y", 0, Math.PI * 2)
torusRotationFolder.add(torus.rotation, "z", 0, Math.PI * 2)



const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(cameraTorus.position, "z", 0, 50)


function animate() {
    requestAnimationFrame(animate)

    /* 
    torusKnot.rotation.x += 0.01
    torusKnot.rotation.y += 0.01 
    */

    torus.rotation.x += 0.01
    torus.rotation.y += 0.01


    render()

    stats.update()
}

function render() {
    rendererPerspective1.render(scene, cameraPerspective1)
    rendererOrthographic1.render(scene, cameraOrthographic1)
    rendererPerspective2.render(scene, cameraPerspective2)
    rendererOrthographic2.render(scene, cameraOrthographic2)
    rendererTorus.render(torusScene, cameraTorus)
}

animate()