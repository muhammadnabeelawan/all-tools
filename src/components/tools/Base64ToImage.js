'use client';
import { useState } from 'react';

export default function Base64ToImage() {
    const [base64, setBase64] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const convert = () => {
        if (!base64) return;
        // Basic validation & formatting
        let cleanBase64 = base64.trim();
        if (!cleanBase64.startsWith('data:image')) {
            // Try to guess format if it's a raw string
            cleanBase64 = `data:image/png;base64,${cleanBase64}`;
        }
        setImageSrc(cleanBase64);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Base64 String</label>
                <textarea
                    className="input-field"
                    value={base64}
                    onChange={e => setBase64(e.target.value)}
                    placeholder="Paste your Base64 string here..."
                    rows={8}
                />
                <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} onClick={convert}>🖼️ View Image</button>
            </div>

            {imageSrc && (
                <div className="result-container" style={{ textAlign: 'center' }}>
                    <div className="result-header">
                        <span>Image Preview</span>
                        <a href={imageSrc} download="converted-image.png" className="btn btn-success btn-xs">Download Image</a>
                    </div>
                    <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginTop: '12px' }}>
                        <img
                            src={imageSrc}
                            alt="Base64 Content"
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                            onError={() => alert('Invalid Base64 or Image Format')}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
