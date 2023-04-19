import * as THREE from 'three';
import Experience from "../Experience";

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setFloor();

    }

    
    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xecb9ff,
            side: THREE.BackSide
        })
        this.floor = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.floor);
        this.floor.rotation.x = Math.PI / 2;
    }


    resize(){

    }

    update(){

    }
    
}