'use client';
import { useState, useEffect, useRef } from 'react';

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
    const resumeRef = useRef();

    useEffect(() => {
        const saved = localStorage.getItem('all-tools-resume-data');
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load resume data", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('all-tools-resume-data', JSON.stringify(data));
    }, [data]);

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
        window.print();
    };

    return (
        <div className="resume-builder-wrapper">
            <style jsx>{`
                .resume-builder-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    height: calc(100vh - 250px);
                    min-height: 800px;
                }
                .editor-pane {
                    overflow-y: auto;
                    padding-right: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .preview-pane {
                    background: #f3f4f6;
                    border-radius: var(--radius-md);
                    padding: 2rem;
                    overflow-y: auto;
                    display: flex;
                    justify-content: center;
                }
                .resume-sheet {
                    background: white;
                    width: 210mm; /* A4 width */
                    min-height: 297mm; /* A4 height */
                    padding: 40px 50px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    color: #1a1a1a;
                    font-family: 'Inter', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, sans-serif;
                    line-height: 1.5;
                    font-size: 10pt;
                }
                .resume-header {
                    text-align: center;
                    border-bottom: 2px solid #333;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                .resume-name {
                    font-size: 24pt;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 5px;
                }
                .resume-contact {
                    font-size: 9pt;
                    color: #444;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .resume-section {
                    margin-bottom: 20px;
                }
                .resume-section-title {
                    font-size: 12pt;
                    font-weight: 700;
                    text-transform: uppercase;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 3px;
                    margin-bottom: 10px;
                }
                .resume-item {
                    margin-bottom: 15px;
                }
                .resume-item-header {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 700;
                    font-size: 11pt;
                }
                .resume-item-sub {
                    display: flex;
                    justify-content: space-between;
                    font-style: italic;
                    color: #555;
                    margin-bottom: 5px;
                }
                .resume-item-desc {
                    white-space: pre-line;
                    text-align: justify;
                }
                .editor-section {
                    background: var(--bg-secondary);
                    padding: 1.5rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border-color);
                }
                .editor-section-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .resume-sheet, .resume-sheet * {
                        visibility: visible;
                    }
                    .resume-sheet {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        box-shadow: none;
                        padding: 0;
                    }
                    .resume-builder-wrapper, .tool-page-header, .navbar, .footer {
                        display: none !important;
                    }
                }
                @media (max-width: 1100px) {
                    .resume-builder-wrapper {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="editor-pane scroll-custom">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button className="btn btn-primary" onClick={handlePrint} style={{ flex: 1 }}>
                        🖨️ Print / Download PDF
                    </button>
                    <button className="btn btn-outline" onClick={() => setData(initialData)} style={{ flex: 1 }}>
                        🔄 Reset to Template
                    </button>
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">Personal Information</div>
                    <div className="grid-2" style={{ gap: '1rem' }}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input className="input-field" value={data.personal.fullName} onChange={e => setData({ ...data, personal: { ...data.personal, fullName: e.target.value } })} />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input className="input-field" value={data.personal.email} onChange={e => setData({ ...data, personal: { ...data.personal, email: e.target.value } })} />
                        </div>
                        <div className="input-group">
                            <label>Phone</label>
                            <input className="input-field" value={data.personal.phone} onChange={e => setData({ ...data, personal: { ...data.personal, phone: e.target.value } })} />
                        </div>
                        <div className="input-group">
                            <label>Location</label>
                            <input className="input-field" value={data.personal.location} onChange={e => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} />
                        </div>
                    </div>
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">Professional Summary</div>
                    <textarea
                        className="input-field"
                        rows="4"
                        value={data.summary}
                        onChange={e => setData({ ...data, summary: e.target.value })}
                        placeholder="Describe your career highlights and goals..."
                    />
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">
                        Work Experience
                        <button className="btn btn-xs btn-outline" onClick={() => addArrayItem('experience', { company: '', role: '', location: '', dates: '', description: '' })}>+ Add</button>
                    </div>
                    {data.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: i < data.experience.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                                <input className="input-field" placeholder="Company" value={exp.company} onChange={e => handleArrayChange('experience', i, 'company', e.target.value)} />
                                <input className="input-field" placeholder="Role" value={exp.role} onChange={e => handleArrayChange('experience', i, 'role', e.target.value)} />
                                <input className="input-field" placeholder="Location" value={exp.location} onChange={e => handleArrayChange('experience', i, 'location', e.target.value)} />
                                <input className="input-field" placeholder="Dates (e.g. 2021 - Present)" value={exp.dates} onChange={e => handleArrayChange('experience', i, 'dates', e.target.value)} />
                            </div>
                            <textarea className="input-field" rows="3" placeholder="Description (One bullet per line)" value={exp.description} onChange={e => handleArrayChange('experience', i, 'description', e.target.value)} />
                            <button className="btn btn-xs btn-outline" style={{ marginTop: '0.5rem', color: 'var(--accent-red)' }} onClick={() => removeArrayItem('experience', i)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">
                        Education
                        <button className="btn btn-xs btn-outline" onClick={() => addArrayItem('education', { school: '', degree: '', location: '', dates: '' })}>+ Add</button>
                    </div>
                    {data.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                            <div className="grid-2" style={{ gap: '1rem' }}>
                                <input className="input-field" placeholder="School" value={edu.school} onChange={e => handleArrayChange('education', i, 'school', e.target.value)} />
                                <input className="input-field" placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange('education', i, 'degree', e.target.value)} />
                                <input className="input-field" placeholder="Location" value={edu.location} onChange={e => handleArrayChange('education', i, 'location', e.target.value)} />
                                <input className="input-field" placeholder="Dates" value={edu.dates} onChange={e => handleArrayChange('education', i, 'dates', e.target.value)} />
                            </div>
                            <button className="btn btn-xs btn-outline" style={{ marginTop: '0.5rem', color: 'var(--accent-red)' }} onClick={() => removeArrayItem('education', i)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="editor-section">
                    <div className="editor-section-title">Skills</div>
                    <textarea
                        className="input-field"
                        rows="3"
                        value={data.skills}
                        onChange={e => setData({ ...data, skills: e.target.value })}
                        placeholder="e.g. JavaScript, Python, Strategic Planning..."
                    />
                </div>
            </div>

            <div className="preview-pane scroll-custom">
                <div className="resume-sheet" ref={resumeRef} id="resume-sheet">
                    <div className="resume-header">
                        <div className="resume-name">{data.personal.fullName}</div>
                        <div className="resume-contact">
                            {data.personal.email && <span>{data.personal.email}</span>}
                            {data.personal.phone && <span>{data.personal.phone}</span>}
                            {data.personal.location && <span>{data.personal.location}</span>}
                            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                        </div>
                    </div>

                    {data.summary && (
                        <div className="resume-section">
                            <div className="resume-section-title">Summary</div>
                            <div className="resume-item-desc">{data.summary}</div>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Experience</div>
                            {data.experience.map((exp, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span>{exp.role}</span>
                                        <span>{exp.dates}</span>
                                    </div>
                                    <div className="resume-item-sub">
                                        <span>{exp.company}</span>
                                        <span>{exp.location}</span>
                                    </div>
                                    <div className="resume-item-desc">
                                        {exp.description.split('\n').map((line, j) => (
                                            <div key={j} style={{ display: 'flex', gap: '8px' }}>
                                                {line.trim() && <span>•</span>}
                                                <span>{line}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Education</div>
                            {data.education.map((edu, i) => (
                                <div key={i} className="resume-item">
                                    <div className="resume-item-header">
                                        <span>{edu.degree}</span>
                                        <span>{edu.dates}</span>
                                    </div>
                                    <div className="resume-item-sub">
                                        <span>{edu.school}</span>
                                        <span>{edu.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.skills && (
                        <div className="resume-section">
                            <div className="resume-section-title">Skills</div>
                            <div className="resume-item-desc">{data.skills}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
