export const slideUp = {
    initial: {
        opacity: 0,
        y: '100%',
    },
    open: (i) => ({
        opacity: 1,
        y: '0%',
        transition: { duration: 0.5, delay: 0.7 },
    }),
    closed: {
        opacity: 0,
        y: '100%',
        transition: { duration: 0.5 },
    },
}

export const slideRight = {
    initial: {
        opacity: 0,
        x: '-100%',
    },
    open: {
        opacity: 1,
        x: '0%',
        transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1], },
    },
    closed: {
        opacity: 0,
        x: '-100%',
        transition: { duration: 0.5 },
    },
}
