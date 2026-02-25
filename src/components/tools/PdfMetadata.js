'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfMetadata() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [metadata, setMetadata] = useState({ title: '', author: '', creator: '', producer: '', keywords: '' });
    const inputRef = useRef();

    const handleFile = async (e) => {
        const f = e.target.files[0];
        if (f && f.type === 'application/pdf') {
            setFile(f);
            setLoading(true);
            try {
                const arrayBuffer = await f.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                setMetadata({
                    title: pdf.getTitle() || '',
                    author: pdf.getAuthor() || '',
                    creator: pdf.getCreator() || '',
                    producer: pdf.getProducer() || '',
                    keywords: pdf.getKeywords() || '',
                });
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        }
    };

    const update = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            pdf.setTitle(metadata.title);
            pdf.setAuthor(metadata.author);
            pdf.setCreator(metadata.creator);
            pdf.setProducer(metadata.producer);
            pdf.setKeywords(metadata.keywords.split(',').map(k => k.trim()));

            const pdfBytes = await pdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `updated-${file.name}`;
            a.click();
        } catch (err) {
            console.error(err);
            alert('Error updating PDF metadata');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="drop-zone" onClick={() => inputRef.current.click()}>
                <div className="drop-zone-icon">ℹ️</div>
                <div className="drop-zone-text">Select PDF to view/edit metadata</div>
                <input ref={inputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleFile} />
            </div>

            {file && (
                <div style={{ marginTop: 24 }}>
                    <div className="grid-2">
                        <div className="input-group">
                            <label>Title</label>
                            <input className="input-field" value={metadata.title} onChange={e => setMetadata({ ...metadata, title: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label>Author</label>
                            <input className="input-field" value={metadata.author} onChange={e => setMetadata({ ...metadata, author: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label>Creator</label>
                            <input className="input-field" value={metadata.creator} onChange={e => setMetadata({ ...metadata, creator: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label>Producer</label>
                            <input className="input-field" value={metadata.producer} onChange={e => setMetadata({ ...metadata, producer: e.target.value })} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Keywords (comma separated)</label>
                        <input className="input-field" value={metadata.keywords} onChange={e => setMetadata({ ...metadata, keywords: e.target.value })} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={update} disabled={loading}>
                        {loading ? 'Processing...' : '⚡ Save & Download Updated PDF'}
                    </button>
                </div>
            )}
        </>
    );
}
