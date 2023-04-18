import * as THREE from 'three';
import Experience from "../Experience";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunLight();
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight(
            "FFFFFF",
            1
        );

        this.sunLight.castShadow = true;
        this.sunLight.shadow.far = 20;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(2.3843259671959975, 1.5824498882850857, -4.622222325920376);
        this.scene.add(this.sunLight);
    }



    resize(){

    }

    update(){

    }
    
}