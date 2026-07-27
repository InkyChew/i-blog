export const site = {
    name: '勇氣實驗室',
    description: '我是誰？我不知道。但我想透過紀錄來認識自己。',
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
