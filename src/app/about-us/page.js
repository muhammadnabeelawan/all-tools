export const metadata = {
    title: 'About Us - All Tools',
    description: 'Learn more about All Tools - the premium, privacy-first online utility platform.',
};

export default function AboutUs() {
    return (
        <div className="container static-page-container">
            <section className="static-hero animate-fade-in-up">
                <div className="hero-badge">Our Mission</div>
                <h1>Empowering Productivity, <span className="gradient-text">Protecting Privacy</span></h1>
                <p className="hero-p">
                    All Tools was built on a simple premise: Everyone deserves high-quality digital utilities that are
                    fast, free, and completely secure. We believe your data should stay where it belongs—on your machine.
                </p>
            </section>

            <div className="static-grid">
                <div className="static-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <span className="static-card-icon">🔒</span>
                    <h3>Privacy First</h3>
                    <p className="text-muted">No data ever touches our servers. 100% client-side execution.</p>
                </div>
                <div className="static-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <span className="static-card-icon">⚡</span>
                    <h3>Zero Latency</h3>
                    <p className="text-muted">Instant results powered by your own device's hardware.</p>
                </div>
                <div className="static-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <span className="static-card-icon">✨</span>
                    <h3>Premium Design</h3>
                    <p className="text-muted">Modern, ad-free interface designed for the best experience.</p>
                </div>
            </div>

            <section className="static-section animate-fade-in-up">
                <div className="static-content">
                    <h2>Why We Exist</h2>
                    <p>
                        The internet is full of "free" tools that monetize your data, interrupt your flow with
                        obtrusive ads, or force you to create accounts. We wanted to build something different.
                    </p>
                    <p style={{ marginTop: '20px' }}>
                        All Tools is a comprehensive suite of 85+ utilities designed for developers, designers,
                        and power users. By using the latest web technologies like WebAssembly and client-side
                        JS, we've eliminated the need for server processing, making our tools faster, safer,
                        and more reliable.
                    </p>
                </div>
            </section>
        </div>
    );
}
