export const metadata = {
    title: 'Terms and Conditions - All Tools',
    description: 'The standard terms for using our free online toolset.',
};

export default function TermsAndConditions() {
    return (
        <div className="container static-page-container animate-fade-in-up">
            <h1 className="static-hero h1" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>Terms & Conditions</h1>
            <p className="update-date">Last Updated: October 2023</p>

            <div className="policy-section">
                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing or using All Tools, you agree to be bound by these Terms and Conditions.
                    If you do not agree with any part of these terms, you may not use our services.
                </p>
            </div>

            <div className="policy-section">
                <h2>2. Use of Service</h2>
                <p>
                    All Tools provides free online utilities for personal and professional use. You agree to use
                    these tools only for lawful purposes and in a way that does not infringe the rights of others
                    or restrict their use of the platform.
                </p>
            </div>

            <div className="policy-section">
                <h2>3. No Warranty (Disclaimer)</h2>
                <p>
                    All features and tools are provided "as is" and "as available" without any warranty of any kind,
                    express or implied. While we strive for accuracy, we do not guarantee the completeness or
                    reliability of any tool's output.
                </p>
            </div>

            <div className="policy-section">
                <h2>4. Limitation of Liability</h2>
                <p>
                    All Tools and its developers shall not be liable for any indirect, incidental, special, or
                    consequential damages resulting from the use or the inability to use the services, even if
                    we have been advised of the possibility of such damages.
                </p>
            </div>

            <div className="policy-section">
                <h2>5. Intellectual Property</h2>
                <p>
                    The tools, interface, and branding are the property of All Tools. However, any data you
                    process using our tools remains your property and is never stored or claimed by us.
                </p>
            </div>

            <div className="policy-section">
                <h2>6. Modifications to Service</h2>
                <p>
                    We reserve the right to modify or discontinue, temporarily or permanently, any tool or
                    section of the platform without notice. We also reserve the right to update these terms
                    at any time.
                </p>
            </div>
        </div>
    );
}
