import Highway from '@dogstudio/highway';

class Projects extends Highway.Renderer {
    onEnter() {
        // console.log('on enter projects')
        let body = document.querySelector('body');
        // body.removeAttribute("id");
        body.setAttribute('id', 'page-project');
        document.querySelector('.main').classList.remove('home');

        if(!window.isSsr) TweenMax.set(this.view, {opacity: 0});

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
    }
    onLeaveCompleted() {
        // console.log('onLeaveCompleted projects')
        document.querySelector('footer').classList.remove('hide');
    }
}

export default Projects;
