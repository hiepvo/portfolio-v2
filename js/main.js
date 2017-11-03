require('../css/normalize.css');
require('../css/main.css');
let utils   = require('./utils/utils')
var jsonArr = [];

let navTemplate     = require('./hbs/nav_template.hbs');
let projectTemplate = require('./hbs/projects_template.hbs');
let skillsTemplate  = require('./hbs/skills_template.hbs');
let contactTemplate = require('./hbs/contact_template.hbs');
let aboutTemplate   = require('./hbs/about_template.hbs');

jsonArr.push('/js/json/nav.json');
jsonArr.push('/js/json/about.json');
jsonArr.push('/js/json/skills.json');
jsonArr.push('/js/json/projects.json');
jsonArr.push('/js/json/contact.json');

var helperFunc = function(xhr){
    return function(){
        if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 400){
            var data = JSON.parse(xhr.responseText);
            switch (Object.keys(data)[0]){
                case 'nav-items':
                    createHTML(navTemplate, data);
                    var items = document.getElementsByClassName('nav-item');
                    for(let item of items){
                        item.addEventListener('click', clickHandler, false)
                    }
                    break;
                case 'about-items':
                    createHTML(aboutTemplate,data);
                    break;
                case 'skills':
                    createHTML(skillsTemplate,data);
                    break;
                case 'project-items':
                    createHTML(projectTemplate, data);
                    break;
                default:
                    createHTML(contactTemplate);
                    break;

            }
        }
    }
}

for(var i = 0; i < jsonArr.length; i++){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', jsonArr[i], true);
    xhr.send();
    xhr.onreadystatechange = helperFunc(xhr);
}

utils.smoothScroll();

function clickHandler(event){
    let els = document.getElementsByClassName('nav-item');
    for(let el of els){
        utils.removeClass(el, 'active')
    }
    let el = event.target;
    utils.addClass(el, 'active')
}

function createHTML(template, data){
    var portfolio = document.getElementById('portfolio');
    if(data !== null){
        portfolio.innerHTML += template(data);
    }
    else{
        portfolio.innerHTML += template();
    }
}


