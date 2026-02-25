'use client';
import { useState, useEffect } from 'react';

export default function TextToSpeech() {
    const [text, setText] = useState('Hello! This is a voice test from All-Tools.');
    const [voice, setVoice] = useState(null);
    const [voices, setVoices] = useState([]);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            setVoices(availableVoices);
            setVoice(availableVoices[0]?.name);
        };

        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }, []);

    const speak = () => {
        const synth = window.speechSynthesis;
        if (speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voices.find(v => v.name === voice);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.pitch = pitch;
        utterance.rate = rate;

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);

        synth.speak(utterance);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
                <label>Input Text</label>
                <textarea
                    className="input-field"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows={6}
                    placeholder="Type something to hear it read out loud..."
                />
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Select Voice</label>
                    <select className="input-field" value={voice} onChange={e => setVoice(e.target.value)}>
                        {voices.map(v => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <button className="btn btn-primary btn-block" onClick={speak}>🔊 {speaking ? 'Restart' : 'Listen'}</button>
                    {speaking && <button className="btn btn-outline btn-block" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }} onClick={stop}>⏹ Stop</button>}
                </div>
            </div>

            <div className="grid-2">
                <div className="input-group">
                    <label>Pitch: {pitch}</label>
                    <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={e => setPitch(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                </div>
                <div className="input-group">
                    <label>Speed: {rate}</label>
                    <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
                </div>
            </div>
        </div>
    );
}
