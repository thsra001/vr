import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
/*       ! i might need this !
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
*/

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
function getDoug() {
  

glLoader.load(
	// resource URL
	"tex/modals/"+randInt(1,3)+".glb",
	// called when the resource is loaded
	function ( gltf ) {
		scene.add( gltf.scene );
    gltf.scene.position.set(
      randInt(-30,30)
     ,randInt(-300,30)
     ,randInt(-30,30))
    gltf.scene.name="doug"
    gltf.scene.rotateZ(randInt(-1,1)/10)         
    gltf.scene.rotateY(randInt(-1,1)/10)
    gltf.scene.rotateX(randInt(-1,1)/10)
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
); } // end of long function

glLoader.load( //load sofa
	// resource URL
	"tex/modals/end.glb",
	// called when the resource is loaded
	function ( gltf ) {
		scene.add( gltf.scene );
    gltf.scene.position.set(30,-90,-20)
    gltf.scene.name="sofa"
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
// spawns all the dougnuts
for (let i = 0; i < 1000; i++) {
  getDoug()
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


// scroll move camera downwards
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = t * 0.004;
  camera.rotation.y = t * 0.00004;
  camera.rotation.x = t * 0.00001;
}

document.body.onscroll = moveCamera;
moveCamera();


//render loop for rendering scene and logic loop
function render() {
  // Render the scene and the camera
  renderer.render(scene, camera);

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
  requestAnimationFrame(render);
}

render();