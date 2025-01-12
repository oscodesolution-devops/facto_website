import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 data-aos="fade-up" className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div data-aos="fade-up" className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>At Facto Management Consultancy (referred to as "Facto"), we prioritize protecting your personal information. Our practices are designed to comply with the Information Technology Act, 2000, its amendments, and relevant Indian laws. We are committed to fostering trust and safeguarding our clients' data across all our services.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Who This Privacy Policy Covers</h2>
            <p>This policy is applicable to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Clients: Individuals or entities using our services.</li>
              <li>Advisers: Professionals working with Facto to provide expert guidance.</li>
              <li>Visitors: Users browsing our website or app.</li>
              <li>Service Providers: Third parties offering services on behalf of Facto.</li>
              <li>Enquirers: Individuals seeking information about our services.</li>
              <li>Direct/Indirect Beneficiaries: Those benefiting from our offerings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Information We Collect</h2>
            <div className="space-y-4">
              <p>We may collect the following categories of information:</p>
              <div>
                <h3 className="font-semibold mb-2">a. Directly Provided Data</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personal Details: Name, address, email, phone number, PAN, and bank account information.</li>
                  <li>Tax Information: Income, deductions, expenses, assets, liabilities, and tax forms (e.g., Form 15CA, Form 16, Form 26AS).</li>
                  <li>Service-Specific Data: Notices for tax scrutiny, advisory preferences, and related documents.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">b. Automatically Collected Data</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Website Interaction Details: IP address, browser type, location, and cookie-related information.</li>
                  <li>Communication Records: Emails, voicemails, or correspondence.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">c. Third-Party/Publicly Available Data</h3>
                <p>Information retrieved from publicly accessible sources or social media.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Why We Collect Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enhance service personalization and quality.</li>
              <li>Facilitate compliance with legal and regulatory requirements.</li>
              <li>Prevent fraud and ensure security.</li>
              <li>Provide financial and tax-related services effectively.</li>
              <li>Improve website functionality and user experience.</li>
              <li>Deliver targeted communication, such as newsletters or service updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Managing tax-related services (e.g., ITR filing, tax notices).</li>
              <li>Conducting identity verification and KYC checks.</li>
              <li>Improving operational efficiency and service quality.</li>
              <li>Enabling lawful data sharing with affiliates, regulators, and partners.</li>
              <li>Sending notifications or marketing updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Consent</h2>
            <p>Your use of our website or services signifies consent to this policy. Specific processing activities may require additional consent, which can be withdrawn at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Sharing Your Data</h2>
            <p>Facto may share data with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Affiliates and Group Companies: For operational purposes.</li>
              <li>Service Providers: For tasks like KYC verification and data analysis.</li>
              <li>Regulators and Authorities: To comply with legal obligations.</li>
              <li>Marketing Partners: Limited to lawful purposes under joint marketing arrangements.</li>
              <li>Legal Proceedings: As required for court orders or investigations.</li>
            </ul>
            <p className="mt-2">We ensure that third parties comply with robust data protection practices.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Security of Your Data</h2>
            <p>Facto employs industry-standard security measures to protect your data, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>SSL encryption for data transmission.</li>
              <li>Regular security audits and monitoring.</li>
              <li>Access controls and password protection for sensitive information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Data Retention</h2>
            <p>Your personal data is retained for as long as necessary to fulfill the purposes outlined or to comply with legal obligations. Once retention periods expire, data is securely deleted.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Your Rights</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your data or request corrections.</li>
              <li>Object to certain processing activities.</li>
              <li>Withdraw consent for data processing (where applicable).</li>
              <li>Request the deletion of data no longer required.</li>
              <li>File complaints with the relevant data protection authorities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Cookies Policy</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enhance website functionality and user experience.</li>
              <li>Analyze visitor interactions and preferences.</li>
              <li>Serve tailored advertisements through third-party providers.</li>
            </ul>
            <p className="mt-2">You can manage or disable cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Changes to This Policy</h2>
            <p>This policy may be updated to reflect changes in our services or legal requirements. We recommend reviewing this document periodically for the latest information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Contact Us</h2>
            <p>For privacy-related inquiries, contact:</p>
            <div className="mt-2">
              <p><strong>Grievance Officer</strong></p>
              <p>Email: Facto.consultancy@gmail.com</p>
              <p>Phone: 8877-577-977</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;