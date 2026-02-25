import Link from 'next/link';

export default function ToolCard({ tool }) {
    return (
        <Link href={`/tools/${tool.id}`} className="tool-card">
            <div className="tool-card-icon" style={{ background: `${tool.color}18`, color: tool.color }}>
                {tool.icon}
            </div>
            <div className="tool-card-title">{tool.name}</div>
            <div className="tool-card-desc">{tool.desc}</div>
            {tool.tag && <span className="tool-card-tag">{tool.tag}</span>}
        </Link>
    );
}
