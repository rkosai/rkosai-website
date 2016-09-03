function Pagination (frame_count, container) {
    this.FRAME_COUNT = frame_count;
    this.container = container;

    // Create touch handler element

    // Attach listeners
}


var FRAME_COUNT = 4;

function init() {
    var handler = document.getElementsByClassName('js-touch-handler')[0];
    var container = document.getElementsByClassName('o-wrapper')[0];

    var startPosition = null;
    var currentFrame = 0;
    var scrollOffset = 0;
    var newNormal = 0;

    var y = function(e) {
        return e.changedTouches[0].screenY;
    }

    // Add touch events
    handler.addEventListener(
        'touchstart',
        function(e) {
            e.preventDefault();
            startPosition = y(e);

            // TBD
            container.style.transition = 'width 0s';
        }
    );

    handler.addEventListener(
        'touchmove',
        function(e) {
            console.log('touchmove');
            e.preventDefault();
            var diff = y(e) - startPosition;
            scrollOffset = diff;
            console.log(scrollOffset);
            container.style.top = (newNormal + scrollOffset) + 'px';
        }
    );

    handler.addEventListener(
        'touchend',
        function(e) {
            e.preventDefault();
            container.style.transition = '0.5s ease-in-out';
            var diff = y(e) - startPosition;
            var offset = null;

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
            offset = -1 * currentFrame * window.screen.height;

            // Adjust for scroll offset
            newNormal += scrollOffset;
            offset -= newNormal;
            scrollOffset = 0;
            console.log(newNormal, offset);

            container.style.transform = 'translate3d(0, ' + offset + 'px, 0)'
            //container.className = "o-wrapper o-offset--" + currentFrame;
        }
    );
}

init();
