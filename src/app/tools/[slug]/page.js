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
        title: `${tool.name} - AllTools`,
        description: tool.desc,
    };
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    const tool = tools.find(t => t.id === slug);
    if (!tool) notFound();
    return <ToolRenderer tool={tool} />;
}
