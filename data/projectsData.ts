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
    client?: {
        name: string
        website: string
    }
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
            'The Office Management System streamlines attendance tracking and leave management for your team. This web application is designed to enhance office operations by providing a user-friendly platform for members to mark attendance and manage leaves efficiently. demo credentials: email: mail@pranavbhatkar.me password: 123456',
        imgSrc: '/static/images/twitter-card.png',
        href: 'https://account.krag.in',
        client: {
            name: 'PPS Energy Solutions',
            website: 'https://ppsenergy.in/',
        },
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
        client: {
            name: 'PPS Energy Solutions',
            website: 'https://ppsenergy.in/',
        },
    },
    {
        title: 'GPX (Green Power Exchange)',
        tags: [
            {
                name: 'Full Stack Development',
            },
            {
                name: 'Next.js',
                link: 'https://nextjs.org/',
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
                name: 'Shadcn/UI',
                link: 'https://ui.shadcn.com/',
            },
            {
                name: 'Nest.js',
                link: 'https://nodejs.org/en/',
            },
            {
                name: 'Passport.js',
                link: 'http://www.passportjs.org/',
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
                name: 'AWS',
                link: 'https://aws.amazon.com/',
            },
            {
                name: 'RabbitMQ',
                link: 'https://www.rabbitmq.com/',
            },
        ],
        description:
            'Bharat GPX is an innovative platform designed to facilitate the buying and selling of green solar energy between generators and consumers. The project aims to create a seamless and efficient marketplace that supports the growth of sustainable energy solutions in India. It leverages cutting-edge web technologies to provide a robust, user-friendly interface and reliable backend support.',

        imgSrc: '/static/images/project/gpx-image.png',
        href: 'https://www.gpx.co.in/',
        client: {
            name: 'PPS Energy Solutions',
            website: 'https://ppsenergy.in/',
        },
    },
    {
        title: 'CardSift: AI-Powered Credit Card Comparison',
        tags: [
            { name: 'Next.js', color: '#0070f3', link: 'https://nextjs.org/' },
            { name: 'Tailwind CSS', color: '#38b2ac', link: 'https://tailwindcss.com/' },
            { name: 'Playwright', color: '#457b9d', link: 'https://playwright.dev/' },
            { name: 'Gemini API', color: '#4285f4', link: 'https://ai.google.dev/' },
            { name: 'PostgreSQL', color: '#336791', link: 'https://www.postgresql.org/' },
            { name: 'Framer Motion', color: '#00aaff', link: 'https://www.framer.com/motion/' },
            { name: 'Vercel', color: '#000000', link: 'https://vercel.com/' },
            { name: 'AI', color: '#ff9800' },
            { name: 'Web Scraping', color: '#9c27b0' },
        ],
        description:
            'CardSift is a web application that helps users find the best credit cards using AI-powered insights. It features dynamic web scraping, AI-driven data structuring, a comprehensive comparison interface, and user authentication.',
        imgSrc: '/cardsift-screenshot.png', // Replace with your actual image URL
        href: 'https://cardsift.pranavbhatkar.me', // Replace with your actual deployed URL
        client: {
            name: 'Inagiffy', //Add more info to inagiffy if you built it for there
            website: 'https://inagiffy.com/',
        },
    },

    {
        title: 'College Genie',
        tags: [
            { name: 'GenAI', color: 'indigo' },
            { name: 'Next.js' },
            { name: 'Nest.js' },
            { name: 'Telegram Bot' },
            { name: 'WhatsApp Bot' },
        ],
        description:
            'AI-powered personal college and career counselor with Telegram and WhatsApp bots. Built the full UI/UX and integrated OpenAI APIs for conversation flows.',
        imgSrc: '/static/images/projects/college-genie.png',
        href: 'https://collegegenie.org',
        client: {
            name: 'Axentia',
            website: 'https://www.axentia.in',
        },
    },
    {
        title: 'ShikshaGenie (formerly Super Teacher AI)',
        tags: [{ name: 'SaaS' }, { name: 'Next.js' }, { name: 'OpenAI API' }, { name: 'AI Tools' }],
        description:
            'All-in-one AI toolkit for teachers and students. Includes tools for MCQs, essays, summaries, lesson plans, and more. Focused on UI/UX and backend improvements.',
        imgSrc: '/images/projects/shikshaGenie.png',
        href: 'https://www.studyyoutube.com',
        client: {
            name: 'Axentia',
            website: 'https://www.axentia.in',
        },
    },
    {
        title: 'AI Chat App',
        tags: [
            { name: 'Vercel AI SDK' },
            { name: 'Next.js' },
            { name: 'PostgreSQL + pgvector' },
            { name: 'LangChain' },
        ],
        description:
            'Custom AI chat interface with YouTube transcript querying, vector search using pgvector, and context-aware responses.',
        imgSrc: '/static/images/projects/chat.png',
        href: 'https://chat.pranavbhatkar.me/',
    },
    {
        title: 'Architect Portfolio – Shrey Mahashabde',
        tags: [
            { name: 'Portfolio' },
            { name: 'Next.js' },
            { name: 'Tailwind CSS' },
            { name: 'Figma to Code' },
        ],
        description:
            'Minimalist and clean architecture portfolio website with sections for projects, awards, and gallery. Built for architect Shrey Mahashabde.',
        imgSrc: '/static/images/projects/shrey.png',
        href: 'https://shreymahashabde.com/',
        client: {
            name: 'Shrey Mahashabde',
            website: 'https://shreymahashabde.com/',
        },
    },
]

export default projectsData
