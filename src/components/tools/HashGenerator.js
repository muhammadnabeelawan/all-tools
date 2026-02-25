'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function HashGenerator() {
    const [text, setText] = useState('');
    const [results, setResults] = useState({ md5: '', sha1: '', sha256: '', sha512: '' });

    const generate = async () => {
        if (!text) return;

        const encode = async (algo) => {
            const msgUint8 = new TextEncoder().encode(text);
            const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        };

        try {
            setResults({
                sha1: await encode('SHA-1'),
                sha256: await encode('SHA-256'),
                sha512: await encode('SHA-512'),
                md5: 'Use a library for MD5 or skip' // Crypto API doesn't support MD5 by default for security
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="input-group">
                <label>Input Text</label>
                <textarea
                    className="input-field"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter text to hash..."
                    rows={4}
                />
            </div>
            <button className="btn btn-primary btn-block" onClick={generate}>⚡ Generate Hashes</button>

            {results.sha256 && (
                <div style={{ marginTop: 24 }}>
                    {['sha1', 'sha256', 'sha512'].map(algo => (
                        <div key={algo} className="result-container" style={{ marginBottom: 16 }}>
                            <div className="result-header">
                                <span className="result-title">{algo.toUpperCase()}</span>
                                <CopyButton text={results[algo]} />
                            </div>
                            <div className="result-content" style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
                                {results[algo]}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
