import * as THREE from './three.module.js';

window.addEventListener('DOMContentLoaded',()=>{
    
    // Loading
    const textureLoader = new THREE.TextureLoader()

    // Traemos una textura que queramos
    const normalTexture = textureLoader.load('./NormalMap.png');

    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    
    // Scene
    const scene = new THREE.Scene()
    
    // Objects
    const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);
    
    // Materials
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
    pointLight.position.set(3, 3, 0.5)
    scene.add(pointLight)
    

    //--------------------- light 2 ---------------------
    const pointLight2 = new THREE.PointLight(0xffffff, .4)
    pointLight2.position.set(-2.3, -3, -2.56)
    scene.add(pointLight2)

    
    /**
    * Sizes
    */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    window.addEventListener('resize', () => {
        
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    });

    /**
    * Camera
    */

    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0.045
    camera.position.z = 1.45
    scene.add(camera)

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
    let mouseX = 0
    let mouseY = 0
    
    let targetX = 0
    let targetY = 0
    
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2
    
    const onDocumentMouseMove = event => {
        mouseX = (event.clientX - windowHalfX)
        mouseY = (event.clientY - windowHalfY)
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Evento del zoom de la esfera en base al scroll
    const updateSphere = () =>{
        sphere.position.z = window.scrollY * .0015
    }
    window.addEventListener('scroll', updateSphere);

    // Aqui creamos el movimiento constante de la esfera
    const clock = new THREE.Clock()
    const tick = () => {
        targetX = mouseX * .001
        targetY = mouseY * .001
        
        const elapsedTime = clock.getElapsedTime()
        
        // Update objects
        sphere.rotation.y = .7 * elapsedTime
        
        // aqui hacemos el evento del mouse
        sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
        sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
        
        // Render
        renderer.render(scene, camera)
        
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick();

});