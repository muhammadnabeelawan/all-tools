'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function GradientGenerator() {
    const [color1, setColor1] = useState('#8b5cf6');
    const [color2, setColor2] = useState('#ec4899');
    const [angle, setAngle] = useState(135);
    const [type, setType] = useState('linear');

    const gradient = type === 'linear'
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;

    const cssCode = `background: ${color1};
background: -webkit-${gradient};
background: ${gradient};`;

    return (
        <>
            <div style={{
                width: '100%',
                height: 200,
                background: gradient,
                borderRadius: 'var(--radius-md)',
                marginBottom: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
                Preview
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Gradient Type</label>
                    <div className="grid-2">
                        <button className={`btn ${type === 'linear' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('linear')}>Linear</button>
                        <button className={`btn ${type === 'radial' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setType('radial')}>Radial</button>
                    </div>
                </div>
                {type === 'linear' && (
                    <div className="input-group">
                        <label>Angle: {angle}°</label>
                        <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(e.target.value)} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                    </div>
                )}
            </div>

            <div className="grid-2" style={{ marginTop: 16 }}>
                <div className="input-group">
                    <label>Color 1</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input className="input-field" type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: 60, height: 42, padding: 4 }} />
                        <input className="input-field" value={color1} onChange={e => setColor1(e.target.value)} />
                    </div>
                </div>
                <div className="input-group">
                    <label>Color 2</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input className="input-field" type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ width: 60, height: 42, padding: 4 }} />
                        <input className="input-field" value={color2} onChange={e => setColor2(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="result-container" style={{ marginTop: 24 }}>
                <div className="result-header">
                    <span className="result-title">CSS Code</span>
                    <CopyButton text={cssCode} />
                </div>
                <div className="result-content" style={{ fontSize: '0.85rem' }}>{cssCode}</div>
            </div>
        </>
    );
}
