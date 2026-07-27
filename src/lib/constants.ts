import siteData from "@/data/site.json";

export const site = {
    name: siteData.name,
    description: siteData.description,
    locale: 'zh-TW',
    author: siteData.author,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}`,
    logo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
    email: siteData.email,
    youtube: siteData.youtube,
    threads: siteData.threads,
    instagram: siteData.instagram,
    analytics: {
        googleAnalytics: {
            googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID
        },
    },
    newsletter: {
        provider: 'convertkit',
    },
}
