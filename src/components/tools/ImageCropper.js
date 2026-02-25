'use client';
import { useState, useRef, useEffect } from 'react';

export default function ImageCropper() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
    const inputRef = useRef();
    const canvasRef = useRef();

    const handleFile = (file) => {
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const doCrop = () => {
        const canvas = document.createElement('canvas');
        canvas.width = crop.w;
        canvas.height = crop.h;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
            canvas.toBlob(blob => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'cropped-image.png';
                a.click();
            });
        };
        img.src = URL.createObjectURL(image);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">✂️</div>
                <div className="drop-zone-text">Drop image or click to browse</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            {preview && (
                <>
                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <img src={preview} alt="Preview" className="image-preview" />
                    </div>
                    <div className="grid-2">
                        <div className="input-group"><label>X Offset</label><input className="input-field" type="number" value={crop.x} onChange={e => setCrop({ ...crop, x: Number(e.target.value) })} /></div>
                        <div className="input-group"><label>Y Offset</label><input className="input-field" type="number" value={crop.y} onChange={e => setCrop({ ...crop, y: Number(e.target.value) })} /></div>
                        <div className="input-group"><label>Width</label><input className="input-field" type="number" value={crop.w} onChange={e => setCrop({ ...crop, w: Number(e.target.value) })} /></div>
                        <div className="input-group"><label>Height</label><input className="input-field" type="number" value={crop.h} onChange={e => setCrop({ ...crop, h: Number(e.target.value) })} /></div>
                    </div>
                    <button className="btn btn-primary btn-block" onClick={doCrop}>✂️ Crop & Download</button>
                </>
            )}
        </>
    );
}
