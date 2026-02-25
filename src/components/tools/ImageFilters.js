'use client';
import { useState, useRef, useEffect } from 'react';

export default function ImageFilters() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [filters, setFilters] = useState({ grayscale: 0, sepia: 0, blur: 0, brightness: 100, contrast: 100, saturate: 100, hueRotate: 0 });
    const inputRef = useRef();
    const canvasRef = useRef();

    const handleFile = (file) => { setImage(file); setPreview(URL.createObjectURL(file)); };
    const filterStr = `grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) hue-rotate(${filters.hueRotate}deg)`;

    const download = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width; canvas.height = img.height;
            ctx.filter = filterStr;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(blob => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'filtered.png'; a.click(); });
        };
        img.src = URL.createObjectURL(image);
    };

    const SliderControl = ({ label, prop, min, max, step, unit }) => (
        <div className="input-group">
            <label>{label}: {filters[prop]}{unit || ''}</label>
            <input type="range" className="range-slider" min={min} max={max} step={step || 1} value={filters[prop]} onChange={e => setFilters({ ...filters, [prop]: Number(e.target.value) })} />
        </div>
    );

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">🎭</div>
                <div className="drop-zone-text">Drop image or click to browse</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            {preview && (
                <>
                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <img src={preview} alt="Preview" className="image-preview" style={{ filter: filterStr, maxHeight: 300 }} />
                    </div>
                    <SliderControl label="Grayscale" prop="grayscale" min={0} max={100} unit="%" />
                    <SliderControl label="Sepia" prop="sepia" min={0} max={100} unit="%" />
                    <SliderControl label="Blur" prop="blur" min={0} max={20} unit="px" />
                    <SliderControl label="Brightness" prop="brightness" min={0} max={200} unit="%" />
                    <SliderControl label="Contrast" prop="contrast" min={0} max={200} unit="%" />
                    <SliderControl label="Saturate" prop="saturate" min={0} max={200} unit="%" />
                    <SliderControl label="Hue Rotate" prop="hueRotate" min={0} max={360} unit="°" />
                    <div className="btn-group" style={{ marginTop: 16 }}>
                        <button className="btn btn-secondary" onClick={() => setFilters({ grayscale: 0, sepia: 0, blur: 0, brightness: 100, contrast: 100, saturate: 100, hueRotate: 0 })}>🔄 Reset</button>
                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={download}>⬇️ Download</button>
                    </div>
                </>
            )}
        </>
    );
}
