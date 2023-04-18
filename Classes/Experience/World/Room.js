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
            if(child.children.length === 0){
                child.castShadow = true;
                child.receivechadow = true;
            }else{
                child.children.forEach(child2 => {
                    child2.castShadow = true;
                    child2.receivechadow = true;
                })
            }
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11)    
    }



    resize(){

    }

    update(){

    }
    
}