// import './style.css'
import * as THREE from './three.module.js';


window.addEventListener('load',()=>{

    
    // Loading
    const textureLoader = new THREE.TextureLoader()
    // Traemos una textura que queramos

    const normalTexture = textureLoader.load('./NormalMap.png');
    // Debug
    // const gui = new dat.GUI()
    
    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    
    // Scene
    const scene = new THREE.Scene()
    
    // Objects
    // const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
    const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);
    
    // Materials
    // const material = new THREE.MeshBasicMaterial()
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.color = new THREE.Color(0xffffff)
    material.normalMap = normalTexture;
    
    // Mesh
    const sphere = new THREE.Mesh(geometry,material)
    scene.add(sphere)
    
    // Lights
    
    //--------------------- light 1 ---------------------
    const pointLight = new THREE.PointLight(0xffffff, .3)
    // pointLight.position.x = 2
    // pointLight.position.y = 3
    // pointLight.position.z = 4
    pointLight.position.set(3, 3, 0.5)
    scene.add(pointLight)
    
    // const light1 = gui.addFolder('Light 1')
    
    // light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
    // light1.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
    // light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
    // light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)
    
    // // agragando la opcion para editar el color en en gui
    // const light1Color = {
        //     color : 0xffffff
        // }
        
        // light1.addColor(light1Color, 'color')
        //     .onChange(()=>{
            //         pointLight.color.set(light1Color.color)
            //     })
            
            // Cuerpo de ayudar para las lights
            // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)    
            // scene.add(pointLightHelper)
            
            //--------------------- light 2 ---------------------
            const pointLight2 = new THREE.PointLight(0xffffff, .4)
            pointLight2.position.set(-2.3, -3, -2.56)
            // pointLight2.intensity = 1
            scene.add(pointLight2)
            
            // const light2 = gui.addFolder('Light 2')
            
            // light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
            // light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
            // light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
            // light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
            
            // // Agregamos al gui el manejos de color
            // const light2Color = {
                //     color : 0xffffff
                // }
                
                // light2.addColor(light2Color, 'color')
                //     .onChange(()=>{
                    //         pointLight2.color.set(light2Color.color)
                    //     })
                    
                    // const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1)
                    // scene.add(pointLight2Helper)
                    
                    /**
                     * Sizes
                     */
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
                    
                    /**
                     * Camera
                     */
                    // Base camera
                    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
                    camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) =>{
    sphere.position.z = window.scrollY * .002
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    
    const elapsedTime = clock.getElapsedTime()
    
    // Update objects
    sphere.rotation.y = .7 * elapsedTime
    
    // aqui hacemos el evento del mouse
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    // sphere.position.z += .1 * (targetY - sphere.rotation.x)
    
    
    // Update Orbital Controls
    // controls.update()
    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
});