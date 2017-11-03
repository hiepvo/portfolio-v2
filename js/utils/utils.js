let SmoothScroll = require('smooth-scroll');

const addClass = function(el, className){
    if(el.classList)
        el.classList.add(className);
    else if(!hasClass(el, className)) el.className += ' ' + className
}

const removeClass = function(el, className){
    if(el.classList){
        el.classList.remove(className);
    }
    else if(hasClass(el, className)){
        var reg      = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ')
    }
}

const hasClass = function(el, className){
    if(el.classList)
        return el.classList.contains(className);
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

const smoothScroll = function(){
    let scroll                    = new SmoothScroll()
    const smoothScrollWithoutHash = function(selector, settings){
        /**
         * If smooth scroll element clicked, animate scroll
         */
        const clickHandler = function(event){
            var toggle = event.target.closest(selector);
            if(!toggle || toggle.tagName.toLowerCase() !== 'a') return;
            var anchor = document.querySelector(toggle.hash);
            if(!anchor) return;

            event.preventDefault(); // Prevent default click event
            scroll.animateScroll(anchor, toggle, settings || {}); // Animate scroll
        };

        document.addEventListener('click', clickHandler, false);
    };

// Run our function
    smoothScrollWithoutHash('a[href*="#"]', {header: '[data-scroll-header]'}, {speed: 1200});
}

let didScroll      = false;
let scrollInterval = setInterval(function(){
    if(didScroll){
        didScroll = false;
        clearInterval(scrollInterval);
    }
}, 100);

function scrollPos(){
    didScroll        = true;
    let skills       = document.querySelectorAll('.skill-bar [id^=\'skill-\']');
    let sec_skills   = document.querySelector('#skills');

    let pageY        = window.scrollY;
    parallax();
    if(sec_skills !== null){
        if(sec_skills.getBoundingClientRect().top <= pageY  +250){
            for(let i = 0; i < skills.length; i++){
                let el = document.querySelector('#' + skills[i].id);
                addClass(el, skills[i].id + '-animation');
            }
        }
    }
}

document.addEventListener('scroll', scrollPos, false);

function parallax(){
    let sec_about   = document.querySelector('#about');
    var scrolled = window.scrollY;
    if(sec_about !== null) sec_about.style.top = -(scrolled*0.0215)+'rem';
}

module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    smoothScroll: smoothScroll
}
