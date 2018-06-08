import Highway from '@dogstudio/highway';

class About extends Highway.Renderer {
    onEnter() {
        console.log('on enter about')
        let body = document.querySelector('body');
        // body.removeAttribute("id");
        body.setAttribute('id', 'page-about');
        document.querySelector('.main').classList.remove('home');

        window.isSsr ? body.classList.add('gray') : TweenMax.set(this.view, {opacity: 0});

        TweenMax.to(document.querySelector('footer'), 0.2, {
            opacity: 0,
            onComplete: () => {
                document.querySelector('footer').classList.add('hide');
            }
        });
    }
    onLeave() {
        // console.log('on leave projects')
    }
    onEnterCompleted() {
        // console.log('onEnterCompleted projects')
        TweenMax.set(this.view, {clearProps: "all"});
    }
    onLeaveCompleted() {
        // console.log('onLeaveCompleted projects')
        // isSsr = false;
        document.querySelector('footer').classList.remove('hide');
    }
}

export default About;
