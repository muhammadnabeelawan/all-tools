'use client';
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function FindReplace() {
    const [text, setText] = useState('');
    const [find, setFind] = useState('');
    const [replace, setReplace] = useState('');
    const [useRegex, setUseRegex] = useState(false);
    const [caseSensitive, setCaseSensitive] = useState(false);

    const doReplace = () => {
        if (!find) return text;
        try {
            if (useRegex) {
                const flags = caseSensitive ? 'g' : 'gi';
                return text.replace(new RegExp(find, flags), replace);
            }
            if (caseSensitive) return text.split(find).join(replace);
            const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            return text.replace(regex, replace);
        } catch { return text; }
    };
    const [result, setResult] = useState('');
    return (
        <>
            <div className="input-group">
                <label>Text</label>
                <textarea className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter your text..." rows={6} />
            </div>
            <div className="grid-2">
                <div className="input-group">
                    <label>Find</label>
                    <input className="input-field" value={find} onChange={e => setFind(e.target.value)} placeholder="Search for..." />
                </div>
                <div className="input-group">
                    <label>Replace with</label>
                    <input className="input-field" value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replace with..." />
                </div>
            </div>
            <div className="checkbox-group" style={{ marginBottom: 16 }}>
                <label className="checkbox-label"><input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} /><span>Use Regex</span></label>
                <label className="checkbox-label"><input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} /><span>Case Sensitive</span></label>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setResult(doReplace())}>Replace All</button>
            {result && (
                <div className="result-container" style={{ marginTop: 16 }}>
                    <div className="result-header"><span className="result-title">Result</span><CopyButton text={result} /></div>
                    <div className="result-content">{result}</div>
                </div>
            )}
        </>
    );
}
