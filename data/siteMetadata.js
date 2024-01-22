/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
    title: 'pranavbhatkar.me',
    author: 'Pranav Bhatkar',
    headerTitle: 'pranavbhatkar.me',
    description: 'Freelance frontend web development and cybersecurity shenanigans',
    language: 'en-us',
    theme: 'system', // system, dark or light
    siteUrl: 'https://www.pranavbhatkar.me',
    siteRepo: 'https://github.com/pranav-bhatkar/pranavbhatkar.me',
    siteLogo: '/static/images/logo.png',
    socialBanner: '/static/images/twitter-card.png',
    email: 'mail@pranavbhatkar.me',
    github: 'https://github.com/pranav-bhatkar',
    twitter: 'https://twitter.com/pranavbhatkar_',
    facebook: 'https://www.facebook.com/profile.php?id=100091675700292',
    youtube: 'https://www.youtube.com/@pranavbhatkar',
    linkedin: 'www.linkedin.com/in/pranavbhatkar',
    instagram: 'https://instagram.com/pranavbhatkar_',
    locale: 'en-US',
    analytics: {
        googleAnalytics: {
            googleAnalyticsId: 'G-4ESCDKFVVJ', // e.g. G-XXXXXXX
        },
    },
    // newsletter: {
    //     // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    //     // Please add your .env file and modify it according to your selection
    //     provider: 'buttondown',
    // },
    comments: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // Select a provider and use the environment variables associated to it
        // https://vercel.com/docs/environment-variables
        provider: 'giscus', // supported providers: giscus, utterances, disqus
        giscusConfig: {
            // Visit the link below, and follow the steps in the 'configuration' section
            // https://giscus.app/
            repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
            repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
            category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
            categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
            mapping: 'pathname', // supported options: pathname, url, title
            reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
            // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
            metadata: '0',
            // theme example: light, dark, dark_dimmed, dark_high_contrast
            // transparent_dark, preferred_color_scheme, custom
            theme: 'dark',
            // theme when dark mode
            darkTheme: 'transparent_dark',
            // If the theme option above is set to 'custom`
            // please provide a link below to your custom theme css file.
            // example: https://giscus.app/themes/custom_example.css
            themeURL: '',
            // This corresponds to the `data-lang="en"` in giscus's configurations
            lang: 'en',
        },
    },
    search: {
        provider: 'kbar', // kbar or algolia
        kbarConfig: {
            searchDocumentsPath: 'search.json', // path to load documents to search
        },
    },
}

module.exports = siteMetadata;
