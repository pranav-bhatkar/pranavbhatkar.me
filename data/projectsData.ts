const projectsData: {
    title: string
    tags: {
        name: string
        color?: string
        link?: string
    }[]
    description: string
    imgSrc: string
    href: string
}[] = [
    {
        title: 'Office Management System',
        tags: [
            {
                name: 'Full Stack Development',
            },
            {
                name: 'Background Processing',
            },
            {
                name: 'Next.js',
                link: 'https://nextjs.org/',
            },
            {
                name: 'Nest.js',
                link: 'https://nestjs.com/',
            },
            {
                name: 'React',
                link: 'https://reactjs.org/',
            },
            {
                name: 'TypeScript',
                link: 'https://www.typescriptlang.org/',
            },
            {
                name: 'Redis',
                link: 'https://redis.io/',
            },
            {
                name: 'JavaScript',
                link: 'https://www.javascript.com/',
            },
            {
                name: 'Material UI',
                link: 'https://mui.com/',
            },
            {
                name: 'PostgreSQL',
                link: 'https://www.postgresql.org/',
            },
        ],
        description:
            'The Office Management System streamlines attendance tracking and leave management for your team. This web application is designed to enhance office operations by providing a user-friendly platform for members to mark attendance and manage leaves efficiently.',
        imgSrc: '/static/images/twitter-card.png',
        href: 'https://pps-manager.web.app/',
    },
    {
        title: 'Krag E-commerce Website',
        tags: [
            {
                name: 'Full Stack Development',
            },
            {
                name: 'Next.js',
                link: 'https://nextjs.org/',
            },
            {
                name: 'E-commerce',
            },
            {
                name: 'React',
                link: 'https://reactjs.org/',
            },
            {
                name: 'TypeScript',
                link: 'https://www.typescriptlang.org/',
            },
            {
                name: 'Tailwind CSS',
                link: 'https://tailwindcss.com/',
            },
            {
                name: 'PostgreSQL',
                link: 'https://www.postgresql.org/',
            },
            {
                name: 'Google Cloud',
                link: 'https://cloud.google.com/',
            },
            {
                name: 'Google Cloud Storage',
                link: 'https://cloud.google.com/storage',
            },
        ],
        description:
            'Introducing Krag, a custom e-commerce website specializing in industry-level SMPS and chargers. This platform is designed to provide a seamless shopping experience for customers seeking high-quality power solutions. Explore the Krag website for a range of reliable products.',
        imgSrc: '/static/images/project/krag-store-image.png',
        href: 'https://krag.in',
    },
    {
        title: 'GP Book: Student Management App',
        tags: [
            {
                name: 'Mobile Development',
            },
            {
                name: 'React Native',
                link: 'https://reactnative.dev/',
            },
            {
                name: 'Firebase',
                link: 'https://firebase.google.com/',
            },
            {
                name: 'Android',
                link: 'https://www.android.com/',
            },
            {
                name: 'EXPO',
                link: 'https://expo.dev/',
            },
            {
                name: 'TypeScript',
                link: 'https://www.typescriptlang.org/',
            },
        ],
        description:
            'Welcome to GP Book, a student management app designed for Government Polytechnic Murtizapur students. Although not actively used, this app showcases my skills in developing practical solutions for educational environments. Features include leave applications, notice board, and profile management.',
        imgSrc: '/static/images/project/gp-book-image.png',
        href: 'https://play.google.com/store/apps/details?id=com.gpbook.app',
    },
]

export default projectsData
