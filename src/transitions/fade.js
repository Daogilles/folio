// Import Highway
import Highway from '@dogstudio/highway';

// This example uses `Greensock` an animation library
import { TweenMax } from 'gsap';

// To create your custom transition you need to provide two required methods:
// - `in`: The transition part to show your view.
// - `out`: The transition part to hide you view.
//
// Each method receives a callback method called `done` you will always have to
// call when the a transition is over.
class Fade extends Highway.Transition {
    in(view, done) {
        // console.log('in fade')

        // done();
        TweenMax.fromTo(document.querySelector('.progress span'), 0.4,
        { width: 0 },
        {
            width: 100+ '%',
            ease: Quad.easeInOut,
            onComplete: () => {
                TweenMax.to(document.querySelector('.progress span'), 0.2, {
                    opacity: 0,
                    y: -5,
                    ease: Quad.easeIn,
                    onComplete: () => {
                        TweenMax.set(document.querySelector('.progress span'), { clearProps: "all" });

                        TweenMax.fromTo(view, 0.5,
                            { alpha: 0 },
                            {
                                alpha: 1,
                                onComplete: done
                            }
                        );
                    }
                });

            }
        });
    }

    out(view, done) {
        // console.log('out fade')
        TweenMax.fromTo(view, 0.4,
            { alpha: 1 },
            {
                alpha: 0,
                onComplete: done
            }
        );
    }
}

export default Fade;
