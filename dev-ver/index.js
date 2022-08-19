import * as THREE from './three.js-dev/build/three.module.js'
import {GLTFLoader} from './three.js-dev/examples/jsm/loaders/GLTFLoader.js'
import {GUI} from './three.js-dev/dat.gui.module.js'
import {OrbitControls} from './three.js-dev/examples/jsm/controls/OrbitControls.js'
import Stats from './three.js-dev/examples/jsm/libs/stats.module.js'


//accessing the canvas and div element from index.html
const canvas = document.querySelector('.webgl')
const mybody = document.querySelector('.my-canvas')
const scene = new THREE.Scene() //creating a threejs scene

// scene.add( new THREE.AxesHelper(500)) //shows the 3d axis in the canvas

const gui = new GUI()  //enable this to use dat gui
const cubeFolder = gui.addFolder("Cube") //creates a folder in the dat gui

const loader = new GLTFLoader() // loades the gltf folder
loader.load('model/website.glb', function(gltf){
    console.log(gltf)
    const root = gltf.scene
    // root.rotation.x = 1.5
    scene.add(root)
},function(xhr){
    console.log((xhr.loaded/xhr.total*100)+"% loaded")
}, function(error){
    console.log('An Error Occured')
})

// const geometry = new THREE.BoxGeometry(1,1,1) //creating a cube
// const material = new THREE.MeshBasicMaterial({ //assigning  a material
//     color: 'blue'
// })
// const boxMesh = new THREE.Mesh(geometry,material) //combining the cube and material
// scene.add(boxMesh) //adding cube to scene
// cubeFolder.add(boxMesh.position,"x",-50,50,0.1).name("X-Position")
// cubeFolder.add(boxMesh.position,"y",-50,50,0.1).name("Y-Position")
// cubeFolder.add(boxMesh.position,"z",-50,50,0.1).name("Z-Position")

//lights
// const light = new THREE.DirectionalLight(0xffffff,1)
// light.position.set(2,2,5)
// light.castShadow = true;
// scene.add(light)
const width = 10;
const height = 10;
const intensity = 5;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 0, 20, 0 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )

// var rectLightHelper = new RectAreaLightHelper( rectLight );
// rectLight.add( rectLightHelper );

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,100)
camera.position.set(2.5,2.8,2.7)
scene.add(camera)
cubeFolder.add(camera.position,"x",-50,50,0.1).name("X-POSITION")
cubeFolder.add(camera.position,"y",-50,50,0.1).name("Y-POSITION")
cubeFolder.add(camera.position,"z",-50,50,0.1).name("Z-POSITION")

cubeFolder.add(camera.rotation,"x",0,360,0.1).name("X-ROTATION")
cubeFolder.add(camera.rotation,"y",0,360,0.1).name("Y-ROTATION")
cubeFolder.add(camera.rotation,"z",0,360,0.1).name("Z-ROTATION")

//rendere
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
}) 

//stats
const stats = new Stats()
stats.showPanel(0)
mybody.appendChild( stats.dom );

window.addEventListener( 'resize', onWindowResize );

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false
controls.enablePan = true
controls.enableRotate = true
controls.enableZoom = true
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}
controls.touches = {
	ONE: THREE.TOUCH.ROTATE,
	TWO: THREE.TOUCH.DOLLY_PAN
}

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true

function animate(){
    requestAnimationFrame(animate)
    // boxMesh.rotation.y += 0.01
    stats.update()
    render()
}

function render(){
    renderer.render(scene, camera)
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate()