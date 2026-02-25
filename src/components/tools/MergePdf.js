'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function MergePdf() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
        setFiles([...files, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const merge = async () => {
        if (files.length < 2) return;
        setLoading(true);
        try {
            const mergedPdf = await PDFDocument.create();
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged.pdf';
            a.click();
        } catch (err) {
            console.error(err);
            alert('Error merging PDFs');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">📎</div>
                <div className="drop-zone-text">Select PDF files to merge</div>
                <input ref={inputRef} type="file" accept="application/pdf" multiple style={{ display: 'none' }} onChange={handleFiles} />
            </div>

            {files.length > 0 && (
                <div style={{ marginTop: 24 }}>
                    <div className="result-header">
                        <span className="result-title">Files to Merge ({files.length})</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0' }}>
                        {files.map((file, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                background: 'var(--bg-secondary)',
                                marginBottom: 8,
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem'
                            }}>
                                <span>📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                <button
                                    onClick={() => removeFile(i)}
                                    style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer' }}
                                >✕</button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-primary btn-block"
                        onClick={merge}
                        disabled={loading || files.length < 2}
                    >
                        {loading ? 'Merging...' : '⚡ Merge PDFs'}
                    </button>
                </div>
            )}
        </>
    );
}
