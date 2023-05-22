import { EventEmitter } from 'events';
import * as THREE from 'three';
import Experience from "../Experience.js";



export default class Movement extends EventEmitter{
    constructor(){
        super();
        this.originmovement = function(){
            this.emit("origen");
        }
        const experience = new Experience();
        const rayCaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const bounds = document.body.getBoundingClientRect()

        this.interactive = function(event){
            pointer.x = ( (event.clientX - bounds.left) / document.body.clientWidth ) * 2 - 1;
            pointer.y = - ( (event.clientY - bounds.top) / document.body.clientHeight ) * 2 + 1;
            rayCaster.setFromCamera( pointer, experience.camera.perspectiveCamera );
            var intersects = rayCaster.intersectObjects(experience.scene.children, true);
            for(let i = 0; i < intersects.length; i++){
                let Objectname = intersects[i].object.name
                // console.log(intersects[i].object.userData);
                if( Objectname == "pchover" || Objectname == "pantallahover"){
                    this.emit("ordenador");
                }
                if(Objectname == "arcadehover"){
                    this.emit("arcade");
                }
            }
        }

        this.interactivehover = function(event){
            pointer.x = ( (event.clientX - bounds.left) / document.body.clientWidth ) * 2 - 1;
            pointer.y = - ( (event.clientY - bounds.top) / document.body.clientHeight ) * 2 + 1;
            rayCaster.setFromCamera( pointer, experience.camera.perspectiveCamera );
            var intersects = rayCaster.intersectObjects(experience.scene.children, true);
            let hover = false
            for(let i = 0; i < intersects.length; i++){
                let Objectname = intersects[i].object.name
                if(Objectname == "pchover" || Objectname == "pantallahover" || Objectname == "arcadehover" || Objectname == "ipadhover"){
                    hover = true;
                }
            }
            if(hover){
                changeCursorState(true)
            }else{
                changeCursorState(false)
            }
        }

        function changeCursorState(hover){
            if(hover){
                document.body.style.cursor = "none";
                document.getElementById("cursor").className = "block"; 
            }
            else{
                document.body.style.cursor = "auto";
                document.getElementById("cursor").className = "none";
            }
        }


        document.body.addEventListener('click', this.interactive.bind(this), false);
        document.body.addEventListener('mousemove', this.interactivehover.bind(this), false);

        document.querySelector("button").addEventListener('click', this.originmovement.bind(this));
    }

    resize(){
        
    }
}