function Pagination (container, frame_count) {
    this.FRAME_COUNT = frame_count;
    this.container = container;

    // Create touch handler element
    this.handler = this._createHandler();

    // Measure the boundary height
    this.HEIGHT = this.handler.getBoundingClientRect().height;

    // State variables
    this.state = {
        frame: 0,
        scrollStart: 0,
        offset: 0,
    };

    // Attach listeners
    this.handler.addEventListener('touchstart', this._startHandler.bind(this));
    this.handler.addEventListener('touchmove', this._moveHandler.bind(this));
    this.handler.addEventListener('touchend', this._endHandler.bind(this));
}

Pagination.prototype._createHandler = function() {
    var elem = document.createElement('div');
    elem.id = 'js-touch-handler';
    elem.style.position = 'fixed';
    elem.style.top = 0;
    elem.style.bottom = 0;
    elem.style.left = 0;
    elem.style.right = 0;
    elem.style.zIndex = 1;

    document.body.appendChild(elem);
    return elem;
};

Pagination.prototype._startHandler = function(e) {
    e.preventDefault();
    this.state.scrollStart = this._y(e);

    // Disable CSS transitions while "scrolling"
    this.container.style.transition = 'width 0s';
};

Pagination.prototype._moveHandler = function(e) {
    e.preventDefault();
    var diff = this._y(e) - this.state.scrollStart;
    this.container.style.top = (this.state.offset + diff) + 'px';
};

Pagination.prototype._endHandler = function(e) {
    e.preventDefault();

    // Re-enable transitions before auto-scrolling
    this.container.style.transition = '0.5s ease-in-out';

    // Calculate if the user swiped
    var diff = this._y(e) - this.state.scrollStart;
    this.state.offset += diff;

    // If the user swiped far enough, advance the frame.
    if (diff < -50) {
        this.state.frame++;
    }
    else if (diff > 50) {
        this.state.frame--;
    }

    // Keep the frame in bounds
    if (this.state.frame < 0) {
        this.state.frame = 0;
    }
    else if (this.state.frame >= this.FRAME_COUNT - 1) {
        this.state.frame = this.FRAME_COUNT - 1;
    }

    // Apply the correct frame (could involve scrolling back to the last one)
    var translate = null;
    translate = -1 * this.state.frame * this.HEIGHT;

    // Adjust for scroll offset
    translate -= this.state.offset;

    this.container.style.transform = 'translate3d(0, ' + translate + 'px, 0)'
};

Pagination.prototype._y = function(e) {
    return e.changedTouches[0].screenY;
};

var p = new Pagination(
    document.getElementsByClassName('o-wrapper')[0],
    4
);

