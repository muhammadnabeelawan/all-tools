'use client';
import { useState, useRef } from 'react';
import CopyButton from '@/components/CopyButton';

export default function ImageToBase64() {
    const [result, setResult] = useState('');
    const [preview, setPreview] = useState(null);
    const inputRef = useRef();

    const handleFile = (file) => {
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        const reader = new FileReader();
        reader.onload = () => setResult(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">💾</div>
                <div className="drop-zone-text">Drop image or click to browse</div>
                <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            </div>
            {preview && <div style={{ textAlign: 'center', margin: '16px 0' }}><img src={preview} alt="Preview" className="image-preview" /></div>}
            {result && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header"><span className="result-title">Base64 Output</span><CopyButton text={result} /></div>
                    <div className="result-content" style={{ maxHeight: 200 }}>{result}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 8 }}>Length: {result.length.toLocaleString()} characters</p>
                </div>
            )}
        </>
    );
}
