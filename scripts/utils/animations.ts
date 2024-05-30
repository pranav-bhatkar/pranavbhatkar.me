import gsap from 'gsap'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

// Animation - Page transition In
export function pageTransitionIn(href: string, router: AppRouterInstance) {
    initNextWord(href)
    const tl = gsap.timeline()

    // tl.call(function () {
    //     scroll.stop()
    // })

    tl.set('.loading-screen', {
        top: '100%',
    })

    tl.set('.loading-words', {
        opacity: 0,
        y: 0,
    })

    tl.set('html', {
        cursor: 'wait',
    })

    if (window.innerWidth > 540) {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '10vh',
        })
    } else {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '5vh',
        })
    }

    tl.to('.loading-screen', {
        duration: 0.5,
        top: '0%',
        ease: 'Power4.easeIn',
    })

    if (window.innerWidth > 540) {
        tl.to(
            '.loading-screen .rounded-div-wrap.top',
            {
                duration: 0.4,
                height: '10vh',
                ease: 'Power4.easeIn',
            },
            '=-.5'
        )
    } else {
        tl.to(
            '.loading-screen .rounded-div-wrap.top',
            {
                duration: 0.4,
                height: '10vh',
                ease: 'Power4.easeIn',
            },
            '=-.5'
        )
    }

    tl.to('.loading-words', {
        duration: 0.8,
        opacity: 1,
        y: -50,
        ease: 'Power4.easeOut',
        delay: 0.05,
    })

    tl.set('.loading-screen .rounded-div-wrap.top', {
        height: '0vh',
    })

    tl.to(
        '.loading-screen',
        {
            duration: 0.8,
            top: '-100%',
            ease: 'Power3.easeInOut',
        },
        '=-.2'
    )

    tl.to(
        '.loading-words',
        {
            duration: 0.6,
            opacity: 0,
            ease: 'linear',
        },
        '=-.8'
    )

    tl.to(
        '.loading-screen .rounded-div-wrap.bottom',
        {
            duration: 0.85,
            height: '0',
            ease: 'Power3.easeInOut',
        },
        '=-.6'
    )

    tl.set(
        'html',
        {
            cursor: 'auto',
        },
        '=-0.6'
    )

    if (window.innerWidth > 540) {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '10vh',
        })
    } else {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '5vh',
        })
    }

    tl.set('.loading-screen', {
        top: '100%',
        onComplete: function () {
            router.prefetch(href)
        },
    })

    tl.set('.loading-words', {
        opacity: 0,
        onComplete: function () {
            router.push(href)
        },
    })
}

// Animation - Page transition Out
export function pageTransitionOut() {
    const tl = gsap.timeline()

    if (window.innerWidth > 540) {
        tl.set('main', {
            y: '50vh',
        })
    } else {
        tl.set('main', {
            y: '20vh',
        })
    }

    // tl.call(function () {
    //     scroll.start()
    // })

    tl.to('main', {
        duration: 1,
        y: '0vh',
        stagger: 0.05,
        ease: 'Expo.easeOut',
        delay: 0.8,
        clearProps: 'true',
        // onComplete: function () {
        //     router.push(href)
        // },
    })
}

