'use client';
import { useState, useEffect, useRef } from 'react';

const resumeTemplates = {
    standard: { id: 'standard', name: 'Classic ATS', theme: '#000000' },
    modern: { id: 'modern', name: 'Modern Sidebar', theme: '#2c3e50' },
    minimal: { id: 'minimal', name: 'Minimalist', theme: '#333333' },
    executive: { id: 'executive', name: 'Executive Serif', theme: '#1a1a1a', font: 'serif' },
    tech: { id: 'tech', name: 'Tech / Dev', theme: '#3498db', font: 'monospace' },
    creative: { id: 'creative', name: 'Bold Creative', theme: '#e74c3c' },
    elegant: { id: 'elegant', name: 'Elegant Pro', theme: '#27ae60' },
    compact: { id: 'compact', name: 'Compact CV', theme: '#444444' },
    startup: { id: 'startup', name: 'Startup Vibe', theme: '#f39c12' },
    professional: { id: 'professional', name: 'Pro Indigo', theme: '#4f46e5' },
    dark: { id: 'dark', name: 'Dark Theme', theme: '#ffffff', bg: '#1f2937' }
};

const initialData = {
    personal: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        location: 'New York, NY',
        website: 'www.johndoe.com',
        linkedin: 'linkedin.com/in/johndoe'
    },
    summary: 'Professional and dedicated software engineer with 5+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture.',
    experience: [
        {
            company: 'Tech Solutions Inc.',
            role: 'Senior Software Engineer',
            location: 'San Francisco, CA',
            dates: '2021 - Present',
            description: 'Led a team of 5 developers to rebuild the core API... \nImplemented microservices architecture... \nReduced latency by 40%...'
        },
        {
            company: 'Web Wizards',
            role: 'Full Stack Developer',
            location: 'Austin, TX',
            dates: '2018 - 2021',
            description: 'Developed and maintained 15+ client websites... \nCollaborated with designers to improve UI/UX...'
        }
    ],
    education: [
        {
            school: 'University of Technology',
            degree: 'B.S. in Computer Science',
            location: 'Boston, MA',
            dates: '2014 - 2018'
        }
    ],
    skills: 'JavaScript (ES6+), React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, Docker, Git, Agile',
    projects: [
        {
            name: 'CloudScale',
            description: 'A serverless deployment platform built with React and AWS Lambda.',
            link: 'github.com/johndoe/cloudscale'
        }
    ]
};

