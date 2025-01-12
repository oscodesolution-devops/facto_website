import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const TermsAndConditions = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 data-aos="fade-up" className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
        <div data-aos="fade-up" className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Scope of Services</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Financial Consultancy, including tax planning, GST compliance, and income tax filing.</li>
              <li>Assistance in financial updates, learning modules, and advisory on financial matters.</li>
              <li>Comprehensive support for GST filing, reconciliation, and amendments.</li>
              <li>Regular updates on financial regulations and policies affecting businesses and individuals.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3">Eligibility for Services</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The client must be 18 years or older or have appropriate legal authority to act on behalf of a minor or business entity.</li>
              <li>The client must provide accurate and complete information as required for availing of services.</li>
              <li>The client must comply with applicable laws and regulations governing their financial transactions.</li>
              <li>Client below age 18 year can opt for only learning and financial update services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure all information and documents shared are accurate, complete, and timely.</li>
              <li>Review all reports, returns, or filings for accuracy before final submission.</li>
              <li>Retain copies of all submitted documents for personal records.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Confidentiality and Data Protection</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All client data will be handled in strict confidence and used only for service delivery.</li>
              <li>No client information will be shared with third parties except as required by law or with explicit consent.</li>
              <li>Security measures will be implemented to protect sensitive client data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All materials, tools, and learning modules provided remain the property of the consultancy.</li>
              <li>The client may use these materials for personal or internal business purposes only.</li>
              <li>Redistribution, resale, or modification of consultancy materials is prohibited without prior consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Service Fees and Payment</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All services are subject to fees as agreed upon in advance.</li>
              <li>Fees must be paid promptly as per the invoice or agreement terms.</li>
              <li>Non-payment or delayed payment may result in suspension or termination of services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fees paid for consultancy services are non-refundable unless explicitly stated otherwise.</li>
              <li>Refunds, if applicable, will be processed based on mutual agreement and company policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Updates and Learning Modules</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Regular updates on GST, tax laws, and financial regulations will be provided as part of the service.</li>
              <li>Access to learning modules is subject to the terms of the agreement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Limitations of Liability</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The consultancy will not be liable for penalties, interest, or other charges resulting from inaccurate or incomplete information provided by the client.</li>
              <li>Liability is limited to the service fee paid for the specific issue in question.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Termination of Agreement</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Either party may terminate the agreement with written notice, subject to applicable terms.</li>
              <li>Upon termination, the client must settle any outstanding payments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Dispute Resolution</h2>
            <p>All disputes will be subject to the jurisdiction of the courts located in the agreed region, typically where the consultancy operates.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Consent to Communications</h2>
            <p>By availing of the services, the client consents to receive communications via email, SMS, and WhatsApp for updates and service-related notifications.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Force Majeure</h2>
            <p>The consultancy shall not be liable for delays or failures resulting from events beyond its reasonable control, such as natural disasters, internet outages, or government actions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Intellectual Property Rights</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All intellectual property associated with Facto Management Consultancy services is owned exclusively by the company.</li>
              <li>Clients are not permitted to reproduce, modify, or distribute any proprietary materials without prior written consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">License and Permitted Use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Facto Management Consultancy grants clients a limited, non-exclusive, non-transferable license to use its services for the agreed purposes.</li>
              <li>The services are to be used only by the client and for the intended scope. Any unauthorized usage, redistribution, or modification of the services is prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Disclaimer of Warranties</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Facto Management Consultancy provides its services "as is" and does not guarantee specific outcomes or results.</li>
              <li>The consultancy is not liable for external factors, such as internet issues or delays caused by regulatory bodies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Calling, SMS, and Email Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Clients consent to receive calls, SMS, WhatsApp messages, and emails for service-related updates, even if registered on "Do Not Disturb" lists.</li>
              <li>Facto Management Consultancy is not liable for complaints under telecommunication regulations for such communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Electronic Communication Consent</h2>
            <p>By engaging with the services, clients consent to receive all communications electronically, including updates, disclosures, and alerts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Indemnification</h2>
            <p>Clients agree to indemnify and hold Facto Management Consultancy harmless against claims, damages, or liabilities resulting from misuse or breach of these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Amendments to Terms and Conditions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The consultancy reserves the right to amend these terms and conditions.</li>
              <li>Clients will be notified of significant changes via email or updates on the official website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Acknowledgment and Acceptance</h2>
            <p>By availing of the consultancy services, the client acknowledges understanding and acceptance of these terms and conditions.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;