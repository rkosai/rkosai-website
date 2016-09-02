var FRAME_COUNT = 4;

function init() {
    var handler = document.getElementsByClassName('js-touch-handler')[0];
    var container = document.getElementsByClassName('o-wrapper')[0];

    var startPosition = null;
    var currentFrame = 0;
    var y = function(e) {
        return e.changedTouches[0].screenY;
    }

    // Add touch events
    handler.addEventListener(
        'touchstart',
        function(e) {
            e.preventDefault();
            startPosition = y(e);
        }
    );

    handler.addEventListener(
        'touchend',
        function(e) {
            e.preventDefault();
            var diff = y(e) - startPosition;

            // If the user swiped, advance the frame.
            if (diff < -50) {
                currentFrame++;
            }
            else if (diff > 50) {
                currentFrame--;
            }

            // Keep the frame in bounds
            if (currentFrame < 0) {
                currentFrame = 0;
            }
            else if (currentFrame >= FRAME_COUNT - 1) {
                currentFrame = FRAME_COUNT - 1;
            }

            // Apply the correct frame
            container.className = "o-wrapper o-offset--" + currentFrame;
        }
    );
}

init();
