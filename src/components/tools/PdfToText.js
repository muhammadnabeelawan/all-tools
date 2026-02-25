'use client';
import { useState, useRef } from 'react';
import CopyButton from '@/components/CopyButton';

export default function PdfToText() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const inputRef = useRef();

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (f && f.type === 'application/pdf') {
            setFile(f);
            setText('');
        }
    };

    const extract = async () => {
        if (!file) return;
        setLoading(true);
        try {
            // Dynamic import to avoid SSR errors
            const pdfjs = await import('pdfjs-dist');

            // Stable worker URL for version 5+
            const version = '5.4.624';
            pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            let fullText = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += `--- Page ${i} ---\n${pageText}\n\n`;
            }
            setText(fullText);
        } catch (err) {
            console.error(err);
            // Try fallback if worker fails
            alert('Error extracting text from PDF. This usually happens due to PDF worker loading issues. Please try again or refresh the page.');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">📝</div>
                <div className="drop-zone-text">Select PDF file to extract text</div>
                <input ref={inputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            {file && (
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📄 {file.name}</span>
                        <button className="btn btn-primary btn-sm" onClick={extract} disabled={loading}>
                            {loading ? 'Extracting...' : '⚡ Extract Text'}
                        </button>
                    </div>

                    {text && (
                        <div className="result-container" style={{ marginTop: 24 }}>
                            <div className="result-header">
                                <span className="result-title">Extracted Text</span>
                                <CopyButton text={text} />
                            </div>
                            <div className="result-content" style={{ maxHeight: 600, fontSize: '0.9rem', textAlign: 'left' }}>{text}</div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
