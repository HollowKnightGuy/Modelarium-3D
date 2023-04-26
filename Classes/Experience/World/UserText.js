import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import Experience from "../Experience";

export default class Usertext{
    constructor(name){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.loader = new FontLoader();
        this.name = name;
        this.lenghtname = name.length;
        this.size = .1
        if(this.lenghtname > 20) this.size = .053 
        else if(this.lenghtname > 17) this.size = .058 
        else if(this.lenghtname > 14) this.size = .063
        else if(this.lenghtname > 11) this.size = .069 
        else if(this.lenghtname > 8) this.size = .07 
        else if(this.lenghtname > 5) this.size = .08 
        console.log(this.lenghtname);
        console.log(this.size);
        this.setText();
    }
    
    
    setText(){
        this.loader.load('./public/fonts/BRLNSDB.json', function(font){
            
            const geometry = new TextGeometry('Hola '+ this.name +', Bienvenido!',  {
                font:font,
                size: this.size,
                height: .02,
            })
            const textMesh = new THREE.Mesh(geometry, [
                new THREE.MeshPhongMaterial({color: 0xad4000}),
                new THREE.MeshPhongMaterial({color: 0x5c2301}),
            ]);
    
            textMesh.castShadow = true;
            textMesh.receiveShadow = true;
            this.scene.add(textMesh);
            textMesh.position.set(-.7, 1, -.9)
        }.bind(this));
    }


    resize(){

    }

    update(){

    }
    
}