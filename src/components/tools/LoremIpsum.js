'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

export default function LoremIpsum() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState('paragraphs');
    const generate = () => {
        if (type === 'words') return Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]).join(' ');
        if (type === 'sentences') return Array.from({ length: count }, () => {
            const len = 8 + Math.floor(Math.random() * 12);
            const s = Array.from({ length: len }, () => loremWords[Math.floor(Math.random() * loremWords.length)]).join(' ');
            return s.charAt(0).toUpperCase() + s.slice(1) + '.';
        }).join(' ');
        return Array.from({ length: count }, () => {
            const sCount = 3 + Math.floor(Math.random() * 4);
            return Array.from({ length: sCount }, () => {
                const len = 8 + Math.floor(Math.random() * 10);
                const s = Array.from({ length: len }, () => loremWords[Math.floor(Math.random() * loremWords.length)]).join(' ');
                return s.charAt(0).toUpperCase() + s.slice(1) + '.';
            }).join(' ');
        }).join('\n\n');
    };
    const [result, setResult] = useState('');

    return (
        <>
            <div className="grid-2">
                <div className="input-group">
                    <label>Amount</label>
                    <input className="input-field" type="number" min="1" max="100" value={count} onChange={e => setCount(Number(e.target.value))} />
                </div>
                <div className="input-group">
                    <label>Type</label>
                    <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                    </select>
                </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setResult(generate())}>Generate Lorem Ipsum</button>
            {result && (
                <div className="result-container" style={{ marginTop: 20 }}>
                    <div className="result-header"><span className="result-title">Generated Text</span><CopyButton text={result} /></div>
                    <div className="result-content" style={{ whiteSpace: 'pre-wrap' }}>{result}</div>
                </div>
            )}
        </>
    );
}
