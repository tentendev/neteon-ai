import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/PolicyPage";
import { hasLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";

export const metadata = {
  title: "Privacy Policy — Neteon.ai",
  description:
    "How Neteon collects, uses, and protects your information — including online security, cookie usage, and contact preferences.",
};

export default async function PrivacyRoute({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <PolicyPage dict={dict} locale={lang} title="Privacy Policy" updated="April 2026">
      <h2>Online Security</h2>
      <p>We are committed to providing a safe and secure online experience for our industrial and enterprise customers.</p>
      <p>
        To protect sensitive information, we use industry-standard Secure Sockets Layer (SSL)
        encryption technology. This ensures that all personal and payment data transmitted through
        our website is secure and protected against unauthorized access.
      </p>

      <h2>Online Privacy</h2>

      <h3>Information We Collect</h3>
      <p>We collect personal and company-related information when you:</p>
      <ul>
        <li>Place an order or request a quote</li>
        <li>Contact us via forms or email</li>
        <li>Subscribe to updates or newsletters</li>
        <li>Interact with our website (via cookies and analytics tools)</li>
      </ul>
      <p>
        This may include your name, email address, company name, phone number, shipping details,
        and usage data.
      </p>

      <h3>How We Use Your Information</h3>
      <p>Your information is used to:</p>
      <ul>
        <li>Provide customer support</li>
        <li>Communicate important updates about products and services</li>
        <li>Improve website performance and user experience</li>
        <li>Share marketing content, when opted in</li>
      </ul>
      <p>
        We do not sell, trade, or share your personal data with third parties, except with trusted
        service providers directly involved in fulfilling your requests.
      </p>

      <h3>Communication Preferences</h3>
      <p>
        You may unsubscribe from non-transactional emails at any time by using the unsubscribe link
        provided in our communications.
      </p>

      <h2>Use of Google Services</h2>
      <p>
        We use Google Analytics and Google Ads to improve website performance and reach customers
        searching for relevant solutions. These tools use first-party cookies to collect anonymous
        data and display tailored advertisements based on user interests.
      </p>
      <p>
        To opt out of Google tracking, visit the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-Out Page
        </a>
        .
      </p>

      <h2>Policy Updates</h2>
      <p>
        This policy may be updated periodically. Any changes will be posted on this page. Continued
        use of the website constitutes acceptance of the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions regarding this policy or how your data is handled, please contact
        us at{" "}
        <a href="mailto:engage@neteon.net">engage@neteon.net</a>.
      </p>

      <h2>Our Commitment</h2>
      <p>
        Neteon is more than just a hardware supplier — we are your strategic partner for industrial
        network and computing technologies — with a focus on support, security, and long-term
        reliability.
      </p>
    </PolicyPage>
  );
}
