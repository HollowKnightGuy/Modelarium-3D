import './style.css';
import Experience from './Classes/Experience/Experience';
let person;

// person = prompt("Please enter your name");
if(person === null || person === ''){
    person = 'user';
}

$('.loader').fadeIn(300);


const loaderAnimation = [
    { filter: "grayscale(1)"},
    { filter: "grayscale(0)"},
]
let perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
time = parseInt((EstimatedTime/1000)%60)*100;

// Loadbar Animation
$(".loadercolor").animate(loaderAnimation, {duration: time, iterations:100,});
console.log(time);

// Percentage Increment Animation
let PercentageID = $("#percentage"),
    start = 0,
    end = 100,
    duration = time;
    animateValue(PercentageID, start, end, duration);
    
function animateValue(id, start, end, duration) {
  
  let range = end - start,
      current = start,
      increment = end > start? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);
    
  let timer = setInterval(function() {
    current += increment;
    $(obj).text(current + "%");
      //obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Fading Out Loadbar on Finised
setTimeout(function(){
  $('.loader').fadeOut(300);
}, time);


const experience = new Experience(document.querySelector('.experience-canvas'), person)