export default function ResumeBuilder() {
    const [data, setData] = useState(initialData);
    const [template, setTemplate] = useState('standard');
    const resumeRef = useRef();

    useEffect(() => {
        const saved = localStorage.getItem('all-tools-resume-data');
        const savedTemplate = localStorage.getItem('all-tools-resume-template');
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load resume data", e);
            }
        }
        if (savedTemplate) setTemplate(savedTemplate);
    }, []);

    useEffect(() => {
        localStorage.setItem('all-tools-resume-data', JSON.stringify(data));
        localStorage.setItem('all-tools-resume-template', template);
    }, [data, template]);

    const handleArrayChange = (section, index, field, value) => {
        const newData = { ...data };
        newData[section][index][field] = value;
        setData(newData);
    };

    const addArrayItem = (section, defaultItem) => {
        const newData = { ...data };
        newData[section] = [...newData[section], defaultItem];
        setData(newData);
    };

    const removeArrayItem = (section, index) => {
        const newData = { ...data };
        newData[section].splice(index, 1);
        setData(newData);
    };

    const handlePrint = () => {
        // We use the browser's native print functionality which is the most reliable for A4 CSS layouts
        window.print();
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-${data.personal.fullName.replace(/\s+/g, '-').toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                setData(imported);
            } catch (e) {
                alert("Invalid JSON file");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="resume-builder-wrapper">
            <style jsx>{`
                .resume-builder-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    height: calc(100vh - 250px);
                    min-height: 900px;
                }
                .editor-pane {
                    overflow-y: auto;
                    padding-right: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .preview-pane {
                    background: #f1f5f9;
                    border-radius: var(--radius-md);
                    padding: 2.5rem;
                    overflow-y: auto;
                    display: flex;
                    justify-content: center;
                }
                .resume-sheet {
                    background: white;
                    width: 210mm;
                    min-height: 297mm;
                    padding: 30px 45px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
                    color: #1a1a1a;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.45;
                    font-size: 10pt;
                    position: relative;
                }
                
                /* Template Styles */
                .executive { font-family: 'Georgia', serif; }
                .tech { font-family: 'Inter', monospace; }
                .creative .resume-name { color: #e74c3c; letter-spacing: 2px; }
                .creative .resume-section-title { color: #e74c3c; border-bottom: 2px solid #e74c3c; }
                
                .modern { display: grid; grid-template-columns: 200px 1fr; padding: 0 !important; }
                .modern-sidebar { background: #2c3e50; color: white; padding: 30px 20px; }
                .modern-main { padding: 30px; }
                .modern .resume-name { color: white; font-size: 18pt; margin-bottom: 20px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.2); }
                .modern .resume-contact { flex-direction: column; align-items: flex-start; gap: 8px; color: #cbd5e1; }
                .modern .resume-section-title { border-bottom: 2px solid #2c3e50; margin-top: 5px; }
                .modern-sidebar .resume-section-title { color: #3498db; border-bottom: 1px solid rgba(255,255,255,0.2); margin-top: 30px; }
                
                .minimal { padding: 50px; }
                .minimal .resume-header { text-align: center; border-bottom: none; margin-bottom: 40px; }
                .minimal .resume-name { font-weight: 300; letter-spacing: 5px; }
                .minimal .resume-section-title { text-align: center; border-bottom: none; }
                .minimal .resume-section-title::after { content: ''; display: block; width: 30px; height: 1px; background: #333; margin: 5px auto; }
                
                .startup .resume-name { color: #f39c12; }
                .startup .resume-section-title { color: #f39c12; border-bottom: 2px dashed #f39c12; }
                
                .professional .resume-name { color: #4f46e5; }
                .professional .resume-section-title { border-bottom: 3px solid #4f46e5; }
                
                .dark { background: #111827; color: #f9fafb; padding: 40px; }
                .dark .resume-header { border-bottom: 1px solid #374151; }
                .dark .resume-name { color: #8b5cf6; }
                .dark .resume-section-title { border-bottom: 1px solid #374151; color: #8b5cf6; }
                .dark .resume-contact, .dark .resume-item-sub { color: #9ca3af; }

                /* Common Elements */
                .resume-header { text-align: center; border-bottom: 1px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
                .resume-name { font-size: 22pt; font-weight: 900; text-transform: uppercase; margin-bottom: 5px; }
                .resume-contact { display: flex; justify-content: center; gap: 15px; font-size: 9pt; flex-wrap: wrap; color: #555; }
                .resume-section { margin-bottom: 20px; }
                .resume-section-title { font-size: 11pt; font-weight: 800; text-transform: uppercase; margin-bottom: 10px; border-bottom: 1.5px solid #333; padding-bottom: 2px; }
                .resume-item { margin-bottom: 15px; }
                .resume-item-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 11pt; }
                .resume-item-sub { display: flex; justify-content: space-between; font-style: italic; color: #666; font-size: 9.5pt; }
                .resume-item-desc { white-space: pre-line; text-align: justify; font-size: 9.5pt; margin-top: 4px; }

                /* Editor Components */
                .template-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
                    gap: 10px; 
                    margin-bottom: 1.5rem; 
                    background: var(--bg-secondary);
                    padding: 1.25rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-color);
                }
                .template-btn { 
                    padding: 10px; 
                    border-radius: 6px; 
                    border: 1px solid var(--border-color); 
                    background: var(--bg-glass); 
                    cursor: pointer; 
                    transition: all 0.2s; 
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    text-align: center;
                }
                .template-btn:hover { border-color: var(--accent-primary); color: var(--text-primary); }
                .template-btn.active { background: var(--accent-primary); color: white; border-color: transparent; }

                .editor-section { background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); }
                .editor-section-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; }

                @media print {
                    @page { size: A4; margin: 0; }
                    body { visibility: hidden; background: white !important; }
                    .resume-sheet { visibility: visible; position: absolute; left: 0; top: 0; width: 100%; height: 100%; box-shadow: none !important; }
                    .resume-sheet * { visibility: visible; }
                    .resume-builder-wrapper, .navbar, .footer, .tool-page-header, .editor-pane { display: none !important; }
                }
                @media (max-width: 1200px) { .resume-builder-wrapper { grid-template-columns: 1fr; height: auto; } }
            `}</style>

            <div className="editor-pane scroll-custom">
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '10px', display: 'block' }}>Select Template (11+ Designs)</label>
                    <div className="template-grid">
                        {Object.values(resumeTemplates).map(t => (
                            <button key={t.id} className={`template-btn ${template === t.id ? 'active' : ''}`} onClick={() => setTemplate(t.id)}>
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
                    <button className="btn btn-primary" onClick={handlePrint}>
                        � Download PDF
                    </button>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline" onClick={handleExport} style={{ flex: 1 }}>📤 Export</button>
                        <label className="btn btn-outline" style={{ flex: 1, cursor: 'pointer' }}>
                            📥 Import <input type="file" hidden accept=".json" onChange={handleImport} />
                        </label>
                    </div>
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">Personal Data</div>
                    <div className="grid-2" style={{ gap: '1rem' }}>
                        <input className="input-field" placeholder="Full Name" value={data.personal.fullName} onChange={e => setData({ ...data, personal: { ...data.personal, fullName: e.target.value } })} />
                        <input className="input-field" placeholder="Email" value={data.personal.email} onChange={e => setData({ ...data, personal: { ...data.personal, email: e.target.value } })} />
                        <input className="input-field" placeholder="Phone" value={data.personal.phone} onChange={e => setData({ ...data, personal: { ...data.personal, phone: e.target.value } })} />
                        <input className="input-field" placeholder="Location" value={data.personal.location} onChange={e => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} />
                        <input className="input-field" placeholder="LinkedIn" value={data.personal.linkedin} onChange={e => setData({ ...data, personal: { ...data.personal, linkedin: e.target.value } })} />
                    </div>
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">Summary / Objective</div>
                    <textarea className="input-field" rows="4" value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} />
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">
                        Experience
                        <button className="btn btn-xs btn-outline" onClick={() => addArrayItem('experience', { company: '', role: '', location: '', dates: '', description: '' })}>+ Add</button>
                    </div>
                    {data.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                            <div className="grid-2" style={{ gap: '10px', marginBottom: '10px' }}>
                                <input className="input-field" placeholder="Company" value={exp.company} onChange={e => handleArrayChange('experience', i, 'company', e.target.value)} />
                                <input className="input-field" placeholder="Role" value={exp.role} onChange={e => handleArrayChange('experience', i, 'role', e.target.value)} />
                                <input className="input-field" placeholder="Dates" value={exp.dates} onChange={e => handleArrayChange('experience', i, 'dates', e.target.value)} />
                                <input className="input-field" placeholder="Location" value={exp.location} onChange={e => handleArrayChange('experience', i, 'location', e.target.value)} />
                            </div>
                            <textarea className="input-field" rows="3" placeholder="Bullet points" value={exp.description} onChange={e => handleArrayChange('experience', i, 'description', e.target.value)} />
                            <button className="btn btn-xs btn-outline" style={{ color: 'var(--accent-red)', marginTop: '5px' }} onClick={() => removeArrayItem('experience', i)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">
                        Education
                        <button className="btn btn-xs btn-outline" onClick={() => addArrayItem('education', { school: '', degree: '', location: '', dates: '' })}>+ Add</button>
                    </div>
                    {data.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                            <div className="grid-2" style={{ gap: '10px' }}>
                                <input className="input-field" placeholder="School" value={edu.school} onChange={e => handleArrayChange('education', i, 'school', e.target.value)} />
                                <input className="input-field" placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange('education', i, 'degree', e.target.value)} />
                                <input className="input-field" placeholder="Dates" value={edu.dates} onChange={e => handleArrayChange('education', i, 'dates', e.target.value)} />
                            </div>
                            <button className="btn btn-xs btn-outline" style={{ color: 'var(--accent-red)', marginTop: '5px' }} onClick={() => removeArrayItem('education', i)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">Skills & Competencies</div>
                    <textarea className="input-field" rows="3" value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} />
                </div>
            </div>

            <div className="preview-pane scroll-custom">
                <div className={`resume-sheet ${template}`} id="resume-sheet">
                    {template === 'modern' ? (
                        <>
                            <div className="modern-sidebar">
                                <h1 className="resume-name">{data.personal.fullName}</h1>
                                <div className="resume-contact">
                                    {data.personal.email && <div>✉ {data.personal.email}</div>}
                                    {data.personal.phone && <div>📞 {data.personal.phone}</div>}
                                    {data.personal.linkedin && <div>🔗 LinkedIn</div>}
                                </div>
                                <div className="resume-section">
                                    <div className="resume-section-title" style={{ color: '#3498db' }}>Expertise</div>
                                    <div style={{ fontSize: '9pt', color: '#cbd5e1' }}>{data.skills}</div>
                                </div>
                            </div>
                            <div className="modern-main">
                                <div className="resume-section">
                                    <div className="resume-section-title">Summary</div>
                                    <div className="resume-item-desc">{data.summary}</div>
                                </div>
                                <div className="resume-section">
                                    <div className="resume-section-title">Experience</div>
                                    {data.experience.map((exp, i) => (
                                        <div key={i} className="resume-item">
                                            <div className="resume-item-header"><span>{exp.role}</span><span>{exp.dates}</span></div>
                                            <div className="resume-item-sub"><span>{exp.company}</span></div>
                                            <div className="resume-item-desc">{exp.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="resume-header">
                                <h1 className="resume-name">{data.personal.fullName}</h1>
                                <div className="resume-contact">
                                    {data.personal.email && <span>{data.personal.email}</span>}
                                    {data.personal.phone && <span>{data.personal.phone}</span>}
                                    {data.personal.location && <span>{data.personal.location}</span>}
                                </div>
                            </div>
                            <div className="resume-section">
                                <div className="resume-section-title">Professional Summary</div>
                                <div className="resume-item-desc">{data.summary}</div>
                            </div>
                            <div className="resume-section">
                                <div className="resume-section-title">Experience</div>
                                {data.experience.map((exp, i) => (
                                    <div key={i} className="resume-item">
                                        <div className="resume-item-header"><span>{exp.role}</span><span>{exp.dates}</span></div>
                                        <div className="resume-item-sub"><span>{exp.company} ({exp.location})</span></div>
                                        <div className="resume-item-desc">{exp.description}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="resume-section">
                                <div className="resume-section-title">Education</div>
                                {data.education.map((edu, i) => (
                                    <div key={i} className="resume-item">
                                        <div className="resume-item-header"><span>{edu.degree}</span><span>{edu.dates}</span></div>
                                        <div className="resume-item-sub"><span>{edu.school}</span></div>
                                    </div>
                                ))}
                            </div>
                            <div className="resume-section">
                                <div className="resume-section-title">Skills</div>
                                <div className="resume-item-desc">{data.skills}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
