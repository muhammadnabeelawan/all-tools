export const metadata = {
    title: 'About Us - All Tools',
    description: 'Learn more about All Tools - the premium, privacy-first online utility platform.',
};

export default function AboutUs() {
    return (
        <div className="container py-20">
            <style jsx>{`
                .about-hero {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto 80px;
                }
                .about-hero h1 {
                    font-size: 3.5rem;
                    margin-bottom: 1.5rem;
                }
                .stat-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 30px;
                    margin-bottom: 80px;
                }
                .stat-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .stat-card:hover {
                    transform: translateY(-5px);
                }
                .stat-icon {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                    display: block;
                }
                .stat-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                }
                .mission-section {
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
                    border-radius: 30px;
                    padding: 60px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .mission-content {
                    max-width: 800px;
                }
                .mission-content h2 {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                }
                .mission-content p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--text-muted);
                }
            `}</style>

            <section className="about-hero animate-fade-in-up">
                <div className="hero-badge">Our Mission</div>
                <h1>Empowering Productivity, <span className="gradient-text">Protecting Privacy</span></h1>
                <p className="hero-p">
                    All Tools was built on a simple premise: Everyone deserves high-quality digital utilities that are
                    fast, free, and completely secure. We believe your data should stay where it belongs—on your machine.
                </p>
            </section>

            <div className="stat-grid">
                <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <span className="stat-icon">🔒</span>
                    <h3>Privacy First</h3>
                    <p className="text-muted">No data ever touches our servers. 100% client-side execution.</p>
                </div>
                <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="stat-icon">⚡</span>
                    <h3>Zero Latency</h3>
                    <p className="text-muted">Instant results powered by your own device's hardware.</p>
                </div>
                <div className="stat-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <span className="stat-icon">✨</span>
                    <h3>Premium Design</h3>
                    <p className="text-muted">Modern, ad-free interface designed for the best experience.</p>
                </div>
            </div>

            <section className="mission-section animate-fade-in-up">
                <div className="mission-content">
                    <h2>Why We Exist</h2>
                    <p>
                        The internet is full of "free" tools that monetize your data, interrupt your flow with
                        obtrusive ads, or force you to create accounts. We wanted to build something different.
                    </p>
                    <p style={{ marginTop: '20px' }}>
                        All Tools is a comprehensive suite of 77+ utilities designed for developers, designers,
                        and power users. By using the latest web technologies like WebAssembly and client-side
                        JS, we've eliminated the need for server processing, making our tools faster, safer,
                        and more reliable.
                    </p>
                </div>
            </section>
        </div>
    );
}
