'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function CssTriangle() {
    const [direction, setDirection] = useState('up');
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [color, setColor] = useState('#8b5cf6');

    const getStyle = () => {
        const style = {
            width: 0,
            height: 0,
            borderStyle: 'solid',
        };

        switch (direction) {
            case 'up':
                style.borderWidth = `0 ${width / 2}px ${height}px ${width / 2}px`;
                style.borderColor = `transparent transparent ${color} transparent`;
                break;
            case 'down':
                style.borderWidth = `${height}px ${width / 2}px 0 ${width / 2}px`;
                style.borderColor = `${color} transparent transparent transparent`;
                break;
            case 'left':
                style.borderWidth = `${height / 2}px ${width}px ${height / 2}px 0`;
                style.borderColor = `transparent ${color} transparent transparent`;
                break;
            case 'right':
                style.borderWidth = `${height / 2}px 0 ${height / 2}px ${width}px`;
                style.borderColor = `transparent transparent transparent ${color}`;
                break;
        }
        return style;
    };

    const style = getStyle();
    const cssCode = `.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${style.borderWidth};
  border-color: ${style.borderColor};
}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-color)'
            }}>
                <div style={style} />
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Direction</label>
                    <div className="grid-2" style={{ gap: '8px' }}>
                        {['up', 'down', 'left', 'right'].map(d => (
                            <button
                                key={d}
                                className={`btn btn-sm ${direction === d ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setDirection(d)}
                            >
                                {d.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="input-group">
                    <label>Color</label>
                    <input className="input-field" type="color" value={color} onChange={e => setColor(e.target.value)} style={{ height: '42px', padding: '4px' }} />
                </div>
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Width: {width}px</label>
                    <input type="range" min="10" max="300" value={width} onChange={e => setWidth(e.target.value)} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                </div>
                <div className="input-group">
                    <label>Height: {height}px</label>
                    <input type="range" min="10" max="300" value={height} onChange={e => setHeight(e.target.value)} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                </div>
            </div>

            <div className="result-container">
                <div className="result-header">
                    <span>CSS Code</span>
                    <CopyButton text={cssCode} />
                </div>
                <pre className="result-content" style={{ fontSize: '0.85rem' }}>{cssCode}</pre>
            </div>
        </div>
    );
}
