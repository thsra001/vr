import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {VRButton} from 'three/examples/jsm/webxr/VRButton';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
let dougs=[];
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// The three.js scene: the 3D world where you put objects
const scene = new THREE.Scene();
// The camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  1,
  10000
);


for (let i = 0; i < 15; i++) {
  let light4 = new THREE.PointLight( 0xffffff, 1, 100 );
light4.position.set( 0, -(i*50)+150, 3 );
scene.add( light4 );
}
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
// load models
const glLoader = new GLTFLoader();
// loads a model with 1 as dir string and 2 as the func to run when the model loaded
function loadModel(url,func) {
  glLoader.load( //load model
	// resource URL
	url,
	// called when the resource is loaded
	function ( gltf ) {
		scene.add(gltf.scene)
    func(gltf.scene)
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
}
function dougRun(model) { //run on loaded model


    model.position.set(
      randInt(-30,30)
     ,randInt(-30,30)
     ,randInt(-30,30))
    model.name="doug";
    dougs.push(model)
    model.rotateZ(randInt(-10,10));
    model.rotateY(randInt(-10,10));
    model.rotateX(randInt(-10,10));
	}
function sofaRun(model) {
		scene.add( model );
    model.position.set(30,-90,-20)
    model.name="sofa"}
loadModel("tex/modals/end.glb",sofaRun)
// spawns all the dougnuts
for (let i = 0; i < 100; i++) {
  loadModel("tex/modals/"+randInt(1,9)+".glb",dougRun)
}
// loads "transparent" jpg joke
const map = new THREE.TextureLoader().load( 'tex/fake.jpg' );
const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );

const sprite = new THREE.Sprite( material );
sprite.scale.set(10, 10, 1)
scene.add( sprite );
sprite.position.set(30,-30,-30)
//skybox and loaders
const cubeLoader = new THREE.CubeTextureLoader();
const skyboss = cubeLoader.load( [
	'tex/box/px.png', 'tex/box/nx.png',
	'tex/box/py.png', 'tex/box/ny.png',
	'tex/box/pz.png', 'tex/box/nz.png'
] );
scene.background=skyboss
// The renderer: something that draws 3D objects onto the canvas
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#c") });


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
// Append the renderer canvas into <body>
document.body.appendChild(renderer.domElement);
// add vr button
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));
var controllerModelFactory = new XRControllerModelFactory();

const controllerGrip1 = renderer.xr.getControllerGrip(0);
const model1 = controllerModelFactory
  .createControllerModel( controllerGrip1 );
controllerGrip1.add( model1 );
scene.add( controllerGrip1 );

const controllerGrip2 = renderer.xr.getControllerGrip(1);
const model2 = controllerModelFactory
  .createControllerModel( controllerGrip2 );
controllerGrip2.add( model2 );
scene.add( controllerGrip2 );

//render loop for rendering scene and logic loop
function render() {

  // Render the scene and the camera
  renderer.render(scene, camera);
for (let i = 0; i < dougs.length; i++) {
  dougs[i].rotateX(0.009);
  dougs[i].rotateY(0.008);
}
  // resizing logic
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

   if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  } // other stuff


  // Make it call the render() function about every 1/60 second
 renderer.setAnimationLoop(render);
}

render();
