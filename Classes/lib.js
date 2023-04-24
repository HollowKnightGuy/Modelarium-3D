import { Camera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let aceleracion;
let veces;
let xstep;
let ystep;
let zstep;
let xrstep;
let yrstep;
let zrstep;
let xorbstep;
let yorbstep;
let zorbstep;

export default class lib{
    constructor(){
        
    }
    
    /**
     * Contempla todos los casos de diferencia entre la coordenada de la camara y la del punto 
     * final para devolver una fraccion del recorrido que la camara debe recorrer correctamente
     * @param {Number} CamPosition 
     * @param {Number} FinalPoint 
     * @returns Number
     */
    CamStepCalculator(CamPosition, FinalPoint){
        let step;
        if(CamPosition < 0 && FinalPoint >= 0){
            
            let xrdif = -CamPosition + FinalPoint;
            step = +xrdif / 500;
        }
        else if(CamPosition > 0 && FinalPoint > 0 && CamPosition > FinalPoint){
            let xrdif = CamPosition - FinalPoint;
            step = -xrdif / 500;
        }
        else if(CamPosition > 0 && FinalPoint > 0 && CamPosition < FinalPoint){
            let xrdif = FinalPoint - CamPosition;
            step = xrdif / 500;
        }
        else if(CamPosition >= 0 && FinalPoint < 0){
            let xrdif = Math.abs(FinalPoint - CamPosition);
            step = -xrdif / 500;
        }
        else if(CamPosition < 0 && FinalPoint < 0 && FinalPoint > CamPosition){
            let xrdif = Math.abs(CamPosition - FinalPoint);
            step = xrdif / 500;
        }
        else if(CamPosition < 0 && FinalPoint < 0 && FinalPoint < CamPosition){
            let xrdif = Math.abs(CamPosition - FinalPoint);
            step = -xrdif / 500;
        }
        
        return step;
    }
    
    

    /**
     * Funcion principal del movimiendo de la camara
     * @param {Camera} camera 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     * @param {Number} xr 
     * @param {Number} yr 
     * @param {Number} zr 
     */


      /**
     * Se encarga de cambiar el vlaor de las coordenadas de la posicion de la camara
     * @param {Number} xs 
     * @param {Number} ys 
     * @param {Number} zs 
     * @param {Number} xr 
     * @param {Number} yr 
     * @param {Number} zr 
     */
      cambiar_coordedanas(camera, orbControls, xs,ys,zs, xr, yr, zr, xorb, yorb, zorb){
        camera.position.x += xs;
        camera.position.y += ys;
        camera.position.z += zs;
        camera.rotation.x += xr;
        camera.rotation.y += yr;
        camera.rotation.z += zr;
        
        orbControls.target.x += xorb;
        orbControls.target.y += yorb;
        orbControls.target.z += zorb;
    }



    /**
     * Se encarga de limpiar el intervalo que haya sido pasado
     * @param {Interval} interval 
     */
    deleteInterval(interval){
        clearInterval(interval);
    }


     moverCamara(camera, orbControls, x, y, z, xr = 0, yr = 0, zr = 0, xorb, yorb, zorb){
         aceleracion = 1;
         veces = 0;
        if(veces < 2){
            xstep = this.CamStepCalculator(camera.position.x, x);
            ystep = this.CamStepCalculator(camera.position.y, y);
            zstep = this.CamStepCalculator(camera.position.z, z);
            xrstep = this.CamStepCalculator(camera.rotation.x, xr);
            yrstep = this.CamStepCalculator(camera.rotation.y, yr);
            zrstep = this.CamStepCalculator(camera.rotation.z, zr);
            xorbstep = this.CamStepCalculator(orbControls.target.x, xorb);
            yorbstep = this.CamStepCalculator(orbControls.target.y, yorb);
            zorbstep = this.CamStepCalculator(orbControls.target.z, zorb);

        }
        const movcamara = setInterval(function () {
            if(veces < 501){
                if(veces < 75){
                    this.mover_cam_aceleracion(camera, orbControls, 0.039, xstep, ystep, zstep, xrstep, yrstep, zrstep, xorbstep, yorbstep, zorbstep);
                }else if(75 <= veces && veces < 300){
                    this.mover_cam_aceleracion(camera, orbControls, 0.03, xstep, ystep, zstep, xrstep, yrstep, zrstep, xorbstep, yorbstep, zorbstep);
                }else if(300 <= veces && veces < 400){
                    this.mover_cam_aceleracion(camera, orbControls, -0.08727, xstep, ystep, zstep, xrstep, yrstep, zrstep, xorbstep, yorbstep, zorbstep);
                }else{      
                    this.mover_cam_aceleracion(camera, orbControls, - 0.01596517, xstep, ystep, zstep, xrstep, yrstep, zrstep, xorbstep, yorbstep, zorbstep);
                }
            }else{
                this.deleteInterval(movcamara);
            }
        }.bind(this), 1);
    }
    
    
    
    mover_cam_aceleracion(camera, orbControls,  aumento, xstep, ystep, zstep, xrstep, yrstep, zrstep, xorbstep, yorbstep, zorbstep){
        aceleracion += aumento;
        this.cambiar_coordedanas(camera, orbControls, xstep * aceleracion, ystep * aceleracion, zstep * aceleracion, xrstep * aceleracion, yrstep * aceleracion, zrstep * aceleracion, xorbstep * aceleracion, yorbstep * aceleracion, zorbstep * aceleracion);
        veces += 1 * aceleracion;
    }




  

}



