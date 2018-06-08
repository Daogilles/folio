// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos = function(ev) {
    let posx = 0;
    let posy = 0;
    if (!ev) ev = window.event;
    if (ev.pageX || ev.pageY) 	{
        posx = ev.pageX;
        posy = ev.pageY;
    }
    else if (ev.clientX || ev.clientY) 	{
        posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x : posx, y : posy };
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TiltObj = function(el) {
    this.el = el;
    this.options = [];
    this.arr = [];
    var _this = this;

    this.elements = this.el.querySelectorAll('.parallax-el');
    Array.prototype.forEach.call(this.elements, function(elt, i){
        let vx = 0;
        let vy = 0;

        if (elt.getAttribute('data-x') && elt.getAttribute('data-y')) {
            vx = parseInt(elt.getAttribute('data-x'));
            vy = parseInt(elt.getAttribute('data-y'));
        }

        _this.arr[i] = { el: elt, x: vx, y: vy };
        _this.options.push(_this.arr[i]);
    });

    // this.options = extend({}, this.options);
    // extend(this.options, options);
    // this.DOM = {};
    // this.DOM.img = this.el.querySelector('.content__img');
    // this.DOM.title = this.el.querySelector('.content__title');
    this._initEvents();
    // console.log(options)
};

// TiltObj.prototype.options = {
//     movement: {
//         img : { translation : {x: -10, y: -10} },
//         title : { translation : {x: 25, y: 25} },
//     }
// };

TiltObj.prototype._initEvents = function() {
    this.mouseenterFn = (ev) => {
        // requestAnimationFrame(() => this._layout(ev));
    //     anime.remove(this.DOM.img);
    //     anime.remove(this.DOM.title);

    };

    this.mousemoveFn = (ev) => {
        // console.log('mousemoveFn')
        requestAnimationFrame(() => this._layout(ev));
    };

    this.mouseleaveFn = (ev) => {
        // requestAnimationFrame(() => this._layout(ev));
        // requestAnimationFrame(() => {
        //     anime({
        //         targets: [this.DOM.img, this.DOM.title],
        //         duration: 1500,
        //         easing: 'easeOutElastic',
        //         elasticity: 400,
        //         translateX: 0,
        //         translateY: 0
        //     });
        // });
    };

    // requestAnimationFrame(this._layout());

    this.el.addEventListener('mousemove', this.mousemoveFn);
    this.el.addEventListener('mouseleave', this.mouseleaveFn);
    this.el.addEventListener('mouseenter', this.mouseenterFn);
};

TiltObj.prototype._layout = function(ev) {
    // Mouse position relative to the document.
    const mousepos = getMousePos(ev);
    // Document scrolls.
    const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
    const bounds = this.el.getBoundingClientRect();
    // Mouse position relative to the main element (this.DOM.el).
    const relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };

    Array.prototype.forEach.call(this.options, function(elmt, i){
        let transforms = {
            e : {
                x:(-1*elmt.x - elmt.x)/bounds.width*relmousepos.x + elmt.x,
                y: (-1*elmt.y - elmt.y)/bounds.height*relmousepos.y + elmt.y,
                around1: (relmousepos.y * 100 / bounds.height * 0.2 - 10) + 'deg',
                around2: -1 * (relmousepos.x * 100 / bounds.width * 0.2 - 10) + 'deg',
                trans1: (relmousepos.x * 100 / bounds.height * 0.2 - 10) + 'px',
                trans2: (relmousepos.y * 100 / bounds.height * 0.2 - 10) + 'px'
            }
        };

        if (elmt.el.classList.contains('perspec')) {
            elmt.el.style.WebkitTransform = elmt.el.style.transform =
            'translateX(' + transforms.e.x + 'px) translateY(' + transforms.e.y + 'px) '+
            // 'translate3d(' + transforms.e.trans1 + ', ' + transforms.e.trans2 +', 0)';
            'rotatex(' + transforms.e.around1 + ') rotatey(' + transforms.e.around2 + ')';
        }else {
            elmt.el.style.WebkitTransform = elmt.el.style.transform =
            'translateX(' + transforms.e.x + 'px) translateY(' + transforms.e.y + 'px) ';
        }
    });
};

export default TiltObj;
