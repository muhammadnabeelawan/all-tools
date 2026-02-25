'use client';
import { useState, useRef } from 'react';

export default function ImageConverter() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [format, setFormat] = useState('image/png');
    const inputRef = useRef();
    const formats = [
        { value: 'image/png', label: 'PNG', ext: 'png' },
        { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
        { value: 'image/webp', label: 'WebP', ext: 'webp' },
        { value: 'image/bmp', label: 'BMP', ext: 'bmp' },
    ];

    const handleFile = (file) => {
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const convert = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const ext = formats.find(f => f.value === format)?.ext || 'png';
            canvas.toBlob(blob => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `converted.${ext}`;
                a.click();
            }, format, 0.95);
        };
        img.src = URL.createObjectURL(image);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">🖼️</div>
                <div className="drop-zone-text">Drop image or click to browse</div>
                <div className="drop-zone-hint">JPG, PNG, WebP, BMP supported</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            {preview && (
                <>
                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <img src={preview} alt="Preview" className="image-preview" />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Type: {image.type}</p>
                    </div>
                    <div className="input-group">
                        <label>Convert To</label>
                        <select className="input-field" value={format} onChange={e => setFormat(e.target.value)}>
                            {formats.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={convert}>🔄 Convert & Download</button>
                </>
            )}
        </>
    );
}
