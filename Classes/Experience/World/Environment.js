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
            "0xFFFFFF",
            .7
        );
        this.sunLight.castShadow = true;
        this.sunLight.shadow.far = 20;
        this.sunLight.shadow.mapSize.set(10000,10000);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(8.3843259671959975, 1.5824498882850857, 4.622222325920376);
        this.scene.add(this.sunLight);

        this.ambientlight =  new THREE.AmbientLight("#FFFFFF", .7);
        this.scene.add(this.ambientlight);
    }



    resize(){

    }

    update(){

    }
    
}