export function initLoaderHome() {
    const tl = gsap.timeline()

    tl.set('.loading-screen', {
        top: '0',
    })

    if (window.innerWidth > 540) {
        tl.set('main .once-in', {
            y: '50vh',
        })
    } else {
        tl.set('main .once-in', {
            y: '10vh',
        })
    }

    tl.set('.loading-words', {
        opacity: 0,
        y: -50,
    })

    tl.set('.loading-words .active', {
        display: 'none',
    })

    tl.set('.loading-words .home-active, .loading-words .home-active-last', {
        display: 'block',
        opacity: 0,
    })

    tl.set('.loading-words .home-active-first', {
        opacity: 1,
    })

    if (window.innerWidth > 540) {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '10vh',
        })
    } else {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '5vh',
        })
    }

    tl.set('html', {
        cursor: 'wait',
    })

    tl.to('.loading-words', {
        duration: 0.8,
        opacity: 1,
        y: -50,
        ease: 'Power4.easeOut',
        delay: 0.5,
    })

    tl.to(
        '.loading-words .home-active',
        {
            duration: 0.01,
            opacity: 1,
            stagger: 0.15,
            ease: 'none',
            onStart: homeActive,
        },
        '=-.4'
    )

    function homeActive() {
        gsap.to('.loading-words .home-active', {
            duration: 0.01,
            opacity: 0,
            stagger: 0.15,
            ease: 'none',
            delay: 0.15,
        })
    }

    tl.to('.loading-words .home-active-last', {
        duration: 0.01,
        opacity: 1,
        delay: 0.15,
    })

    tl.to('.loading-screen', {
        duration: 0.8,
        top: '-100%',
        ease: 'Power4.easeInOut',
        delay: 0.2,
    })

    tl.to(
        '.loading-screen .rounded-div-wrap.bottom',
        {
            duration: 1,
            height: '0vh',
            ease: 'Power4.easeInOut',
        },
        '=-.8'
    )

    tl.to(
        '.loading-words',
        {
            duration: 0.3,
            opacity: 0,
            ease: 'linear',
        },
        '=-.8'
    )

    tl.set('.loading-screen', {
        top: 'calc(-100%)',
    })

    tl.set('.loading-screen .rounded-div-wrap.bottom', {
        height: '0vh',
    })

    tl.to(
        'main .once-in',
        {
            duration: 1.5,
            y: '0vh',
            stagger: 0.07,
            ease: 'Expo.easeOut',
            clearProps: true,
        },
        '=-.8'
    )

    tl.set(
        'html',
        {
            cursor: 'auto',
        },
        '=-1.2'
    )
}
export function initNextWord(href: string) {
    const paths = [
        {
            href: '/',
            id: 'home-dot',
        },
        {
            href: '/about',
            id: 'about-dot',
        },
        {
            href: '/projects',
            id: 'projects-dot',
        },
        {
            href: '/blog',
            id: 'blog-dot',
        },
    ]

    const nextPath = paths.find((path) => path.href === href)
    if (!nextPath) return
    // remove active class from all dots
    paths.forEach((path) => {
        const dot = document.getElementById(path.id)
        dot?.classList.remove('active')
    })
    const nextDot = document.getElementById(nextPath.id)
    nextDot?.classList.add('active')
}
// Animation - First Page Load
export function initLoader() {
    const tl = gsap.timeline()

    tl.set('.loading-screen', {
        top: '0',
    })

    if (window.innerWidth > 540) {
        tl.set('main .once-in', {
            y: '50vh',
        })
    } else {
        tl.set('main .once-in', {
            y: '10vh',
        })
    }

    tl.set('.loading-words', {
        opacity: 1,
        y: -50,
    })

    if (window.innerWidth > 540) {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '10vh',
        })
    } else {
        tl.set('.loading-screen .rounded-div-wrap.bottom', {
            height: '5vh',
        })
    }

    tl.set('html', {
        cursor: 'wait',
    })

    tl.to('.loading-screen', {
        duration: 0.8,
        top: '-100%',
        ease: 'Power4.easeInOut',
        delay: 0.5,
    })

    tl.to(
        '.loading-screen .rounded-div-wrap.bottom',
        {
            duration: 1,
            height: '0vh',
            ease: 'Power4.easeInOut',
        },
        '=-.8'
    )

    tl.to(
        '.loading-words',
        {
            duration: 0.3,
            opacity: 0,
            ease: 'linear',
        },
        '=-.8'
    )

    tl.set('.loading-screen', {
        top: 'calc(-100%)',
    })

    tl.set('.loading-screen .rounded-div-wrap.bottom', {
        height: '0vh',
    })

    tl.to(
        'main .once-in',
        {
            duration: 1,
            y: '0vh',
            stagger: 0.05,
            ease: 'Expo.easeOut',
            clearProps: 'true',
        },
        '=-.8'
    )

    tl.set(
        'html',
        {
            cursor: 'auto',
        },
        '=-.8'
    )
}
