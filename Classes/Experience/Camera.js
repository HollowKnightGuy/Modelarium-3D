import * as THREE from 'three';
import Experience from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrtographicCamera();  
        this.setOrbitControls();     
        
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, .1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.position =  this.perspectiveCamera.position;
        this.rotation =  this.perspectiveCamera.rotation;

        this.perspectiveCamera.position.set(2.598368769367656,3.318159734618968,3.4055598995233924);
    }
    
    
    createOrtographicCamera(){
        this.frustum = 5;
        this.ortographicCamera = new THREE.OrthographicCamera(
            -this.sizes.aspect * this.sizes.frustum / 2,
            -this.sizes.aspect * this.sizes.frustum / 2,
            this.sizes.frustum / 2,
            -this.sizes.frustum / 2,
            -100, 
            100
        );
        this.scene.add(this.ortographicCamera);
        
        const size = 50;
        const divisions = 50;
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(50);
        this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize(){
        // Updating Perspective camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
        
        // Updating Ortographic camera on Resize
        this.ortographicCamera.updateProjectionMatrix()
        this.ortographicCamera.left = -this.sizes.aspect * this.sizes.frustum / 2;
        this.ortographicCamera.right = -this.sizes.aspect * this.sizes.frustum / 2;
        this.ortographicCamera.top = this.sizes.frustum / 2;
        this.ortographicCamera.bottom = -this.sizes.frustum / 2;
    }
    
    update(){
        this.controls.update();
    }

}