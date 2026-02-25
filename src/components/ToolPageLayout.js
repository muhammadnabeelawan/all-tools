import Link from 'next/link';

export default function ToolPageLayout({ title, description, children }) {
    return (
        <div className="tool-page">
            <div className="tool-page-header">
                <Link href="/" className="tool-page-back">← Back to All Tools</Link>
                <h1 className="tool-page-title">{title}</h1>
                <p className="tool-page-desc">{description}</p>
            </div>
            <div className="tool-container animate-fade-in-up">
                {children}
            </div>
        </div>
    );
}
