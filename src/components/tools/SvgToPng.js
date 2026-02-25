'use client';
import { useState, useRef } from 'react';

export default function SvgToPng() {
    const [svgText, setSvgText] = useState('');
    const [scale, setScale] = useState(2);
    const inputRef = useRef();

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => setSvgText(reader.result);
        reader.readAsText(file);
    };

    const convert = () => {
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(b => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(b);
                a.download = 'converted.png';
                a.click();
            });
        };
        img.src = url;
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">🎯</div>
                <div className="drop-zone-text">Drop SVG file or click to browse</div>
                <input ref={inputRef} type="file" accept=".svg" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            <div className="input-group" style={{ marginTop: 16 }}>
                <label>Or paste SVG code</label>
                <textarea className="input-field" value={svgText} onChange={e => setSvgText(e.target.value)} placeholder="<svg>...</svg>" rows={6} />
            </div>
            <div className="input-group">
                <label>Scale: {scale}x</label>
                <input type="range" className="range-slider" min="1" max="4" step="0.5" value={scale} onChange={e => setScale(Number(e.target.value))} />
            </div>
            <button className="btn btn-primary btn-block" onClick={convert} disabled={!svgText.trim()}>🔄 Convert to PNG</button>
        </>
    );
}
