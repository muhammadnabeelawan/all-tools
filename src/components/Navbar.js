'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { searchTools } from '@/lib/tools-data';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSearch = (val) => {
        setQuery(val);
        if (val.trim().length > 1) {
            setResults(searchTools(val).slice(0, 6));
            setShowResults(true);
        } else {
            setResults([]);
            setShowResults(false);
        }
    };

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="navbar-inner">
                <Link href="/" className="navbar-logo">
                    <span className="navbar-logo-icon">⚡</span>
                    AllTools
                </Link>
                <ul className="navbar-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/#tools">Tools</Link></li>
                    <li><Link href="/#categories">Categories</Link></li>
                </ul>
                <div className="navbar-search">
                    <span className="navbar-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search 50+ tools..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => query.trim().length > 1 && setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    />
                    {showResults && results.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '8px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            zIndex: 1001,
                            boxShadow: 'var(--shadow-card)'
                        }}>
                            {results.map(tool => (
                                <div
                                    key={tool.id}
                                    onClick={() => {
                                        router.push(`/tools/${tool.id}`);
                                        setShowResults(false);
                                        setQuery('');
                                    }}
                                    style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        borderBottom: '1px solid var(--border-color)',
                                        transition: 'var(--transition)',
                                        fontSize: '0.85rem',
                                    }}
                                    onMouseEnter={e => e.target.style.background = 'var(--bg-glass)'}
                                    onMouseLeave={e => e.target.style.background = 'transparent'}
                                >
                                    <span>{tool.icon}</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="mobile-menu-btn" aria-label="Menu">☰</button>
            </div>
        </nav>
    );
}
