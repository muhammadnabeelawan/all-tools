'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function ColorPicker() {
    const [color, setColor] = useState('#8b5cf6');

    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToHsl = (hex) => {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', borderRadius: '1rem', background: color, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'background 0.3s ease' }}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ width: '100px', height: '100px', border: 'none', background: 'transparent', cursor: 'pointer', opacity: 0 }}
                />
                <div style={{
                    position: 'absolute',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                }}>
                    {color.toUpperCase()}
                </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem' }}>
                <div className="result-container">
                    <div className="result-header">
                        <span>HEX</span>
                        <CopyButton text={color} />
                    </div>
                    <div className="result-content">{color.toUpperCase()}</div>
                </div>
                <div className="result-container">
                    <div className="result-header">
                        <span>RGB</span>
                        <CopyButton text={hexToRgb(color)} />
                    </div>
                    <div className="result-content">{hexToRgb(color)}</div>
                </div>
                <div className="result-container">
                    <div className="result-header">
                        <span>HSL</span>
                        <CopyButton text={hexToHsl(color)} />
                    </div>
                    <div className="result-content">{hexToHsl(color)}</div>
                </div>
            </div>
        </div>
    );
}
