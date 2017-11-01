require('../css/normalize.css');
require('../css/main.css');
let utils = require('./utils/utils')
let navTemplate     = require('./hbs/nav_template.hbs');
let projectTemplate = require('./hbs/projects_template.hbs');
let skillsTemplate  = require('./hbs/skills_template.hbs');
let contactTemplate = require('./hbs/contact_template.hbs');
let aboutTemplate   = require('./hbs/about_template.hbs');

var request = new XMLHttpRequest();
request.open('GET', '/js/json/nav.json');
request.onload = function(){
    if(request.status >= 200 && request.status < 400){
        var data = JSON.parse(request.responseText);
        createHTML(data);
        var items = document.getElementsByClassName('nav-item');
        for(let item of items){
            item.addEventListener('click', clickHandler, false)
        }

    } else{
        console.log('We connected to the server, but it returned an error.');
    }
};

request.onerror = function(){
    console.log('Connection error');
};

request.send();

utils.smoothScroll();

function clickHandler (event) {
    let els = document.getElementsByClassName('nav-item');
    for(let el of els){
        utils.removeClass(el, 'active')
    }
    let el = event.target;
    utils.addClass(el, 'active')
}


function createHTML(data){
    var portfolio       = document.getElementById('portfolio');
    portfolio.innerHTML = navTemplate(data);
    portfolio.innerHTML += aboutTemplate();
    portfolio.innerHTML += skillsTemplate();
    portfolio.innerHTML += projectTemplate();
    portfolio.innerHTML += contactTemplate();

}


