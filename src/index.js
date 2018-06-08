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

    TweenMax.set(document.querySelector('.main'), { opacity: 0 });
    console.log('isSsr '+window.isSsr)
    // fix
    if(window.isSsr) {
        console.log('inner isSsr')
        // body.classList.add('gray');
        TweenMax.fromTo(document.querySelector('body'), 0.4,
            { alpha: 0 },
            {
                alpha: 1
            }
        );
        TweenMax.fromTo(document.querySelector('.main'), 0.6,
            { alpha: 0 },
            {
                alpha: 1
            }
        );
    }

    H.on('NAVIGATE_IN', (to, state) => {
        // console.log("H NAVIGATE_IN")
        TweenMax.set(document.querySelector('.main'), { clearProps: "all" });
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
