import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/PolicyPage";
import { hasLocale } from "@/lib/locales";
import { getDictionary } from "../dictionaries";

export const metadata = {
  title: "Cookie Policy — Neteon.ai",
  description:
    "How Neteon uses cookies and analytics tools, which services set cookies on our site, and how to opt out.",
};

export default async function CookiesRoute({ params }: PageProps<"/[lang]/cookies">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <PolicyPage dict={dict} locale={lang} title="Cookie Policy" updated="April 2026">
      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They allow
        sites to recognize your browser across requests and store limited information about your
        session and preferences.
      </p>

      <h2>How Neteon uses cookies</h2>
      <p>
        We use cookies to support essential site functionality, measure how the site performs, and
        reach customers searching for relevant solutions. You interact with our site via cookies
        and analytics tools whenever you browse Neteon.ai.
      </p>

      <h3>Essential cookies</h3>
      <p>
        These cookies are required for the site to operate — for example, maintaining your
        language selection or keeping form state across page loads. They are always on.
      </p>

      <h3>Analytics cookies</h3>
      <p>
        We use <strong>Google Analytics</strong> to understand how visitors use our site and to
        improve performance and user experience. Google Analytics uses first-party cookies to
        collect anonymous usage data.
      </p>

      <h3>Advertising cookies</h3>
      <p>
        We use <strong>Google Ads</strong> to reach customers searching for industrial computing
        and Edge AI solutions. These cookies collect anonymous data and display tailored
        advertisements based on user interests.
      </p>

      <h2>Opting out</h2>
      <p>
        You can opt out of Google Analytics tracking at any time by installing the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-Out Browser Add-on
        </a>
        .
      </p>
      <p>
        You may also clear or block cookies at any time through your browser settings. Note that
        blocking all cookies may impact the functionality of this and other websites.
      </p>

      <h2>SSL encryption</h2>
      <p>
        All personal and payment data transmitted through our website is protected by
        industry-standard Secure Sockets Layer (SSL) encryption, guarding against unauthorized
        access while cookies are being set or read.
      </p>

      <h2>Policy updates</h2>
      <p>
        This policy may be updated periodically. Any changes will be posted on this page.
        Continued use of the website constitutes acceptance of the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about our use of cookies, please contact us at{" "}
        <a href="mailto:engage@neteon.net">engage@neteon.net</a>. You can also review the full{" "}
        <a href={`/${lang}/privacy`}>Privacy Policy</a> for more detail on how we handle your data.
      </p>
    </PolicyPage>
  );
}
