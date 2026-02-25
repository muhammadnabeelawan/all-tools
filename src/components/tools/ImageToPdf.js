'use client';
import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

export default function ImageToPdf() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
        setImages([...images, ...newFiles]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const generate = async () => {
        if (images.length === 0) return;
        setLoading(true);
        try {
            const pdf = new jsPDF();
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const dataUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });

                // Get image dimensions to fit on page
                const img = new Image();
                img.src = dataUrl;
                await new Promise(r => img.onload = r);

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const ratio = Math.min(pdfWidth / img.width, pdfHeight / img.height);
                const w = img.width * ratio;
                const h = img.height * ratio;

                if (i > 0) pdf.addPage();
                pdf.addImage(dataUrl, 'JPEG', (pdfWidth - w) / 2, (pdfHeight - h) / 2, w, h);
            }
            pdf.save('images.pdf');
        } catch (err) {
            console.error(err);
            alert('Error generating PDF');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">🖼️</div>
                <div className="drop-zone-text">Select images to convert to PDF</div>
                <div className="drop-zone-hint">Supports JPG, PNG, WebP</div>
                <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />
            </div>

            {images.length > 0 && (
                <div style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Images ({images.length})</span>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: 12,
                        margin: '16px 0'
                    }}>
                        {images.map((img, i) => (
                            <div key={i} style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                                <img src={URL.createObjectURL(img)} alt="" style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                                <button
                                    onClick={() => removeImage(i)}
                                    style={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        padding: '2px 6px',
                                        borderRadius: '50%',
                                        background: 'rgba(0,0,0,0.5)',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                >✕</button>
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn btn-primary btn-block"
                        onClick={generate}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : '⚡ Generate PDF'}
                    </button>
                </div>
            )}
        </>
    );
}
