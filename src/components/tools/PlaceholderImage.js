'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function PlaceholderImage() {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(200);
    const [bg, setBg] = useState('8b5cf6');
    const [text, setText] = useState('AllTools');
    const [textColor, setTextColor] = useState('ffffff');

    const url = `https://placehold.co/${width}x${height}/${bg}/${textColor}?text=${encodeURIComponent(text)}`;

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{
                    background: 'var(--bg-secondary)',
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '100%'
                }}>
                    <img src={url} alt="Placeholder" style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-sm)' }} />
                </div>

                <button className="btn btn-success" onClick={() => window.open(url, '_blank')}>⬇️ Open & Download</button>
            </div>

            <div className="grid-2" style={{ marginTop: 32 }}>
                <div className="input-group">
                    <label>Width (px)</label>
                    <input className="input-field" type="number" value={width} onChange={e => setWidth(parseInt(e.target.value) || 128)} min="10" />
                </div>
                <div className="input-group">
                    <label>Height (px)</label>
                    <input className="input-field" type="number" value={height} onChange={e => setHeight(parseInt(e.target.value) || 128)} min="10" />
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 16 }}>
                <div className="input-group">
                    <label>Background Color (Hex, no #)</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input className="input-field" type="color" value={`#${bg}`} onChange={e => setBg(e.target.value.replace('#', ''))} style={{ width: 60, height: 42, padding: 4 }} />
                        <input className="input-field" value={bg} onChange={e => setBg(e.target.value.replace('#', ''))} placeholder="e.g. 8b5cf6" />
                    </div>
                </div>
                <div className="input-group">
                    <label>Text Color (Hex, no #)</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input className="input-field" type="color" value={`#${textColor}`} onChange={e => setTextColor(e.target.value.replace('#', ''))} style={{ width: 60, height: 42, padding: 4 }} />
                        <input className="input-field" value={textColor} onChange={e => setTextColor(e.target.value.replace('#', ''))} placeholder="e.g. ffffff" />
                    </div>
                </div>
            </div>

            <div className="input-group">
                <label>Placeholder Text</label>
                <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="e.g. Placeholder" />
            </div>

            <div className="result-container" style={{ marginTop: 24 }}>
                <div className="result-header">
                    <span className="result-title">Image URL</span>
                    <CopyButton text={url} />
                </div>
                <div className="result-content" style={{ fontSize: '0.85rem' }}>{url}</div>
            </div>
        </>
    );
}
