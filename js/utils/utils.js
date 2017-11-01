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

let didScroll   = false;
let scrollInterval = setInterval(function(){
    if(didScroll){
        didScroll = false;
        clearInterval(scrollInterval);
    }
}, 100);

function scrollPos(){
    didScroll    = true;
    let skills = document.querySelectorAll(".skill-bar [id^='skill-']");

    let el_nav = document.querySelector("#sticky");
    let sec_about = document.querySelector('#about');

    let pageY = window.scrollY;
    let total_height = el_nav.getBoundingClientRect().bottom + sec_about.getBoundingClientRect().bottom;

    if (total_height <= pageY){
        for(let i = 0; i < skills.length; i++){
            let el = document.querySelector("#"+ skills[i].id);
            addClass(el, skills[i].id+'-animation');
        }

        document.removeEventListener('scroll', scrollPos);
    }
}

document.addEventListener('scroll', scrollPos, false);

module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    smoothScroll: smoothScroll
}
