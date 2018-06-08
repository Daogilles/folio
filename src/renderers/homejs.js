import $ from 'jquery';
import {TweenMax, TimelineMax} from "gsap";
// import TiltObj from "../utils/customparallax.js";
import Tilt from "../utils/tilt.js";

// import Lethargy from '../../vendor/lethargy.min.js';
// import Render from '../utils/Render.js';
// import VScroll from '../utils/VScroll.js';

export default class HomeJs {

    constructor() {
        this.$window = $(window);
        this.$home = $('.home');
        this.$slaveHandle = this.$home.find("#dummy-dragger");
        this.$slider = this.$home.find('#slider');
        this.$wrapper = this.$slider.find('.slider__wrapper');
        this.$slides = this.$slider.find('.slide');
        this.$slidernav = this.$home.find('#slider__nav');
        this.navTotal = this.$slides.length;
        this.$navActive = this.$slidernav.find('.active');
        this.$navTotalEl = this.$slidernav.find('.totale');
        this.splitChars = [];
        this.draggable;
        this.snaps = [];
        this.index = 0;
        this.lastindex = -1;
        this.duration = 5;
        this.lethargy = new Lethargy();
        this.freezeScroll = false;
        this.DOM = {};
        this.shapes = [];
        this.tlShape = false;
        this.draggable;

        this.init = this.init.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.resize = this.resize.bind(this);

        this.init();
    }

    init() {
        this.$navTotalEl.html("0"+this.navTotal);
        this.$navActive.html("0"+(this.index+1));

    	// var i = 0;
    	// while (i < $slides.length) {
    	// 	splitChars.push(new SplitText( $slides.find('.slide--description-title')[ i ], { type: "words"} ) )
    	// 	i++;
    	// }

    	// $navSlides.find('a').on('click', HomeJs.onClick);

    	window.Render.add(this.onUpdate);
    	window.VScroll.add(this.onScroll);
    	this.$window.resize(this.resize);

        this.initSlider();
        this.initShape();

        // document.querySelectorAll('.slide').forEach(el => new TiltObj(el))
        document.querySelectorAll('.slide').forEach(el => new Tilt(el))
    }

    initShape() {
        this.DOM.svg = document.querySelector('.morph');
        this.DOM.shapeEl = this.DOM.svg.querySelector('path');

        this.shapes = [
            {
                path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
                pathAlt: 'M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z',
                scaleX: 1.3,
                scaleY: 1.3,
                tx: 0,
                ty: 0
            },
            {
                path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
    			pathAlt: 'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
    			scaleX: 1.9,
    			scaleY: 1,
                tx: 250,
                ty: 50,
            }
        ];
    }

    initShapeLoop(pos) {
        if(this.tlShape){
            this.tlShape.play();
            return;
        }

        this.pos = this.pos || 0;

        this.tlShape = new TimelineMax({
            repeat: -1,
            yoyo: true,
            paused: true
        });

        this.tlShape.fromTo(this.DOM.shapeEl, 8, {
            attr: {
                d: this.shapes[0].pathAlt
            },
        }, {
            attr: {
                d: this.shapes[0].path
            },
            ease: Linear.easeNone
        });
        this.tlShape.fromTo(this.DOM.shapeEl, 8, {
            attr: {
                d: this.shapes[0].path
            },
        }, {
            attr: {
                d: this.shapes[1].path
            },
            ease: Linear.easeNone
        });
        this.tlShape.play();
    }

    initShapeEl() {
        TweenMax.set(this.DOM.svg, {
            scaleX: this.shapes[0].scaleX,
            scaleY: this.shapes[0].scaleY,
            translateX: this.shapes[0].tx+'px',
            translateY: this.shapes[0].ty+'px'
        })

        this.initShapeLoop();
    }

    getNearest(array, value) {
    	var smallestDiff = Math.abs(value - array[0]);
    	var closest = 0;
    	var i = 1;
    	while (i < array.length) {
    		var currentDiff = Math.abs(value - array[i]);
    		if (currentDiff < smallestDiff) {
    			smallestDiff = currentDiff;
    			closest = i;
    		}
    		i++;
    	}
    	return [array[closest], closest];
    }

    updateProps() {
    	this.snaps = [];
    	var margin = this.$slides.eq(0).offset().left;
    	this.$slides.each((i, el) => {
    		this.snaps.push(- ($(el).offset().left - margin));
    	});
    }

    initSlider() {
        // console.log('initSlider')
    	if (this.draggable) {
    		this.draggable[0].kill();
    	}

    	// this.index = 0;

    	this.updateProps();

    	this.draggable = Draggable.create(this.$slaveHandle, {
    		trigger: this.$slider,
    		type: "x",
    		throwProps: true,
    		autoScroll: false,
    		dragResistance: .3,
    		edgeResistance: .6,
    		onPress: this.onPress.bind(this),
    		onRelease: this.onRelease.bind(this),
    		snap: {
    			x: (endValue) => {
                    // FIX on load home
                    this.updateProps();
    				var nearest = this.getNearest(this.snaps, endValue);
    				this.index = nearest[1];
                    this.draggable[0].update();
    				this.updateClasses();
    				return nearest[0];
    			},
    		}
    	});
        // draggable = Draggable.create($slaveHandle);
    	TweenMax.set(this.$slaveHandle, { x: 0 });

        // console.log(this.draggable[0])
    	this.draggable[0].update();
    	this.updateClasses();
    }

