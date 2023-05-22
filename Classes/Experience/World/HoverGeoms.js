import * as THREE from 'three';
import Experience from "../Experience";

export default class HoverGeoms{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setHoverGeoms();

    }

    
    setHoverGeoms(){

        // ARCADE HITBOX

        this.geometry = new THREE.BoxGeometry(.37,.7,.37);
        this.material = new THREE.MeshStandardMaterial(
            {color: 0x000000,
            transparent:true,
        opacity:0}
        )
        this.arcadeHover = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.arcadeHover);
        this.arcadeHover.position.set(-.75, .4, .62);
        this.arcadeHover.name = "arcadehover";

        // PC HITBOX

        this.geometry = new THREE.BoxGeometry(.40,.4,.60);
        this.material = new THREE.MeshStandardMaterial(
            {color: 0x000000,
            transparent:true,
        opacity:0}
        )
        this.PCHover = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.PCHover);
        this.PCHover.position.set(-.75, .2, 0)
        this.PCHover.name = "pchover";

        this.geometry = new THREE.BoxGeometry(.05,.3,.30);
        this.material = new THREE.MeshStandardMaterial(
            {color: 0x000000,
            transparent:true,
        opacity:0}
        )
        this.Pantallahover = new THREE.Mesh(this.geometry, this.material);
        this.Pantallahover.name = "pantallahover";
        this.scene.add(this.Pantallahover);
        this.Pantallahover.position.set(-.85, .4, .1)


        // IPAD HITBOX

        this.geometry = new THREE.BoxGeometry(.2,.04, .2);
        this.material = new THREE.MeshStandardMaterial(
            {color: 0x000000,
            transparent:true,
        opacity:0}
        )
        this.Ipad = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.Ipad);
        this.Ipad.name = "ipadhover";
        this.Ipad.position.set(.24, .2, 0)
        
    }
    

    resize(){

    }

    update(){

    }
    
}