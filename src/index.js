import {TweenMax, TimelineLite} from "gsap";
import $ from "jquery";
import Highway from '@dogstudio/highway';

import Device from './utils/Device.js';
import Render from './utils/Render.js';
import VScroll from './utils/VScroll.js';

// Import Renderers
import Home from './renderers/home';
import Projects from './renderers/projects';
import About from './renderers/about';

// Import Transitions
import Fade from './transitions/fade';
import Layer from './transitions/layer';



(() => {

    // var isSsr = true;

    window.Device = new Device();
    window.Render = new Render();
    window.VScroll = new VScroll();
    window.isSsr = true;

    const H = new Highway.Core({
        renderers: {
            home: Home,
            projects: Projects,
            about: About
        },
        transitions: {
            'default': Fade,
            home: Fade,
            projects: Fade,
            about: Layer
        }
    });

    var main = document.querySelector('.main');
    TweenMax.set(main, { opacity: 0 });
    // fix
    if(window.isSsr) {
        TweenMax.fromTo(document.querySelector('body'), 0.4,
            { alpha: 0 },{alpha: 1}
        );
        TweenMax.fromTo(main, 0.6,
            { alpha: 0 },{ alpha: 1 }
        );
    }

    document.querySelector('#menu').addEventListener('click', (e) => {
        console.log(e.currentTarget)
        document.querySelector('body').classList.add('disable-scroll');
        TweenMax.set(document.querySelector('.blur'), { zIndex: 9999 });
        TweenMax.to(document.querySelector('.blur'), 0.5, {
            // zIndex: 99999,
            opacity: 1,
            scale: 7,
            webkitFilter:"blur(0px)",
            ease: Quad.easeIn
        })
        TweenMax.to(main, 0.6, {
            scale: 0.9,
            ease: Quad.easeIn
        })
    })

    H.on('NAVIGATE_IN', (to, state) => {
        // console.log("H NAVIGATE_IN")
        TweenMax.set(main, { clearProps: "all" });
        window.isSsr = false;
        document.querySelector('body').removeAttribute("id");
    });

    // H.on('NAVIGATE_OUT', (from, state) => {
    //     console.log("H NAVIGATE_OUT")
    // });
    //
    // H.on('NAVIGATE_END', (from, to, state) => {
    //     console.log("H NAVIGATE_END")
    // });
    //
    // H.on('NAVIGATE_ERROR', (error) => {
    //     console.log("H NAVIGATE_ERROR")
    // });

    // $(document).ready(() => {
    //     console.log('ready main.js');
    // });

})();
