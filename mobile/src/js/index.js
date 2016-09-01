function init() {
    var h = document.getElementsByClassName('js-touch-handler')[0];

    // Add touch events
    h.addEventListener(
        'touchstart',
        function(e) {
            console.log('touchstart');
            e.preventDefault();
        },
        false
    );

    h.addEventListener(
        'touchmove',
        function(e) {
            console.log('touchmove');
            e.preventDefault();
        },
        false
    );

    h.addEventListener(
        'touchend',
        function(e) {
            console.log('touchend');
            e.preventDefault();
        },
        false
    );
}

init();
