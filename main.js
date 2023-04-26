import './style.css';
import Experience from './Classes/Experience/Experience';
let person;
// let person = prompt("Please enter your name");
if(person === null || person === ''){
    person = 'user';
}
const experience = new Experience(document.querySelector('.experience-canvas'), person)


