'use client';
import { useState, useEffect } from 'react';

export default function TaskChecklist() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('all-tools-tasks');
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('all-tools-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const add = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([{ id: Date.now(), text: input.trim(), completed: false }, ...tasks]);
        setInput('');
    };

    const toggle = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const remove = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="metric-card" style={{ textAlign: 'center' }}>
                <div className="metric-label">Progress</div>
                <div className="metric-value">{tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%</div>
                <div style={{ marginTop: '12px', background: 'var(--bg-secondary)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,
                        height: '100%',
                        background: 'var(--accent-primary)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {completedCount} of {tasks.length} tasks completed
                </div>
            </div>

            <form onSubmit={add} style={{ display: 'flex', gap: '1rem' }}>
                <input
                    className="input-field"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button type="submit" className="btn btn-primary" style={{ width: '120px' }}>Add Task</button>
            </form>

            <div className="result-container">
                <div className="result-header">
                    <span>Your Tasks</span>
                    <button className="btn btn-outline btn-xs" onClick={() => setTasks([])}>Clear All</button>
                </div>
                <div className="result-content" style={{ padding: 0 }}>
                    {tasks.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            🎯 No tasks yet. Start by adding one above!
                        </div>
                    ) : (
                        tasks.map(t => (
                            <div key={t.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px 20px',
                                borderBottom: '1px solid var(--border-color)',
                                opacity: t.completed ? 0.6 : 1,
                                background: t.completed ? 'rgba(0,0,0,0.05)' : 'transparent'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => toggle(t.id)}
                                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                                />
                                <span style={{
                                    flex: 1,
                                    fontSize: '1.1rem',
                                    textDecoration: t.completed ? 'line-through' : 'none',
                                    color: t.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                                }}>
                                    {t.text}
                                </span>
                                <button className="btn btn-xs btn-outline" style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }} onClick={() => remove(t.id)}>✕</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
