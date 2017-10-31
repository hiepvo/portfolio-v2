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

module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    smoothScroll: smoothScroll
}
