import { tools } from '@/lib/tools-data';

export default function sitemap() {
    const baseUrl = 'https://all-tools-poth.vercel.app';

    const toolPages = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...toolPages,
    ];
}
