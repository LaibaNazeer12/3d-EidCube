const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 8;


// MORE SHINY GOLD + YELLOW MATERIAL

const goldMaterial = new THREE.MeshStandardMaterial({
color:0xffcc33,
metalness:1,
roughness:0.05,
emissive:0xffaa00,
emissiveIntensity:0.8
});


// LIGHTING

const light1 = new THREE.PointLight(0xffffff,7);
light1.position.set(6,6,6);
scene.add(light1);

const light2 = new THREE.PointLight(0xffd700,5);
light2.position.set(-6,4,3);
scene.add(light2);

const ambient = new THREE.AmbientLight(0xffffff,1.5);
scene.add(ambient);


// CUBE SIZE

const size = 3;
const panels = [];

function createPanel(w,h,d,x,y,z){

const geo = new THREE.BoxGeometry(w,h,d);
const mesh = new THREE.Mesh(geo,goldMaterial);

mesh.position.set(x,y,z);

scene.add(mesh);
panels.push(mesh);

}


// cube faces

createPanel(size,size,0.2,0,0,1.5)
createPanel(size,size,0.2,0,0,-1.5)
createPanel(0.2,size,size,-1.5,0,0)
createPanel(0.2,size,size,1.5,0,0)
createPanel(size,0.2,size,0,1.5,0)
createPanel(size,0.2,size,0,-1.5,0)


// STARS

for(let i=0;i<250;i++){

const starGeo = new THREE.SphereGeometry(0.05)
const starMat = new THREE.MeshBasicMaterial({color:0xffffff})

const star = new THREE.Mesh(starGeo,starMat)

star.position.set(
(Math.random()-0.5)*35,
(Math.random()-0.5)*35,
(Math.random()-0.5)*35
)

scene.add(star)

}


// OPEN ANIMATION

let open=false

setTimeout(()=>{
open=true
document.getElementById("eidText").style.display="block"
},3000)



function animate(){

requestAnimationFrame(animate)

scene.rotation.y += 0.01
scene.rotation.x += 0.003


if(open){

panels[0].position.z +=0.02
panels[1].position.z -=0.02
panels[2].position.x -=0.02
panels[3].position.x +=0.02
panels[4].position.y +=0.02

}

renderer.render(scene,camera)

}

animate()
