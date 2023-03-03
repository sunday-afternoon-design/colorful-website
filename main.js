import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import model from './public/1.glb?url'


const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xffffff); // Set the background color to white

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );
const col = [0xD3CF2F,0xD3CD2E,0xD1B72C,0xC85F27,0xC34A27,0xC98C33,0x6D532B,0x1F3D74,0x0E2C66,0x035B3E]
const material=[]
for(let i =0;i<10;i++){
    material[i] = new THREE.MeshStandardMaterial({
    color: col[i], // Yellow color
    roughness: 0.5,
});}

const logogroup = new THREE.Group();

loader.load(
	model,
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                for (let i = 0; i < 10; i++) {
                    let scaleindex = 1 +i*0.04
                    let positionindex = 1 - i*0.2
                    child.material = material[i];
                    child.castShadow =true
                    child.receiveShadow =true
                    const clone = child.clone();
                    clone.scale.set(scaleindex,scaleindex,scaleindex)
                    clone.position.set(1,1,positionindex)
                    logogroup.add(clone)
                    scene.add(clone);
                }
                for (let i = 0; i < 10; i++) {
                    let scaleindex = 1 +i*0.04
                    let positionindex = 1 + i*.13
                    let positionindexZ = 1 - i*.13
                    child.material = material[i];
                    child.castShadow =true
                    child.receiveShadow =true
                    const clone = child.clone();
                    clone.scale.set(scaleindex,scaleindex,scaleindex)
                    clone.position.set(1,positionindex+.5,positionindexZ)
                    clone.rotation.set(Math.PI / 4,0,0);
                    logogroup.add(clone)
                    scene.add(clone);
                }
                for (let i = 0; i < 10; i++) {
                    let scaleindex = 1 +i*0.04
                    let positionindex = 1 - i*.13
                    let positionindexZ = 1 - i*.13
                    child.material = material[i];
                    child.castShadow =true
                    child.receiveShadow =true
                    const clone = child.clone();
                    clone.scale.set(scaleindex,scaleindex,scaleindex)
                    clone.position.set(1,positionindex-.5,positionindexZ)
                    clone.rotation.set(-Math.PI / 4,0,0);
                    logogroup.add(clone)
                    scene.add(clone);
                }
            }
        });
    }
	);

let sG = new THREE.SphereBufferGeometry(.2)
let s = new THREE.Mesh(sG,material)
s.castShadow = true
// scene.add(s)

let s2G = new THREE.SphereBufferGeometry(-0.4)
let s2 = new THREE.Mesh(s2G,material)
s2.position.set(0,0),1
s2.receiveShadow = true
// scene.add(s2)



const light1 = new THREE.DirectionalLight(0xffffff, .7); // Color, Intensity
const light2 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity
const light3 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity
light1.position.set(0, 0.1, 2); // x, y, z
light2.position.set(0, 0.5, 1); // x, y, z
light3.position.set(0, -0.5, 1); // x, y, z
light1.castShadow = true; // Enable shadow casting
// light2.castShadow = true; // Enable shadow casting
// light3.castShadow = true; // Enable shadow casting
light1.shadow.mapSize.width = 1024;
light1.shadow.mapSize.height = 1024;
light2.shadow.mapSize.width = 1024;
light2.shadow.mapSize.height = 1024;
light3.shadow.mapSize.width = 1024;
light3.shadow.mapSize.height = 1024;
scene.add(light1);
// scene.add(light2);
// scene.add(light3);
const lighth = new THREE.HemisphereLight( 0xffffff, 0.5 ); 
scene.add(lighth);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 3.1
camera.position.y = -.1
camera.position.z = 3.3
// 3.1,-0.1,3.3
// -0.3,1.5,3.2
// -2.3,0.9,1.8

scene.add(camera)


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('');
loader.setDRACOLoader(dracoLoader);