    updateClasses() {
    	if (this.lastindex == this.index) {
    		return;
    	}

        let activeSlide = this.$slides.eq(this.index);
        this.$slides.removeClass('active');
    	activeSlide.addClass('active');

    	this.lastindex = this.index;

        if(activeSlide.hasClass('msf')) {
            this.initShapeEl();
        }else if(this.tlShape){
            this.tlShape.pause();
        }

        this.$navActive.html("0"+(this.index+1));
    	// $navSlides.removeClass('active');
    	// $navSlides.eq(index).addClass('active');
        // TweenMax.killTweensOf($navSlides.find('i'));
    	// TweenMax.killTweensOf($navSlides.find('.text'));
    	// TweenMax.set($navSlides.find('i'), { width: 0 + '%'});
    	// TweenMax.set($navSlides.find('.text'), { width: 0 + '%'});
        // TweenMax.to($navSlides.eq(index).find('.text'), duration, { width: 100 + '%' });
    	// TweenMax.to($navSlides.eq(index).find('i'), duration, { width: 100 + '%', onComplete: function() {
    	// 	console.log('complete')
    	// 	next();
    	// }});
        // TweenMax.set(splitChars[index].words, { alpha: 0, y: 30, x: 50, rotationX : -90, rotationY : 10 });
    	// var time = 7.0 / splitChars[index].words.length;
    	// TweenMax.staggerTo( splitChars[index].words, time, {
    	// 	alpha     : 1.0,
    	// 	y         : 0,
    	// 	x         : 0,
    	// 	rotationX : 0,
    	// 	rotationY : 0,
    	// 	delay     : 0.3,
    	// 	ease      : Expo.easeOut
    	// }, 0.03 );
    }

    previous() {
    	this.index--;
    	if (this.index < 0) {
    		this.index = this.$slides.length - 1;
    	}
    	this.goTo();
    }

    next() {
    	this.index++;
    	if (this.index > this.$slides.length - 1) {
    		this.index = 0;
    	}
    	this.goTo();
    }

    goTo(i) {
    	if (i) {
    		this.index = i;
    	}
    	this.updateProps();
    	var nearest = this.getNearest(this.snaps, this.snaps[this.index]);
    	TweenMax.killTweensOf(this.$slaveHandle);
    	TweenMax.to(this.$slaveHandle, 1, { x:nearest[0], overwrite:true, ease: Quint.easeOut, onUpdate: () => {
    		this.draggable[0].update();
    	}, onComplete: () => {
            this.freezeScroll = false;
        }});
    	this.updateClasses();
    }

    onPress(){
        console.log('onpress')
    	this.$slider.addClass('grabbing');
    	if (!$('html').hasClass('mobile')) {
    		TweenMax.to(this.$slides, .1, { scale: .97 });
    	}
    }

    onRelease(){
    	this.$slider.removeClass('grabbing');
    	if (!$('html').hasClass('mobile')) {
    		TweenMax.to(this.$slides, .15, { scale: 1 });
    	}
    }

    onScroll(event) {

    	event = event.originalEvent;
        // console.log('onscroll')
        let open = true;
    	if (event.type == 'keydown' && !open) {
    		// let down = event.keyCode == 37,
        	// 	up   = event.keyCode == 39,
        	// 	esc  = event.keyCode == 27;

            let down = event.keyCode == 40,
        		up   = event.keyCode == 38,
        		esc  = event.keyCode == 27;

    		if(down) {
    			event.stopPropagation();
    			event.preventDefault();
    			this.next();
    		} else if(up) {
    			event.stopPropagation();
    			event.preventDefault();
    			this.previous();
    		}
    	}

    	if ( (event.type == 'wheel' || event.type == 'scroll')  && !open) {
    		event.stopPropagation();
    		event.preventDefault();

    		var delta = this.lethargy.check(event);
    		if (delta !== false) {

    			if (delta == -1 && !this.freezeScroll) {
    				this.next();
    			} else if (delta == 1 && !this.freezeScroll) {
    				this.previous();
    			}
    			this.freezeScroll = true;
    		}
    	}
    }

    onClick(e) {
    	e.preventDefault();
    	var $target = $(e.target).parents('.nav-slide');
    	this.index = $target.index();
    	this.goTo();
    }

    onUpdate() {
        // console.log('onUpdate')
        // console.log(this.draggable[0].x)
        TweenMax.set(this.$wrapper, { x: this.draggable[0].x, force3D: true });
        // update x position of nav
    	// var x = draggable[0].x / snaps[snaps.length - 1];
    	// x = x * ((snaps.length - 1) * 250);
    	// TweenMax.to($nav, .3, { x: -x, force3D: true, ease: Expo.easeOut });
    }

    resize() {
    	this.initSlider();
    }

    destroy() {
        // console.log('destroy in HomeJs')
        window.Render.remove(this.onUpdate);
    	window.VScroll.remove(this.onScroll);
    }
}
