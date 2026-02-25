'use client';
import { useState, useRef } from 'react';

export default function ImageResizer() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [maintainRatio, setMaintainRatio] = useState(true);
    const [origDims, setOrigDims] = useState({ w: 0, h: 0 });
    const inputRef = useRef();

    const handleFile = (file) => {
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
        const img = new Image();
        img.onload = () => { setOrigDims({ w: img.width, h: img.height }); setWidth(img.width); setHeight(img.height); };
        img.src = URL.createObjectURL(file);
    };

    const updateWidth = (w) => {
        setWidth(w);
        if (maintainRatio && origDims.w) setHeight(Math.round((w / origDims.w) * origDims.h));
    };
    const updateHeight = (h) => {
        setHeight(h);
        if (maintainRatio && origDims.h) setWidth(Math.round((h / origDims.h) * origDims.w));
    };

    const resize = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(blob => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `resized-${width}x${height}-${image.name}`;
                a.click();
            });
        };
        img.src = URL.createObjectURL(image);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">📐</div>
                <div className="drop-zone-text">Drop image or click to browse</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            {preview && (
                <>
                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <img src={preview} alt="Preview" className="image-preview" />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Original: {origDims.w} × {origDims.h}</p>
                    </div>
                    <div className="grid-2">
                        <div className="input-group"><label>Width (px)</label><input className="input-field" type="number" value={width} onChange={e => updateWidth(Number(e.target.value))} /></div>
                        <div className="input-group"><label>Height (px)</label><input className="input-field" type="number" value={height} onChange={e => updateHeight(Number(e.target.value))} /></div>
                    </div>
                    <div className="checkbox-group" style={{ marginBottom: 16 }}>
                        <label className="checkbox-label"><input type="checkbox" checked={maintainRatio} onChange={e => setMaintainRatio(e.target.checked)} /><span>Maintain Aspect Ratio</span></label>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={resize}>⬇️ Resize & Download</button>
                </>
            )}
        </>
    );
}
