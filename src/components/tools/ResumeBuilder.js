'use client';
import { useState, useEffect, useRef } from 'react';

const resumeTemplates = {
    standard: { id: 'standard', name: 'Standard ATS', description: 'Clean, professional, single-column.', theme: '#000' },
    modern: { id: 'modern', name: 'Modern Split', description: 'Sidebar for contact & skills.', theme: '#2563eb' },
    minimal: { id: 'minimal', name: 'Minimalist', description: 'Centered and airy design.', theme: '#333' },
    serif: { id: 'serif', name: 'Executive Serif', description: 'Classic corporate style.', theme: '#1e293b' },
    blueprint: { id: 'blueprint', name: 'Creative Tech', description: 'Bold and technical.', theme: '#0ea5e9' },
    indigo: { id: 'indigo', name: 'Indigo Professional', description: 'Soft and trustworthy.', theme: '#4f46e5' },
    emerald: { id: 'emerald', name: 'Emerald High-End', description: 'Luxurious green accents.', theme: '#059669' },
    slate: { id: 'slate', name: 'Slate Gray', description: 'Understated and sleek.', theme: '#475569' },
    bold: { id: 'bold', name: 'Bold Signature', description: 'Large header, strong links.', theme: '#dc2626' },
    compact: { id: 'compact', name: 'Single Page Pro', description: 'Tighter spacing for long text.', theme: '#111827' },
    academic: { id: 'academic', name: 'Academic CV', description: 'Traditional academic format.', theme: '#000' }
};

const initialData = {
    personal: {
        fullName: 'Johnathan Doe',
        email: 'john.doe@techverse.com',
        phone: '+1 (555) 001-2026',
        location: 'San Francisco, CA',
        website: 'johndoe.dev',
        linkedin: 'linkedin.com/in/johndoe'
    },
    summary: 'Strategic Senior Software Engineer with over 8 years of experience in architecting high-performance web applications. Proven track record in leading teams, optimizing CI/CD pipelines, and delivering scalable microservices. Passionate about clean code, mentoring, and staying at the cutting edge of cloud technology.',
    experience: [
        {
            company: 'Global Tech Solutions',
            role: 'Lead Full Stack Engineer',
            location: 'Remote',
            dates: 'Jan 2021 — Present',
            description: '• Architected a real-time data dashboard using Next.js and WebSockets, increasing user engagement by 45%.\n• Reduced server response times by 30% through implementing a multi-layer caching strategy.\n• Mentored a team of 10+ junior developers and established internal coding standards.'
        },
        {
            company: 'Innovation Labs',
            role: 'Senior Developer',
            location: 'Austin, TX',
            dates: 'June 2018 — Dec 2020',
            description: '• Developed and maintained 15+ client websites using React and Node.js.\n• Optimized SQL queries reducing database load by 50%.\n• Collaborated with UX/UI designers to ensure accessibility compliance (WCAG 2.1).'
        }
    ],
    education: [
        {
            school: 'Stanford University',
            degree: 'Master of Science in Computer Science',
            location: 'Stanford, CA',
            dates: '2016 — 2018'
        }
    ],
    skills: 'React, Next.js, Node.js, TypeScript, Python, PostgreSQL, AWS (S3, Lambda, EC2), Docker, Kubernetes, GraphQL, Jest, Git, Agile Development',
    projects: [
        {
            name: 'CloudSync Open Source',
            description: 'A distributed file synchronization tool with 2k+ GitHub stars.',
            link: 'github.com/johndoe/cloudsync'
        }
    ]
};

