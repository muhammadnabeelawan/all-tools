export const metadata = {
    title: 'Terms and Conditions - All Tools',
    description: 'The standard terms for using our free online toolset.',
};

export default function TermsAndConditions() {
    return (
        <div className="container py-20">
            <style jsx>{`
                .terms-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .terms-container h1 {
                    font-size: 3rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }
                .terms-section {
                    margin-bottom: 40px;
                }
                .terms-section h2 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--primary-color);
                }
                .terms-section p, .terms-section li {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--text-muted);
                    margin-bottom: 15px;
                }
                .terms-section ul {
                    padding-left: 20px;
                }
                .update-date {
                    text-align: center;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    margin-bottom: 60px;
                }
            `}</style>

            <div className="terms-container animate-fade-in-up">
                <h1>Terms & Conditions</h1>
                <p className="update-date">Last Updated: October 2023</p>

                <div className="terms-section">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using All Tools, you agree to be bound by these Terms and Conditions.
                        If you do not agree with any part of these terms, you may not use our services.
                    </p>
                </div>

                <div className="terms-section">
                    <h2>2. Use of Service</h2>
                    <p>
                        All Tools provides free online utilities for personal and professional use. You agree to use
                        these tools only for lawful purposes and in a way that does not infringe the rights of others
                        or restrict their use of the platform.
                    </p>
                </div>

                <div className="terms-section">
                    <h2>3. No Warranty (Disclaimer)</h2>
                    <p>
                        All features and tools are provided "as is" and "as available" without any warranty of any kind,
                        express or implied. While we strive for accuracy, we do not guarantee the completeness or
                        reliability of any tool's output.
                    </p>
                </div>

                <div className="terms-section">
                    <h2>4. Limitation of Liability</h2>
                    <p>
                        All Tools and its developers shall not be liable for any indirect, incidental, special, or
                        consequential damages resulting from the use or the inability to use the services, even if
                        we have been advised of the possibility of such damages.
                    </p>
                </div>

                <div className="terms-section">
                    <h2>5. Intellectually Property</h2>
                    <p>
                        The tools, interface, and branding are the property of All Tools. However, any data you
                        process using our tools remains your property and is never stored or claimed by us.
                    </p>
                </div>

                <div className="terms-section">
                    <h2>6. Modifications to Service</h2>
                    <p>
                        We reserve the right to modify or discontinue, temporarily or permanently, any tool or
                        section of the platform without notice. We also reserve the right to update these terms
                        at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
