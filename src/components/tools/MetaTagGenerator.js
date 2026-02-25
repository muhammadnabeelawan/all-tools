'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function MetaTagGenerator() {
    const [meta, setMeta] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterCard: 'summary_large_image'
    });

    const generateCode = () => {
        let code = `<!-- Primary Meta Tags -->\n`;
        if (meta.title) code += `<title>${meta.title}</title>\n`;
        if (meta.title) code += `<meta name="title" content="${meta.title}">\n`;
        if (meta.description) code += `<meta name="description" content="${meta.description}">\n`;
        if (meta.keywords) code += `<meta name="keywords" content="${meta.keywords}">\n`;
        if (meta.author) code += `<meta name="author" content="${meta.author}">\n`;

        code += `\n<!-- Open Graph / Facebook -->\n`;
        code += `<meta property="og:type" content="website">\n`;
        if (meta.ogTitle || meta.title) code += `<meta property="og:title" content="${meta.ogTitle || meta.title}">\n`;
        if (meta.ogDescription || meta.description) code += `<meta property="og:description" content="${meta.ogDescription || meta.description}">\n`;
        if (meta.ogImage) code += `<meta property="og:image" content="${meta.ogImage}">\n`;

        code += `\n<!-- Twitter -->\n`;
        code += `<meta property="twitter:card" content="${meta.twitterCard}">\n`;
        if (meta.ogTitle || meta.title) code += `<meta property="twitter:title" content="${meta.ogTitle || meta.title}">\n`;
        if (meta.ogDescription || meta.description) code += `<meta property="twitter:description" content="${meta.ogDescription || meta.description}">\n`;
        if (meta.ogImage) code += `<meta property="twitter:image" content="${meta.ogImage}">\n`;

        return code;
    };

    const code = generateCode();

    return (
        <>
            <div className="grid-2">
                <div className="input-group">
                    <label>Site Title</label>
                    <input className="input-field" value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} placeholder="e.g. My Website" />
                </div>
                <div className="input-group">
                    <label>Author</label>
                    <input className="input-field" value={meta.author} onChange={e => setMeta({ ...meta, author: e.target.value })} placeholder="e.g. John Doe" />
                </div>
            </div>

            <div className="input-group">
                <label>Description</label>
                <textarea className="input-field" value={meta.description} onChange={e => setMeta({ ...meta, description: e.target.value })} rows={3} placeholder="Brief summary of your site..." />
            </div>

            <div className="input-group">
                <label>Keywords (comma separated)</label>
                <input className="input-field" value={meta.keywords} onChange={e => setMeta({ ...meta, keywords: e.target.value })} placeholder="e.g. tools, generator, helper" />
            </div>

            <div className="input-group" style={{ marginTop: 24 }}>
                <label style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Social Settings (Optional)</label>
                <div className="grid-2" style={{ marginTop: 12 }}>
                    <div className="input-group">
                        <label>OG Image URL</label>
                        <input className="input-field" value={meta.ogImage} onChange={e => setMeta({ ...meta, ogImage: e.target.value })} placeholder="https://site.com/preview.jpg" />
                    </div>
                    <div className="input-group">
                        <label>Twitter Card</label>
                        <select className="input-field" value={meta.twitterCard} onChange={e => setMeta({ ...meta, twitterCard: e.target.value })}>
                            <option value="summary">Summary</option>
                            <option value="summary_large_image">Summary Large Image</option>
                        </select>
                    </div>
                </div>
            </div>

            {code && (
                <div className="result-container" style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Generated Meta Tags</span>
                        <CopyButton text={code} />
                    </div>
                    <pre className="result-content" style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>{code}</pre>
                </div>
            )}
        </>
    );
}
