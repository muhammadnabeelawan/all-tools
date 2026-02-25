import { tools } from '@/lib/tools-data';
import { notFound } from 'next/navigation';
import ToolRenderer from '@/components/tools/ToolRenderer';

export function generateStaticParams() {
    return tools.map(t => ({ slug: t.id }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tool = tools.find(t => t.id === slug);
    if (!tool) return {};
    return {
        title: `${tool.name} - Free Online Tool | All Tools`,
        description: `Use our free online ${tool.name}. ${tool.desc}. Secure, fast, and easy to use on All Tools.`,
        alternates: {
            canonical: `/tools/${slug}`,
        },
    };
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    const tool = tools.find(t => t.id === slug);
    if (!tool) notFound();
    return <ToolRenderer tool={tool} />;
}
