export const site = {
    name: 'Inky',
    description: '',
    locale: 'zh-TW',
    author: 'Tails Azimuth',
    url: `${process.env.NEXT_SITE_URL || 'https://yourdomain.com'}`,
    logo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
    socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
    email: 'address@yoursite.com',
    github: 'https://github.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://www.linkedin.com',
    threads: 'https://www.threads.net',
    instagram: 'https://www.instagram.com',
    analytics: {
        googleAnalytics: {
            googleAnalyticsId: process.env.NEXT_GOOGLE_ANALYTICS_ID,
        },
    },
    newsletter: {
        provider: 'convertkit',
    },
}
