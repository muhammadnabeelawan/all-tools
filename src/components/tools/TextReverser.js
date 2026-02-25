'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function TextReverser() {
    const [text, setText] = useState('');
    const [mode, setMode] = useState('chars');
    const getReversed = () => {
        if (mode === 'chars') return text.split('').reverse().join('');
        return text.split(' ').reverse().join(' ');
    };
    const result = text ? getReversed() : '';
    return (
        <>
            <div className="input-group">
                <label>Enter text</label>
                <textarea className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Type text here..." rows={4} />
            </div>
            <div className="toggle-group" style={{ marginBottom: 16 }}>
                <button className={`toggle-option${mode === 'chars' ? ' active' : ''}`} onClick={() => setMode('chars')}>Reverse Characters</button>
                <button className={`toggle-option${mode === 'words' ? ' active' : ''}`} onClick={() => setMode('words')}>Reverse Words</button>
            </div>
            {result && (
                <div className="result-container">
                    <div className="result-header"><span className="result-title">Reversed Text</span><CopyButton text={result} /></div>
                    <div className="result-content">{result}</div>
                </div>
            )}
        </>
    );
}
