import { EventEmitter } from 'events';
import * as THREE from 'three';
import Experience from "../Experience.js";



export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.originmovement = function(){
            this.emit("origen");
        }
        this.interactive = function(event){
            let experience = new Experience();
            let rayCaster = new THREE.Raycaster();
            let mousePosition = new THREE.Vector2();
            var bounds = document.body.getBoundingClientRect()
            mousePosition.x = ( (event.clientX - bounds.left) / document.body.clientWidth ) * 2 - 1;
            mousePosition.y = - ( (event.clientY - bounds.top) / document.body.clientHeight ) * 2 + 1;
            rayCaster.setFromCamera( mousePosition, experience.camera.perspectiveCamera );
            var intersects = rayCaster.intersectObjects(experience.scene.children, true);
            for(let i = 0; i < intersects.length; i++){
                let Objectname = intersects[i].object.userData.name
                // console.log(intersects[i].object.userData);

                if( Objectname == "mesaordenador" || Objectname == "Soporte ordenador" || Objectname == "planoordenador"){
                    this.emit("ordenador");
                }
                if(Objectname == "arcadehitbox"){
                    this.emit("arcade");
                }
            }
        }
        document.body.addEventListener('click', this.interactive.bind(this), false);
        document.querySelector("button").addEventListener('click', this.originmovement.bind(this));
    }

    resize(){
        
    }
}