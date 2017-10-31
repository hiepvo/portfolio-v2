module.exports = function(data){
    const clickHandler = function (event) {
        var toggle = event.target.closest( 'a[href*="#"]' );
        if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
        var anchor = document.querySelector( toggle.hash );
        if ( !anchor ) return;
        console.log('j')
        return 'active';
    };
    var items = document.querySelectorAll('items');
    //console.log(items)
    //document.addEventListener('onclick', clickHandler, false );
};
