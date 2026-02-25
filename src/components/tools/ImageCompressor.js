'use client';
import { useState, useRef } from 'react';

export default function ImageCompressor() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [quality, setQuality] = useState(0.7);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
    };

    const compress = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = URL.createObjectURL(image);
            await new Promise(r => img.onload = r);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', quality));
            const url = URL.createObjectURL(blob);
            setResult({
                url,
                originalSize: image.size,
                compressedSize: blob.size,
                saved: ((1 - blob.size / image.size) * 100).toFixed(1),
                blob,
            });
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const download = () => {
        if (!result) return;
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `compressed-${image.name}`;
        a.click();
    };

    const fmtSize = (b) => b > 1048576 ? (b / 1048576).toFixed(2) + ' MB' : (b / 1024).toFixed(1) + ' KB';

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}>
                <div className="drop-zone-icon">📦</div>
                <div className="drop-zone-text">Drop an image here or click to browse</div>
                <div className="drop-zone-hint">Supports JPEG, PNG, WebP</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>

            {preview && (
                <>
                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <img src={preview} alt="Preview" className="image-preview" />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 8 }}>Original: {fmtSize(image.size)}</p>
                    </div>
                    <div className="input-group">
                        <label>Quality: {Math.round(quality * 100)}%</label>
                        <input type="range" className="range-slider" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(Number(e.target.value))} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={compress} disabled={loading}>
                        {loading ? <><span className="spinner" /> Compressing...</> : '⚡ Compress Image'}
                    </button>
                </>
            )}

            {result && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="grid-3" style={{ marginBottom: 16 }}>
                        <div className="metric-card"><div className="metric-value">{fmtSize(result.originalSize)}</div><div className="metric-label">Original</div></div>
                        <div className="metric-card"><div className="metric-value">{fmtSize(result.compressedSize)}</div><div className="metric-label">Compressed</div></div>
                        <div className="metric-card"><div className="metric-value" style={{ color: 'var(--accent-green)' }}>{result.saved}%</div><div className="metric-label">Saved</div></div>
                    </div>
                    <button className="btn btn-success btn-block" onClick={download}>⬇️ Download Compressed Image</button>
                </div>
            )}
        </>
    );
}
