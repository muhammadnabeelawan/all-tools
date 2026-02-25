import Link from 'next/link';
import { categories } from '@/lib/tools-data';

export default function Footer() {
    const popularTools = [
        { name: 'Image Compressor', slug: 'image-compressor' },
        { name: 'JSON Formatter', slug: 'json-formatter' },
        { name: 'QR Generator', slug: 'qr-generator' },
        { name: 'Password Generator', slug: 'password-generator' },
        { name: 'Unit Converter', slug: 'unit-converter' },
        { name: 'Age Calculator', slug: 'age-calculator' },
    ];
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div>
                    <div className="footer-brand">⚡ All Tools</div>
                    <p className="footer-desc">
                        Professional, safe, and free online utilities. 77+ tools for developers, designers, and office productivity.
                        No data ever leaves your device.
                    </p>
                </div>
                <div>
                    <div className="footer-heading">Popular Tools</div>
                    {popularTools.map(t => (
                        <Link key={t.slug} href={`/tools/${t.slug}`} className="footer-link">{t.name}</Link>
                    ))}
                </div>
                <div>
                    <div className="footer-heading">Categories</div>
                    {categories.filter(c => c.id !== 'all').slice(0, 6).map(c => (
                        <Link key={c.id} href={`/?cat=${c.id}`} className="footer-link">{c.icon} {c.name}</Link>
                    ))}
                </div>
                <div>
                    <div className="footer-heading">About</div>
                    <Link href="/" className="footer-link">Home</Link>
                    <Link href="/#tools" className="footer-link">All Tools</Link>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} AllTools. All rights reserved.</span>
                <span>Built with Next.js • Free & Open Source</span>
            </div>
        </footer>
    );
}
