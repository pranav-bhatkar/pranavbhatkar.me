import { Icons } from '@/components/icons'
import { Book, HomeIcon } from 'lucide-react'

export const DATA = {
    name: 'Pranav Bhatkar',
    initials: 'PB',
    url: 'https://www.pranavbhatkar.me',
    location: 'Amravati, Maharashtra, India',
    locationLink: 'https://www.google.com/maps/place/Amravati,+Maharashtra',
    description:
        'Full Stack Developer, builder, and tech entrepreneur. I build scalable products, AI-powered systems, and real-world tools that solve meaningful problems.',
    summary:
        'Full Stack Developer with strong experience in building production-grade web and mobile applications using Next.js, NestJS, React Native, and modern cloud tooling. I’ve worked on SaaS platforms, AI-powered products, internal tools, and automation systems. Passionate about building fast, scalable, and user-focused products while continuously learning and shipping.',
    avatarUrl: '/me.png',

    skills: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'NestJS',
        'React Native',
        'PostgreSQL',
        'Prisma',
        'Redis',
        'Docker',
        'AWS',
        'GCP',
        'TailwindCSS',
        'ShadCN UI',
        'Python',
        'REST APIs',
        'System Design',
    ],

    navbar: [
        { href: '/', icon: HomeIcon, label: 'Home' },
        { href: '/projects', icon: Book, label: 'Projects' },
    ],

    contact: {
        email: 'work@pranavbhatkar.me',
        tel: '+91-9960935244',
        social: {
            GitHub: {
                name: 'GitHub',
                url: 'https://github.com/pranavbhatkar',
                icon: Icons.github,
                navbar: true,
            },
            LinkedIn: {
                name: 'LinkedIn',
                url: 'https://linkedin.com/in/pranavbhatkar',
                icon: Icons.linkedin,
                navbar: true,
            },
            X: {
                name: 'X',
                url: 'https://x.com/pranavbhatkar',
                icon: Icons.x,
                navbar: true,
            },
            Email: {
                name: 'Email',
                url: 'mailto:work@pranavbhatkar.me',
                icon: Icons.email,
                navbar: false,
            },
        },
    },

    work: [
        {
            company: 'Inagiffy',
            href: 'https://inagiffy.news',
            location: 'Remote',
            badges: [],
            logoUrl: '/static/work/inagiffy.png',
            title: 'Full Stack Developer',
            start: 'June 2025',
            end: 'present',
            description:
                'I work at Inagiffy as a Full-Stack Developer, building and scaling AI-driven products and internal systems.',
        },
        {
            company: 'Axentia',
            href: 'https://axentia.ai',
            location: 'Remote - Internship',
            badges: [],
            logoUrl: '/static/work/axentia.png',
            title: 'Full Stack Developer',
            start: 'March 2024',
            end: 'Dec 2024',
            description:
                'Working on AI-driven products including chat-based tools, automation platforms, and internal dashboards using Next.js, NestJS, PostgreSQL, and OpenAI APIs.',
        },
        {
            company: 'PPS Energy Solutions',
            href: 'https://ppsenergysolutions.com',
            location: 'Amravati, Maharashtra',
            logoUrl: '/static/work/pps.png',
            badges: [],
            title: 'Software Developer',
            start: '2022',
            end: 'June 2025',
            description:
                'Built internal systems including attendance, asset management, and reporting dashboards. Developed a Windows-based attendance system and scalable backend services.',
        },
    ],

    education: [
        {
            school: 'Shri Shivaji Science College, Amravati',
            href: 'https://shivajiscamt.org/',
            logoUrl: '/static/edu/clogo.jpg',
            degree: 'Bachelor of Computer Applications (BCA)',
            start: '2024',
            end: '2027',
        },
    ],

    projects: [
        {
            title: 'MyNameGreeting',
            href: 'https://mynamegreeting.com',
            dates: '2024 - Present',
            active: true,
            description:
                'AI-powered greeting card generator using WhatsApp automation, image generation, and personalized templates.',
            technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'WhatsApp Cloud API', 'OpenAI'],
        },
        {
            title: 'College Genie',
            href: 'https://collegegenie.org',
            dates: '2024',
            active: true,
            description:
                'AI-powered college guidance platform helping students with career paths, exams, and admissions.',
            technologies: ['Next.js', 'Tailwind', 'OpenAI', 'PostgreSQL'],
        },
        {
            title: 'Bharat GPX',
            href: 'https://www.gpx.co.in',
            dates: '2024',
            active: true,
            description:
                'Green energy trading platform with real-time dashboards and scalable backend.',
            technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'AWS'],
        },
        {
            title: 'Office Management System',
            href: '#',
            dates: '2023',
            active: false,
            description:
                'Internal ERP for attendance, payroll, and document management with desktop client support.',
            technologies: ['Next.js', 'Electron', 'Node.js', 'PostgreSQL'],
        },
    ],
} as const