export default function ResumeBuilder() {
    const [data, setData] = useState(initialData);
    const [template, setTemplate] = useState('standard');
    const [printMode, setPrintMode] = useState(false);
    const printRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('resume_builder_data');
        const savedTemplate = localStorage.getItem('resume_builder_template');
        if (saved) {
            try { setData(JSON.parse(saved)); } catch (e) { console.error(e); }
        }
        if (savedTemplate) setTemplate(savedTemplate);
    }, []);

    useEffect(() => {
        localStorage.setItem('resume_builder_data', JSON.stringify(data));
        localStorage.setItem('resume_builder_template', template);
    }, [data, template]);

    const handlePrint = () => {
        // Set a global class on body to assist with printing isolation
        document.body.classList.add('printing-resume');
        window.print();
        setTimeout(() => {
            document.body.classList.remove('printing-resume');
        }, 500);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                // Basic validation to ensure we have the required structure
                if (imported && imported.personal && imported.personal.fullName) {
                    setData(imported);
                } else {
                    alert("Invalid Resume format. Please use a previously exported JSON.");
                }
            } catch (err) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    };

    const handleExport = () => {
        const fileName = (data.personal.fullName || 'Resume').replace(/\s+/g, '_');
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Resume_${fileName}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderResumeContent = () => {
        const t = resumeTemplates[template];
        return (
            <>
                {template === 'modern' ? (
                    <>
                        <div className="modern-sidebar">
                            <h1 className="res-name">{data.personal.fullName || 'John Doe'}</h1>
                            <div className="res-contact">
                                {data.personal.email && <span>✉ {data.personal.email}</span>}
                                {data.personal.phone && <span>📞 {data.personal.phone}</span>}
                                {data.personal.location && <span>📍 {data.personal.location}</span>}
                                {data.personal.linkedin && <span>🔗 {data.personal.linkedin}</span>}
                            </div>
                            <div className="res-sec">
                                <h2 className="res-sec-title">Expertise</h2>
                                <div className="res-desc" style={{ color: '#cbd5e1' }}>{data.skills || 'Your skills go here...'}</div>
                            </div>
                        </div>
                        <div className="modern-main">
                            <div className="res-sec">
                                <h2 className="res-sec-title">Professional Summary</h2>
                                <p className="res-desc">{data.summary || 'A brief professional summary...'}</p>
                            </div>
                            <div className="res-sec">
                                <h2 className="res-sec-title">Work Experience</h2>
                                {data.experience.length > 0 ? data.experience.map((exp, i) => (
                                    <div key={i} className="res-item">
                                        <div className="res-item-head"><span>{exp.role || 'Role'}</span><span>{exp.dates || 'Dates'}</span></div>
                                        <div className="res-item-sub"><span>{exp.company || 'Company'}</span><span>{exp.location}</span></div>
                                        <div className="res-desc">{exp.description}</div>
                                    </div>
                                )) : <p className="res-desc">No experience added yet.</p>}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="res-header">
                            <h1 className="res-name">{data.personal.fullName || 'John Doe'}</h1>
                            <div className="res-contact">
                                {data.personal.email && <span>{data.personal.email}</span>}
                                {data.personal.phone && <span>{data.personal.phone}</span>}
                                {data.personal.location && <span>{data.personal.location}</span>}
                                {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                            </div>
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Summary</h2>
                            <p className="res-desc">{data.summary || 'Executive summary...'}</p>
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Experience</h2>
                            {data.experience.length > 0 ? data.experience.map((exp, i) => (
                                <div key={i} className="res-item">
                                    <div className="res-item-head"><span>{exp.role || 'Role'}</span><span>{exp.dates || 'Dates'}</span></div>
                                    <div className="res-item-sub"><span>{exp.company || 'Company'} ({exp.location || 'Location'})</span></div>
                                    <div className="res-desc">{exp.description}</div>
                                </div>
                            )) : <p className="res-desc">No experience added yet.</p>}
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Education</h2>
                            {data.education.map((edu, i) => (
                                <div key={i} className="res-item">
                                    <div className="res-item-head"><span>{edu.degree || 'Degree'}</span><span>{edu.dates || 'Dates'}</span></div>
                                    <div className="res-item-sub"><span>{edu.school || 'School'}</span></div>
                                </div>
                            ))}
                        </div>
                        <div className="res-sec">
                            <h2 className="res-sec-title">Skills</h2>
                            <p className="res-desc">{data.skills || 'Your skills...'}</p>
                        </div>
                    </>
                )}
            </>
        );
    };

    return (
        <div className="rb-wrapper">
            <style jsx>{`
                .rb-wrapper {
                    width: 100%;
                }
                .rb-container {
                    display: grid;
                    grid-template-columns: 450px 1fr;
                    gap: 0;
                    height: calc(100vh - 120px);
                    background: #0f172a;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .rb-editor {
                    background: #1e293b;
                    border-right: 1px solid rgba(255,255,255,0.1);
                    padding: 30px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .rb-preview {
                    background: #0f172a;
                    padding: 40px;
                    overflow-y: auto;
                    display: flex;
                    justify-content: center;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,0.2) transparent;
                }
                .rb-panel {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    padding: 16px;
                }
                .rb-title {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .input-field {
                    background: #0f172a;
                    border: 1px solid #334155;
                    border-radius: 8px;
                    color: white;
                    padding: 10px 14px;
                    width: 100%;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    margin-bottom: 10px;
                }
                .input-field:focus {
                    border-color: #3b82f6;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                }
                .temp-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                    margin-bottom: 20px;
                }
                .temp-card {
                    padding: 8px;
                    background: #0f172a;
                    border: 1px solid #334155;
                    border-radius: 6px;
                    color: #94a3b8;
                    font-size: 0.75rem;
                    cursor: pointer;
                    text-align: center;
                    transition: 0.2s;
                }
                .temp-card:hover { border-color: #4b5563; }
                .temp-card.active { background: #3b82f6; color: white; border-color: transparent; }

                .action-bar {
                    position: sticky;
                    bottom: 0;
                    background: #1e293b;
                    padding: 16px 0;
                    margin-top: auto;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .resume-sheet {
                    background: white;
                    width: 210mm;
                    min-height: 297mm;
                    padding: 30mm 20mm;
                    line-height: 1.5;
                    font-family: 'Inter', sans-serif;
                    font-size: 10pt;
                    box-sizing: border-box;
                    margin: 0 auto;
                    text-align: left;
                    color: #1a1a1a;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }

                /* Template Theming */
                .res-name { font-size: 24pt; font-weight: 800; text-transform: uppercase; margin-bottom: 5px; color: ${resumeTemplates[template].theme}; }
                .res-contact { display: flex; flex-wrap: wrap; gap: 15px; font-size: 9pt; color: #444; margin-bottom: 25px; border-bottom: 1.5px solid ${resumeTemplates[template].theme}; padding-bottom: 15px; }
                .res-sec { margin-bottom: 22px; }
                .res-sec-title { font-size: 12pt; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; color: ${resumeTemplates[template].theme}; border-bottom: 1px solid #ccc; padding-bottom: 3px; }
                .res-item { margin-bottom: 15px; }
                .res-item-head { display: flex; justify-content: space-between; font-weight: 700; font-size: 11pt; }
                .res-item-sub { display: flex; justify-content: space-between; font-style: italic; color: #555; font-size: 10pt; margin-bottom: 4px; }
                .res-desc { white-space: pre-line; text-align: justify; font-size: 10pt; }

                /* Modern Template */
                .modern { display: grid; grid-template-columns: 220px 1fr; padding: 0 !important; }
                .modern-sidebar { background: #1e293b; color: white; padding: 30mm 15mm; }
                .modern-main { padding: 30mm 15mm; }
                .modern .res-name { color: white; font-size: 18pt; border-bottom: 1px solid rgba(255,255,255,0.2); }
                .modern .res-contact { flex-direction: column; border: none; color: #cbd5e1; }
                .modern .res-sec-title { color: #38bdf8; border-bottom: 1.5px solid #38bdf8; }
                .modern-sidebar .res-sec-title { color: white; }

                /* Minimal Template */
                .minimal { text-align: center; }
                .minimal .res-contact { justify-content: center; border: none; }
                .minimal .res-sec-title { border-bottom: none; }
                .minimal .res-sec-title::after { content: ''; display: block; width: 40px; height: 1.5px; background: #444; margin: 6px auto; }
                
                /* Serif/Executive Template */
                .serif { font-family: 'Merriweather', 'Georgia', serif; }

                /* Blueprint/Creative Template */
                .blueprint { background: #f8fafc; }
                .blueprint .res-name { color: #0ea5e9; }

                /* Bold Signature Template */
                .bold .res-header { text-align: center; margin-top: -10mm; margin-bottom: 30px; }
                .bold .res-name { background: ${resumeTemplates[template].theme}; color: white; padding: 20px; display: block; }
                
                /* Dark Mode (Preview only mostly) */
                .dark { background: #111827; color: #f9fafb; border: 1px solid #374151; }
                .dark .res-contact, .dark .res-item-sub { color: #9ca3af; }

                @media print {
                    .rb-container { position: absolute !important; top: 0; left: 0; width: 100%; height: auto !important; display: block !important; border: none; background: white !important; }
                    .rb-editor { display: none !important; }
                    .rb-preview { padding: 0 !important; background: white !important; overflow: visible !important; display: block !important; height: auto !important; }
                    .resume-sheet { box-shadow: none !important; margin: 0 !important; border: none !important; width: 210mm; padding: 20mm 15mm !important; }
                    .rb-preview > div { transform: none !important; width: 100% !important; }
                }
                @media (max-width: 1000px) {
                    .rb-container { grid-template-columns: 1fr; height: auto; }
                    .rb-editor { height: 600px; }
                }
            `}</style>

            <div className="rb-container">
                <div className="rb-editor scroll-custom">
                    <div className="rb-panel">
                        <div className="rb-title">Choose Template</div>
                        <div className="temp-grid">
                            {Object.values(resumeTemplates).map(t => (
                                <div key={t.id} className={`temp-card ${template === t.id ? 'active' : ''}`} onClick={() => setTemplate(t.id)}>
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rb-panel">
                        <div className="rb-title">Personal Details</div>
                        <input className="input-field" placeholder="Full Name" value={data.personal.fullName} onChange={e => setData({ ...data, personal: { ...data.personal, fullName: e.target.value } })} />
                        <input className="input-field" placeholder="Email" value={data.personal.email} onChange={e => setData({ ...data, personal: { ...data.personal, email: e.target.value } })} />
                        <input className="input-field" placeholder="Phone" value={data.personal.phone} onChange={e => setData({ ...data, personal: { ...data.personal, phone: e.target.value } })} />
                        <input className="input-field" placeholder="Location" value={data.personal.location} onChange={e => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} />
                        <input className="input-field" placeholder="LinkedIn" value={data.personal.linkedin} onChange={e => setData({ ...data, personal: { ...data.personal, linkedin: e.target.value } })} />
                    </div>

                    <div className="rb-panel">
                        <div className="rb-title">Profile Summary</div>
                        <textarea className="input-field" rows="4" value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} style={{ resize: 'none' }} />
                    </div>

                    <div className="rb-panel">
                        <div className="rb-title">
                            Experience
                            <button className="btn btn-xs btn-outline" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={() => setData({ ...data, experience: [...data.experience, { company: '', role: '', location: '', dates: '', description: '' }] })}>+ Add</button>
                        </div>
                        {data.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                                <input className="input-field" placeholder="Company" value={exp.company} onChange={e => { const ex = [...data.experience]; ex[i].company = e.target.value; setData({ ...data, experience: ex }) }} />
                                <input className="input-field" placeholder="Role" value={exp.role} onChange={e => { const ex = [...data.experience]; ex[i].role = e.target.value; setData({ ...data, experience: ex }) }} />
                                <input className="input-field" placeholder="Dates" value={exp.dates} onChange={e => { const ex = [...data.experience]; ex[i].dates = e.target.value; setData({ ...data, experience: ex }) }} />
                                <textarea className="input-field" rows="3" placeholder="Bullets" value={exp.description} onChange={e => { const ex = [...data.experience]; ex[i].description = e.target.value; setData({ ...data, experience: ex }) }} />
                                <button className="btn btn-xs" style={{ color: '#ef4444', fontSize: '10px' }} onClick={() => { const ex = [...data.experience]; ex.splice(i, 1); setData({ ...data, experience: ex }) }}>Remove</button>
                            </div>
                        ))}
                    </div>

                    <div className="rb-panel">
                        <div className="rb-title">Skills & Knowledge</div>
                        <textarea className="input-field" rows="3" value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} />
                    </div>

                    <div className="action-bar">
                        <button className="btn btn-primary btn-block" onClick={handlePrint}>
                            ⚡ Download ATS PDF
                        </button>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, fontSize: '12px' }} onClick={handleExport}>📤 Save JSON</button>
                            <label className="btn btn-secondary" style={{ flex: 1, cursor: 'pointer', fontSize: '12px' }}>
                                📥 Load JSON
                                <input type="file" hidden accept=".json" onChange={handleImport} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="rb-preview scroll-custom">
                    <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', width: '210mm' }}>
                        <div className={`resume-sheet ${template}`}>
                            {renderResumeContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
