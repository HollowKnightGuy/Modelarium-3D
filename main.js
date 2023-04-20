import './style.css';
import Experience from './Classes/Experience/Experience';

$(window).on("load", (function () {

$("#rotator").rotator({
starting: 0,
ending: 100,
percentage:true,
color:'green',
lineWidth: 7,
timer: 10,
radius: 40,
fontStyle:'Calibri',
fontSize:'20pt',
fontColor:'darkblue',
backgroundColor:'lightgray',
callback:function () {
}})
}))

     



const experience = new Experience(document.querySelector('.experience-canvas'))