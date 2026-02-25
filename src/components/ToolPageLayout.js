import Link from 'next/link';

export default function ToolPageLayout({ title, description, id, children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': title,
        'description': description,
        'applicationCategory': 'Utility, DeveloperApplication',
        'operatingSystem': 'Any',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
        },
        'url': `https://all-tools-poth.vercel.app/tools/${id}`
    };

    return (
        <div className="tool-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="tool-page-header">
                <Link href="/" className="tool-page-back">← Back to All Tools</Link>
                <h1 className="tool-page-title">{title}</h1>
                <p className="tool-page-desc">{description}</p>
            </div>
            <div className="tool-container animate-fade-in-up">
                {children}
            </div>

            <div className="tool-seo-content container animate-fade-in" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    <div className="seo-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>📦 100% Free & Unlimited</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            Our {title} is completely free to use with no hidden costs or subscription fees.
                            Process as many files or strings as you need without any daily limits or annoying pop-ups.
                        </p>
                    </div>
                    <div className="seo-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>🛡️ Privacy First Design</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            We care about your privacy. This {title} runs entirely in your web browser.
                            Your sensitive data is never uploaded to our servers, keeping your information secure and 100% private.
                        </p>
                    </div>
                    <div className="seo-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>🚀 Fast & Reliable</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            Built with modern web technologies, this tool provides instant results.
                            No waiting for server processing or file uploads—everything happens on your device at the speed of your processor.
                        </p>
                    </div>
                    <div className="seo-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>📱 Cross-Platform Support</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            Whether you are on Windows, macOS, Linux, or mobile, our {title} works seamlessly across all devices and browsers.
                            No installation required—just open and use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
