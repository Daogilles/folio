import Highway from '@dogstudio/highway';
import { TweenMax } from 'gsap';

class Layer extends Highway.Transition {
    in(view, done) {
        console.log('in anim layer')

        TweenMax.to(document.querySelector('.layer'), 0.4, {
            y: 0,
            ease: Quad.easeOut,
            onComplete: () => {
                document.querySelector('body').classList.add('gray');
                TweenMax.set(document.querySelector('.layer'), { clearProps: "all" });
                
                TweenMax.fromTo(view, 0.5,
                    { alpha: 0 },
                    {
                        alpha: 1,
                        onComplete: done
                    }
                );
            }
        })
    }

    out(view, done) {
        console.log('out anim layer')

        TweenMax.fromTo(view, 0.3,
            { alpha: 1 },
            {
                alpha: 0,
                onComplete: () => {
                    document.querySelector('body').classList.remove('gray');
                    TweenMax.set(document.querySelector('.layer'), { y: 0 });

                    TweenMax.to(document.querySelector('.layer'), 0.4, {
                        y: -100+ '%',
                        ease: Quad.easeIn,
                        onComplete: () => {
                            TweenMax.set(document.querySelector('.layer'), { clearProps: "all" });
                            done();
                        }
                    })
                }
            }
        );


    }
}

export default Layer;
