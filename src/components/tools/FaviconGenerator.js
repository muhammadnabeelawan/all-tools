'use client';
import { useState, useRef } from 'react';

export default function FaviconGenerator() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState([]);
    const inputRef = useRef();

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (f && f.type.startsWith('image/')) {
            setFile(f);
            setPreviews([]);
        }
    };

    const generate = () => {
        if (!file) return;
        setLoading(true);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            const sizes = [16, 32, 48, 64, 128, 180, 192, 512];
            const results = sizes.map(size => {
                canvas.width = size;
                canvas.height = size;
                ctx.clearRect(0, 0, size, size);
                ctx.drawImage(img, 0, 0, size, size);
                return { size, url: canvas.toDataURL('image/png') };
            });
            setPreviews(results);
            setLoading(false);
        };

        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
    };

    const downloadAll = () => {
        previews.forEach(p => {
            const a = document.createElement('a');
            a.href = p.url;
            a.download = `favicon-${p.size}x${p.size}.png`;
            a.click();
        });
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">🖼️</div>
                <div className="drop-zone-text">Click to upload your image for favicon</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            {file && (
                <div style={{ marginTop: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span>📄 {file.name}</span>
                        <button className="btn btn-primary btn-sm" onClick={generate} disabled={loading}>
                            {loading ? 'Generating...' : '⚡ Generate Favicons'}
                        </button>
                    </div>

                    {previews.length > 0 && (
                        <div style={{ marginTop: 24 }}>
                            <div className="result-header">
                                <span className="result-title">Generated Favicons</span>
                                <button className="btn btn-success btn-sm" onClick={downloadAll}>⬇️ Download All</button>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                gap: '12px',
                                marginTop: '12px'
                            }}>
                                {previews.map((p, i) => (
                                    <div key={i} className="metric-card" style={{ padding: '12px', textAlign: 'center' }}>
                                        <img src={p.url} alt="" style={{ width: p.size > 48 ? 48 : p.size, height: p.size > 48 ? 48 : p.size, objectFit: 'contain' }} />
                                        <div style={{ fontSize: '0.75rem', marginTop: '8px' }}>{p.size}x{p.size}</div>
                                        <a href={p.url} download={`favicon-${p.size}.png`} className="copy-btn"
                                            style={{ textDecoration: 'none', display: 'block', fontSize: '0.7rem', marginTop: '4px' }}>
                                            Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
