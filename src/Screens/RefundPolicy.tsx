import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const RefundPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 data-aos="fade-up" className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>
        <div data-aos="fade-up" className="space-y-6">
          <p className="text-lg">At Facto Management Consultancy, we are dedicated to providing high-quality services to our valued customers. We recognize that unforeseen circumstances might lead to the need for a refund. To ensure transparency, we have outlined our refund policy below in a clear and concise manner.</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Eligibility Criteria</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Refund requests are applicable for paid services availed within the last 30 days.</li>
              <li>Customers can request a refund under the following conditions:</li>
              <ul className="list-circle pl-5 space-y-2">
                <li><strong>Commencement Delay:</strong> If the Facto Management Consultancy team fails to initiate the agreed-upon service within 72 hours of payment, a full refund will be issued promptly.</li>
                <li><strong>Government Deadline Compliance:</strong> In cases where the team is unable to meet the deadlines mandated by government regulations, customers are eligible for a full refund.</li>
              </ul>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Refund Request Process</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contact our customer support team within <strong>30 days of your service purchase</strong>.</li>
              <li>Provide the reason for your refund request, as outlined in the eligibility criteria above.</li>
              <li>Share any additional relevant details to facilitate the review process.</li>
            </ul>
            <p className="mt-2">Our team will carefully evaluate your request and determine its validity.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Refund Timeline</h2>
            <p className="mb-2">Once your refund request is approved:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Refunds will be processed within <strong>14 business days</strong>.</li>
              <li>The refund will be issued using the same payment method as the original transaction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Exceptions and Fraud Prevention</h2>
            <ul className="list-disc pl-5">
              <li>Refund requests may be declined if found to be fraudulent or if there is a breach of our terms and conditions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Policy Updates</h2>
            <p>This refund policy is subject to change without prior notice. We encourage you to review it periodically or contact us for the latest details.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;