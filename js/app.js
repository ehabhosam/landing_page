/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
const t1= performance.now(); // needed for testing performance
/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const x = sections.length;
let navbarItems = creatingnavbar();
const myheader = document.querySelector('.page__header');



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

elementInViewport = (el) => {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height) <= (window.pageYOffset + window.innerHeight) &&
      (left + width) <= (window.pageXOffset + window.innerWidth)
    );
  }
function deleteactive(){
    const sections = document.querySelectorAll('section');
    for (let section of sections){
        section.classList.remove('your-active-class')
    }
}
navbarNotActive = function(elements){
    for(let element of elements){
        element.classList.remove('active__item')
    }
}

let hidenavbar = function(){setTimeout(function(){
    myheader.classList.add('reading');
},5000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function creatingnavbar() {
    let navbarItems = '';
    for (let i = 1; i <= x; i++) {
        navbarItems += `<li>Section ${i}</li>`;
    }
    return navbarItems;
}


// Add class 'active' to section when near top of viewport
document.addEventListener("scroll",function(){
    const sections = document.querySelectorAll('section');
    for (let section of sections){
        if (elementInViewport(section) === true){
            deleteactive()
            section.classList.add('your-active-class')
        }
    }
})



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.getElementById('navbar__list').insertAdjacentHTML("afterbegin",navbarItems);
const listofnavbaritems = document.querySelectorAll('li');
for (let i = 0; i<=(x - 1); i++){
    listofnavbaritems[i].classList.add('navbaritem');
    listofnavbaritems[i].classList.add('menu__link');
}
// Scroll to section on link click

for (let i = 0; i<=(x - 1); i++){
    listofnavbaritems[i].addEventListener('click',function(){
        sections[i].scrollIntoView({ behavior:"smooth"})
    })
}
// Set sections as active in navigation bar
// listofnavbaritems[0].classList.add('active__item')
document.addEventListener('scroll',function(){
    const sections = document.querySelectorAll('section');
    for (let i = 0; i <= (x - 1); i++){
        if (elementInViewport(sections[i]) === true){
            navbarNotActive(listofnavbaritems);
            listofnavbaritems[i].classList.add('active__item');
        }
    }
})

// Go to top when logo clicked

document.querySelector('.logo').addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
});

/* scroll detection 


window.addEventListener(function(){
    if (window.scrollY <= 100){
        myheader.classList.remove('reading');
    } else if (window.scrollY >= 100) {
        window.addEventListener('scroll',function(){
            myheader.classList.remove('reading');
            // window.clearTimeout(hidenavbar);
            hidenavbar();
        });
    }
})   */

// back to top 

document.querySelector('.backToTop').style.display = 'none';
document.querySelector('.backToTop').addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
})
window,addEventListener('scroll',function(){
    if ( window.scrollY >= 2000 ){
        document.querySelector('.backToTop').style.display = '';
    } else {
        document.querySelector('.backToTop').style.display = 'none';
    }

})

// responsive navbar

const menu_btn = document.querySelector('.navmenu');
const menu = document.querySelector('.menu_con');
menu.classList.toggle('toggle');
menu_btn.addEventListener('click', () => {
    menu.classList.toggle('toggle');
})


// test performance
const t2= performance.now();
const quality = t2 - t1;
console.log(quality);