/* -------------------------------------------------------------------------- */
/*                                 light setup                                */
/* -------------------------------------------------------------------------- */
// const light1 = new THREE.PointLight(0xFFF2CC, 3.6, 1); // Color, Intensity
// const light2 = new THREE.PointLight(0xFFF2CC, .6, 10); // Color, Intensity
// const light3 = new THREE.PointLight(0xFFF2CC, .8, 100); // Color, Intensity
// const light1 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity
const light2 = new THREE.DirectionalLight(0xffffff, .95); // Color, Intensity
const light3 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity
// light1.position.set(-1, 0, 3); // pointlight
light2.position.set(0, 0, 2); // pointlight
light3.position.set(-3, 0, 2); // pointlight
const targetPosition2 = new THREE.Vector3(0.5, 0, 0);
light2.target.position.copy(targetPosition2);
const targetPosition3 = new THREE.Vector3(-2, 3, 0);
light3.target.position.copy(targetPosition3);
// light3.target.set(-2, 0, 2); // pointlight
// light1.castShadow = true; // Enable shadow casting
light2.castShadow = true; // Enable shadow casting
// light3.castShadow = true; // Enable shadow casting
// light1.shadow.mapSize.width = 1024;
// light1.shadow.mapSize.height = 1024;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
// light3.shadow.mapSize.width = 1024;
// light3.shadow.mapSize.height = 1024;
// scene.add(light1);
scene.add(light2);
scene.add(light3);

const lighth = new THREE.HemisphereLight(0xcccccc, 0.00005);
scene.add(lighth);

// const pointLightHelper = new THREE.PointLightHelper(light1, 1);
const pointLightHelper1 = new THREE.DirectionalLightHelper(light2, 1);
const pointLightHelper2 = new THREE.DirectionalLightHelper(light3, 1);
// scene.add(pointLightHelper);
// scene.add(pointLightHelper1);
// scene.add(pointLightHelper2);

// const width = 4.8;
// const height = 2;
// const intensity = 1.4;
// const rectLight = new THREE.RectAreaLight(0xFFF2CC, intensity, width, height);
// rectLight.position.set(0, 0, 1.8);
// rectLight.lookAt(0, .6, 0);
// rectLight.castShadow = true;
// rectLight.shadow.mapSize.width = 1024;
// rectLight.shadow.mapSize.height = 1024;
// scene.add(rectLight)
// const rectLightHelper = new RectAreaLightHelper(rectLight);
// rectLight.add(rectLightHelper);


/* -------------------------------------------------------------------------- */
/*                              type refine here                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ type material ----------------------------- */
const col = [0xf5ed4a, 0xfea406, 0xd9544b, 0x587bd5, 0x004497, 0x007e4e, 0x1fc42a, 0x44bd54, 0x83ac9e, 0xcc75dd, 0xd400d3, 0xc700cd, 0x9c01bd, 0x5400ae, 0x3700a8, 0x3300a1, 0x3400a5, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac]
const material = []
let indexnumber = 30
for (let i = 0; i < indexnumber; i++) {
    material[i] = new THREE.MeshStandardMaterial({
        color: col[i],
        roughness: 0.5,
        fog: true
    });
}

/* ------------------------------ type position ----------------------------- */
// let lgroup1=new THREE.Group();
// let lgroup2=new THREE.Group();
// let lgroup3=new THREE.Group();


