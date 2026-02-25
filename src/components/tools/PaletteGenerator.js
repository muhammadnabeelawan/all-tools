'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function PaletteGenerator() {
    const [baseColor, setBaseColor] = useState('#8b5cf6');

    const generateSchema = (hex, hDelta = 0, sDelta = 0, lDelta = 0) => {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) h = s = 0; else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        h = (h * 360 + hDelta) % 360;
        s = Math.max(0, Math.min(100, (s * 100 + sDelta)));
        l = Math.max(0, Math.min(100, (l * 100 + lDelta)));
        return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    };

    const palettes = [
        { name: 'Analogous', values: [generateSchema(baseColor, -30), baseColor, generateSchema(baseColor, 30)] },
        { name: 'Monochromatic', values: [generateSchema(baseColor, 0, 0, 20), baseColor, generateSchema(baseColor, 0, 0, -20)] },
        { name: 'Complementary', values: [baseColor, generateSchema(baseColor, 180)] },
        { name: 'Split Complementary', values: [baseColor, generateSchema(baseColor, 150), generateSchema(baseColor, 210)] }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Base Color</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} style={{ width: '60px', height: '60px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
                    <input className="input-field" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} style={{ textTransform: 'uppercase' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {palettes.map((p, i) => (
                    <div key={i} className="metric-card" style={{ padding: '1.5rem', background: 'var(--bg-card)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{p.name}</h3>
                        <div style={{ display: 'flex', gap: '0.5rem', height: '60px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                            {p.values.map((v, j) => (
                                <div key={j} style={{ flex: 1, background: v, position: 'relative' }}>
                                    <CopyButton text={v} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
