export const site = {
    name: 'Inky',
    description: '',
    locale: 'zh-TW',
    author: 'Inky',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}`,
    logo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
    email: 'address@yoursite.com',
    youtube: 'https://youtube.com',
    threads: 'https://www.threads.net',
    instagram: 'https://www.instagram.com',
    analytics: {
        googleAnalytics: {
            googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID
        },
    },
    newsletter: {
        provider: 'convertkit',
    },
}
