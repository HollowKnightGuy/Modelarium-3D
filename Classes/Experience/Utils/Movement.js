import { EventEmitter } from 'events';
import * as THREE from 'three';
import Experience from "../Experience.js";



export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.onclick = function(event){
            let experience = new Experience();
            let rayCaster = new THREE.Raycaster();
            let mousePosition = new THREE.Vector2();
            var bounds = document.body.getBoundingClientRect()
            mousePosition.x = ( (event.clientX - bounds.left) / document.body.clientWidth ) * 2 - 1;
            mousePosition.y = - ( (event.clientY - bounds.top) / document.body.clientHeight ) * 2 + 1;
            // console.log(experience.camera.perspectiveCamera);
            rayCaster.setFromCamera( mousePosition, experience.camera.perspectiveCamera );
            var intersects = rayCaster.intersectObjects(experience.scene.children, true);
            for(let i = 0; i < intersects.length; i++){
               if(intersects[i].object.userData.name == "mesaordenador"){
                this.emit("ordenador");
               }
            }
        }
        document.body.addEventListener('click', this.onclick.bind(this), false)
    }

    resize(){
        
    }
}