let t = 0; // Initialize the time variable to keep track of the time elapsed in frames
let lgroup1 = []
let lgroup2 = []
let lgroup3 = []
loader.load(
    model,
    function(gltf) {
        gltf.scene.traverse(function(child) {
            if (child.isMesh) {
                let x2 = 0.92;
                let y2 = 0;
                let x3 = 1.08;
                let y3 = 0;
                for (let i = 0; i < indexnumber; i++) {
                    let scaleindex = 1 + i * 0.04
                    let positionindex = 1 - i * 0.2
                    child.material = material[i];
                    child.castShadow = true
                    child.receiveShadow = true
                    const clone1 = child.clone();
                    clone1.scale.set(scaleindex, scaleindex, scaleindex)
                    clone1.position.set(0, 0, positionindex)
                    lgroup1[i] = clone1
                    scene.add(clone1);
                }

                for (let i = 0; i < indexnumber; i++) {
                    let scaleindex = 1 + i * 0.04
                    let positionindex = 1 + i * .18
                    let positionindexZ = 1 - i * .093
                    child.material = material[i];
                    child.castShadow = true
                    child.receiveShadow = true
                    const clone2 = child.clone();
                    clone2.scale.set(scaleindex, scaleindex, scaleindex)

                    // clone2.scale.set(1.5, 1.5, 1.5)

                    clone2.position.set(0, positionindex - x2, positionindexZ + y2)
                        // clone2.position.set(0, positionindex - 0.52, positionindexZ + 0.25)
                    clone2.rotation.set(Math.PI * 0.3833, 0, 0);
                    lgroup2[i] = clone2
                    scene.add(clone2);
                }

                for (let i = 0; i < indexnumber; i++) {
                    let scaleindex = (1 + i * 0.04)
                    let positionindex = 1 - i * .18
                    let positionindexZ = 1 - i * .093
                    child.material = material[i];
                    child.castShadow = true
                    child.receiveShadow = true
                    const clone3 = child.clone();
                    clone3.scale.set(scaleindex, scaleindex, scaleindex)

                    // clone3.scale.set(1.5, 1.5, 1.5)

                    clone3.position.set(0, positionindex - x3, positionindexZ + y3)
                        // clone3.position.set(0, positionindex - 1.4, positionindexZ + 0.25)

                    clone3.rotation.set(-Math.PI * 0.3833, 0, 0);
                    lgroup3[i] = clone3
                    scene.add(clone3);
                }

                let speedoffset = 0;
                let sizeoffset = 0;
                let sizemax = 1.5
                    // Animate the child mesh
                const animateChildMesh = function() {

                    // speedoffset = lerp(1, 0.75, mouseOX)
                    speedoffset = map(mouseOX, 1, 0.2, .2, 1)
                        // speedoffset = 1
                    t += speedoffset;
                    // sizeoffset = lerp(1, 0, mouseOY)
                    sizeoffset = map(mouseOX, 1, 0.2, 0, 1)
                        // sizeoffset = 1
                        // console.log(mouseOX)
                    for (let i = 0; i < indexnumber; i++) {
                        let positionindex3 = -i * .18
                        let positionindexZ3 = 1 - i * .093
                            // 1 + i * .18
                            // let positionindexZ = 1 - i * .093
                        let positionindex2 = i * .18
                        let positionindexZ2 = 1 - i * .093
                        let logosize = 3.05 + Math.sin((i / 700 + t / 4600) * 1 * 140);
                        // console.log(logosize)
                        logosize = map(logosize, 2, 4.02, 1, sizemax)
                        sizemax = lerp(1.2, 1.6, sizeoffset)
                            // logosize = 1.5
                        lgroup1[i].scale.set(logosize, logosize, 1);
                        lgroup2[i].scale.set(logosize, logosize, 1);
                        lgroup3[i].scale.set(logosize, logosize, 1);

                        x2 = map(logosize, 1, 1.5, 0, 0.4)
                        y2 = map(logosize, 1, 1.5, 0, .25)
                        x3 = map(logosize, 1, 1.5, 0, 0.4)
                        y3 = map(logosize, 1, 1.5, 0, .25)

                        lgroup2[i].position.set(0, positionindex2 + x2, positionindexZ2 + y2)
                        lgroup3[i].position.set(0, positionindex3 - x3, positionindexZ3 + y3)

                    }

                    requestAnimationFrame(animateChildMesh);
                };

                animateChildMesh();
            }
        });
    }
);


/* -------------------------------------------------------------------------- */
/*                           render & control setup                           */
/* -------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,

    alpha:true

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// renderer.setClearColor(0x000000, 10);
// renderer.physicallyCorrectLights = true;

const controls = new OrbitControls( camera, renderer.domElement );

const clock = new THREE.Clock()

let cpx = document.getElementById('x')
let cpy = document.getElementById('y')
let cpz = document.getElementById('z')
let camerapos = camera.position

let scroll = document.getElementById('scroll')
const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    // console.log(camerapos)

    // Update controls
    // controls.update()
    // camera.position.x += (mouseX - camera.position.x) * .05;
    // camera.position.y += (-mouseY - camera.position.y) * .05;
    // console.log("tick")
    // camera.lookAt(scene.position);
    // cp.innerHTML=camerapos.x.toString()
   
    // console.log(camerapos.x.toString())
    
    // Render
    renderer.render(scene, camera)


    cpx.innerHTML="x: " + camerapos.x.toString()
    cpy.innerHTML="y: " + camerapos.y.toString()
    cpz.innerHTML="z: " + camerapos.z.toString()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


// const c = document.createElement("span");
// c.setAttribute('id','camerap');




const gridHelper = new THREE.GridHelper( 10, 10 );
// scene.add( gridHelper );
const axesHelper = new THREE.AxesHelper( 5 );
axesHelper.setColors (  0xff0000, 0xffff00, 0x0000ff)
// scene.add( axesHelper );



let scrollPercent = 0;
document.body.onscroll = () => {
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;
    scroll.innerHTML="scroll progress: " + scrollPercent.toFixed(2)
}

tick()

function lerp(x, y, a) {
    return (1 - a) * x + a * y
}
// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}