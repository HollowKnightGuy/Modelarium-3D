import * as THREE from 'three';
import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.modeloFinal;
        this.actualRoom = this.room.scene;

        this.setModel();
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if(child.name == "mesa_cristal"){
                child.material = new THREE.MeshStandardMaterial();
                child.material.transparent = true;
                child.material.opacity = .5;
            } 
            if(child.name == "cenicero"){
                child.material = new THREE.MeshStandardMaterial();
                child.material.transparent = true;
                child.material.opacity = .8;
            }
        });
        console.log(this.actualRoom);
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11)    
    }



    resize(){

    }

    update(){

    }
    
}