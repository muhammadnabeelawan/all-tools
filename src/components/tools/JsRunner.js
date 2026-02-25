'use client';
import { useState } from 'react';

export default function JsRunner() {
    const [code, setCode] = useState('const name = "World";\nconsole.log("Hello, " + name + "!");\n\nconst numbers = [1, 2, 3, 4, 5];\nconsole.log("Sum:", numbers.reduce((a, b) => a + b, 0));');
    const [logs, setLogs] = useState([]);

    const runCode = () => {
        const output = [];
        const originalLog = console.log;

        // Override console.log for this execution
        console.log = (...args) => {
            output.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
        };

        try {
            // Create a function from the string and execute it
            new Function(code)();
            setLogs(output.length ? output : ['[Code executed successfully with no output]']);
        } catch (err) {
            setLogs([`❌ Error: ${err.message}`]);
        } finally {
            // Restore console.log
            console.log = originalLog;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>JavaScript Code</label>
                <textarea
                    className="input-field"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    rows={10}
                    style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                />
                <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} onClick={runCode}>⚡ Run Code</button>
            </div>

            <div className="result-container">
                <div className="result-header">
                    <span>Execution Output (Console)</span>
                    <button className="btn btn-outline btn-xs" onClick={() => setLogs([])}>Clear</button>
                </div>
                <div className="result-content" style={{
                    background: '#000',
                    color: '#10b981',
                    fontFamily: 'monospace',
                    minHeight: '150px',
                    maxHeight: '400px',
                    padding: '16px'
                }}>
                    {logs.length > 0 ? logs.map((log, i) => (
                        <div key={i} style={{ marginBottom: '4px', whiteSpace: 'pre-wrap' }}>{`> ${log}`}</div>
                    )) : <span style={{ color: 'var(--text-muted)' }}>Output will appear here...</span>}
                </div>
            </div>
        </div>
    );
}
