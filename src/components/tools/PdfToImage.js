'use client';
import { useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Configure the worker for pdfjs (this part is tricky in standard Next.js, but often works if we import it correctly)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfToImage() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const inputRef = useRef();

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (f && f.type === 'application/pdf') {
            setFile(f);
            setImages([]);
        }
    };

    const convert = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            const pages = [];
            const numPages = pdf.numPages;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;
                pages.push({ url: canvas.toDataURL('image/jpeg', 0.8), name: `page-${i}.jpg` });
            }
            setImages(pages);
        } catch (err) {
            console.error(err);
            alert('Error converting PDF to Image');
        }
        setLoading(false);
    };

    const downloadAll = () => {
        images.forEach((img, i) => {
            const a = document.createElement('a');
            a.href = img.url;
            a.download = img.name;
            a.click();
        });
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">📸</div>
                <div className="drop-zone-text">Select PDF to convert to images</div>
                <input ref={inputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            {file && (
                <div style={{ marginTop: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span>📄 {file.name}</span>
                        <button className="btn btn-primary btn-sm" onClick={convert} disabled={loading}>
                            {loading ? 'Converting...' : '⚡ Start Conversion'}
                        </button>
                    </div>

                    {images.length > 0 && (
                        <div style={{ marginTop: 24 }}>
                            <div className="result-header">
                                <span className="result-title">Converted Pages ({images.length})</span>
                                <button className="btn btn-success btn-sm" onClick={downloadAll}>⬇️ Download All</button>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                gap: 16,
                                margin: '16px 0'
                            }}>
                                {images.map((img, i) => (
                                    <div key={i} style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                                        <img src={img.url} alt="" style={{ width: '100%', objectFit: 'contain' }} />
                                        <div style={{ padding: 8, textAlign: 'center' }}>
                                            <a href={img.url} download={img.name} className="copy-btn" style={{ textDecoration: 'none' }}>Download Jpg</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
