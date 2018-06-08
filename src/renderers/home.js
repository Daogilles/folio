import Highway from '@dogstudio/highway';

import $ from 'jquery';
import HomeJs from "./homejs.js";

class Home extends Highway.Renderer {
    onEnter() {
        // console.log('on enter home')
        // document.querySelector('body').removeAttribute("id");
        document.querySelector('body').setAttribute('id', 'page-home');
        document.querySelector('.main').classList.add('home');

        if(!window.isSsr) TweenMax.set(this.view, {opacity: 0});

        TweenMax.to(document.querySelector('footer'), 0.2, {
            opacity: 1
        });

        this.hm = new HomeJs();
    }
    onLeave() {
        // console.log('on leave home')
    }
    onEnterCompleted() {
        // console.log('onEnterCompleted home')
        TweenMax.set(this.view, {clearProps: "all"});
    }
    onLeaveCompleted() {
        // console.log('onLeaveCompleted home')
        this.hm.destroy();
    }
}

export default Home;
