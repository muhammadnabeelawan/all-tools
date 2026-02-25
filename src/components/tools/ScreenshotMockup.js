'use client';
import { useState, useRef } from 'react';

export default function ScreenshotMockup() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [device, setDevice] = useState('browser');
    const inputRef = useRef();

    const handleFile = (file) => { setImage(file); setPreview(URL.createObjectURL(file)); };

    const download = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            const pad = device === 'browser' ? 60 : 40;
            canvas.width = img.width + 80;
            canvas.height = img.height + pad + 40;
            // Background
            ctx.fillStyle = '#1a1a2e';
            ctx.beginPath();
            ctx.roundRect(0, 0, canvas.width, canvas.height, 16);
            ctx.fill();
            // Title bar
            if (device === 'browser') {
                ctx.fillStyle = '#16162a';
                ctx.fillRect(0, 0, canvas.width, 40);
                ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(24 + i * 24, 20, 6, 0, Math.PI * 2); ctx.fill(); });
            }
            ctx.drawImage(img, 40, pad, img.width, img.height);
            canvas.toBlob(blob => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'mockup.png'; a.click(); });
        };
        img.src = URL.createObjectURL(image);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">📱</div>
                <div className="drop-zone-text">Drop screenshot or click to browse</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            {preview && (
                <>
                    <div style={{ textAlign: 'center', margin: '16px 0' }}><img src={preview} alt="" className="image-preview" /></div>
                    <div className="input-group">
                        <label>Device Frame</label>
                        <select className="input-field" value={device} onChange={e => setDevice(e.target.value)}>
                            <option value="browser">Browser Window</option>
                            <option value="minimal">Minimal Frame</option>
                        </select>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={download}>⬇️ Generate Mockup</button>
                </>
            )}
        </>
    );
}
