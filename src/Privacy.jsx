import { useEffect } from "react";
import { EMAIL, LINKEDIN_URL } from "./shared.jsx";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — Ben Lewis Studios";
  }, []);

  const h2 = { fontFamily: "var(--fh)", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 600, color: "#F5F0EB", marginTop: "40px", marginBottom: "16px", letterSpacing: "-0.3px" };
  const p = { fontSize: "15px", lineHeight: 1.8, color: "rgba(245,240,235,0.65)", fontWeight: 300, marginBottom: "14px" };
  const ul = { listStyle: "disc", paddingLeft: "24px", color: "rgba(245,240,235,0.65)" };
  const li = { fontSize: "15px", lineHeight: 1.8, fontWeight: 300, marginBottom: "8px" };
  const a = { color: "#F5F0EB", textDecoration: "underline" };

  return (
    <section style={{ padding: "140px 24px 100px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--fh)", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(245,240,235,0.45)", marginBottom: "24px" }}>
          Legal
        </div>
        <h1 style={{ fontFamily: "var(--fh)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-1px", marginBottom: "16px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(245,240,235,0.4)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "40px" }}>
          Effective 19 April 2026
        </p>

        <p style={p}>
          Ben Lewis Studios (&ldquo;<strong style={{ color: "#F5F0EB" }}>BLS</strong>&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates benlewisltd.com and the services offered under the Ben Lewis Studios brand, including content production and distribution for DTC brands. This Privacy Policy explains what personal data we collect, how we use it, who we share it with, and the rights you have over your data.
        </p>
        <p style={p}>
          We are committed to protecting your privacy and complying with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, the EU General Data Protection Regulation (EU GDPR), and the California Consumer Privacy Act (CCPA) as applicable.
        </p>
        <p style={p}>
          <strong style={{ color: "#F5F0EB" }}>Data controller:</strong> Ben Lewis Simpson, trading as Ben Lewis Studios, United Kingdom. Contact: <a style={a} href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2 style={h2}>1. What data we collect</h2>
        <p style={p}>
          We only collect the minimum data needed to operate the services you engage with.
        </p>
        <p style={p}><strong style={{ color: "#F5F0EB" }}>When you submit the free spec ad form or the Work page lead form:</strong></p>
        <ul style={ul}>
          <li style={li}>Your name</li>
          <li style={li}>Your email address</li>
          <li style={li}>Your brand name and/or brand URL</li>
          <li style={li}>Any additional context you voluntarily provide</li>
        </ul>
        <p style={p}><strong style={{ color: "#F5F0EB" }}>When you visit benlewisltd.com:</strong></p>
        <ul style={ul}>
          <li style={li}>Standard server logs (IP address, user agent, referrer, timestamps) retained by our hosting provider (Vercel) for security and analytics purposes</li>
          <li style={li}>No first-party cookies or tracking pixels are set by BLS</li>
          <li style={li}>We do not run retargeting scripts, analytics tags with personal identifiers, or advertising trackers</li>
        </ul>
        <p style={p}><strong style={{ color: "#F5F0EB" }}>When BLS uses the LinkedIn API on behalf of authorised accounts:</strong></p>
        <ul style={ul}>
          <li style={li}>The LinkedIn member ID of the authorising user (for post authorship)</li>
          <li style={li}>OAuth access tokens provided by LinkedIn (stored securely and used solely to publish content on behalf of the authorising user)</li>
          <li style={li}>We do not read, store, or export LinkedIn connections, messages, or profile data beyond the authorising user&rsquo;s own identifier</li>
        </ul>

        <h2 style={h2}>2. How we use your data</h2>
        <p style={p}>We use your data only for the purposes below, and only where we have a lawful basis under UK/EU GDPR (Article 6(1)(a) consent, 6(1)(b) contract, or 6(1)(f) legitimate interest):</p>
        <ul style={ul}>
          <li style={li}>To deliver the spec ad, UGC video, or other creative you&rsquo;ve requested</li>
          <li style={li}>To respond to enquiries and schedule discovery calls</li>
          <li style={li}>To publish content to social platforms (Instagram, LinkedIn) on behalf of authorising users via their connected accounts</li>
          <li style={li}>To secure and improve the benlewisltd.com service (fraud prevention, performance monitoring)</li>
          <li style={li}>To comply with legal obligations where required</li>
        </ul>
        <p style={p}>We do not use your data for automated profiling, ad targeting, or decisions producing legal effects.</p>

        <h2 style={h2}>3. How we share your data</h2>
        <p style={p}>We do not sell your personal data. Ever.</p>
        <p style={p}>We share limited data with the following service providers that help us operate, and only to the extent necessary:</p>
        <ul style={ul}>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Vercel</strong> — hosting and edge delivery of benlewisltd.com</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>FormSubmit</strong> — processing contact form submissions on a transactional basis</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Make.com</strong> — content distribution automation to Instagram and LinkedIn on behalf of authorising users</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>LinkedIn, Meta (Instagram)</strong> — social platforms we interact with via their official APIs only when explicitly authorised by the account holder</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Calendly</strong> — booking discovery calls when you schedule one</li>
        </ul>
        <p style={p}>Each provider is bound by its own privacy policy and, where applicable, a data processing agreement. We only share what is strictly required for the service to function.</p>

        <h2 style={h2}>4. LinkedIn data — specific disclosures</h2>
        <p style={p}>BLS operates applications that use the LinkedIn API in accordance with the <a style={a} href="https://www.linkedin.com/legal/l/api-terms-of-use" target="_blank" rel="noopener noreferrer">LinkedIn API Terms of Use</a>.</p>
        <ul style={ul}>
          <li style={li}>We request only the minimum OAuth scopes needed to publish content on the authorising user&rsquo;s behalf (typically <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: "3px" }}>openid</code>, <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: "3px" }}>profile</code>, <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: "3px" }}>w_member_social</code>, <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: "3px" }}>r_liteprofile</code>)</li>
          <li style={li}>We do not access connections, messages, groups, recommendations, employment history, education, or any LinkedIn content beyond the authorising user&rsquo;s own public identifier</li>
          <li style={li}>We do not share LinkedIn data with any third party</li>
          <li style={li}>Authorising users may revoke our access at any time at <a style={a} href="https://www.linkedin.com/mypreferences/d/data-sharing-for-permitted-services" target="_blank" rel="noopener noreferrer">linkedin.com/mypreferences/d/data-sharing-for-permitted-services</a></li>
          <li style={li}>OAuth access tokens are stored securely and never logged, cached, or exposed in client-side code</li>
          <li style={li}>On revocation or account deletion request, any stored tokens and member identifiers are deleted within 30 days</li>
        </ul>

        <h2 style={h2}>5. Data retention</h2>
        <p style={p}>We retain personal data only for as long as needed to fulfil the purpose it was collected for, plus any period required by law:</p>
        <ul style={ul}>
          <li style={li}>Lead form submissions: retained up to 24 months for follow-up, then deleted unless you become a client</li>
          <li style={li}>Client data: retained for the duration of the engagement plus 6 years for UK tax and commercial record-keeping requirements</li>
          <li style={li}>LinkedIn OAuth tokens: retained only while the app integration is active. Deleted within 30 days of revocation or account deletion</li>
          <li style={li}>Server logs: 30 days (handled by our hosting provider)</li>
        </ul>

        <h2 style={h2}>6. Your rights</h2>
        <p style={p}>Under UK and EU GDPR you have the following rights. Under CCPA, California residents have similar rights. You can exercise any of these by emailing us at <a style={a} href={`mailto:${EMAIL}`}>{EMAIL}</a>:</p>
        <ul style={ul}>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Access</strong> — request a copy of the personal data we hold about you</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Rectification</strong> — ask us to correct inaccurate or incomplete data</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Erasure</strong> — ask us to delete your personal data (&ldquo;right to be forgotten&rdquo;)</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Restriction</strong> — ask us to limit how we process your data</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Objection</strong> — object to processing based on legitimate interests</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Portability</strong> — request your data in a machine-readable format to transfer elsewhere</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time</li>
          <li style={li}><strong style={{ color: "#F5F0EB" }}>Complain</strong> — lodge a complaint with the UK Information Commissioner&rsquo;s Office (<a style={a} href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>) or your local data protection authority</li>
        </ul>
        <p style={p}>We respond to all rights requests within 30 days.</p>

        <h2 style={h2}>7. International transfers</h2>
        <p style={p}>Some of our service providers are based outside the UK/EEA (notably the United States). When we transfer your data internationally, we rely on appropriate safeguards such as the UK International Data Transfer Agreement, the EU Standard Contractual Clauses, or adequacy decisions where applicable.</p>

        <h2 style={h2}>8. Security</h2>
        <p style={p}>We implement appropriate technical and organisational measures to protect personal data, including TLS encryption in transit, access controls on hosting infrastructure, and minimal data retention. No method of transmission or storage is 100% secure. In the event of a personal data breach affecting your rights, we will notify the UK ICO within 72 hours and you as soon as reasonably practical.</p>

        <h2 style={h2}>9. Children</h2>
        <p style={p}>Our services are directed at businesses and adults. We do not knowingly collect personal data from anyone under 16. If you believe we hold data about a child, please contact us and we will delete it.</p>

        <h2 style={h2}>10. Cookies</h2>
        <p style={p}>benlewisltd.com does not set first-party cookies or tracking pixels. The only storage used is <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: "3px" }}>sessionStorage</code> to avoid showing the lead capture popup multiple times in a single visit. This data stays in your browser and is cleared when you close the tab.</p>

        <h2 style={h2}>11. Changes to this policy</h2>
        <p style={p}>We may update this Privacy Policy from time to time. When we do, we update the &ldquo;Effective&rdquo; date at the top of this page. Material changes will be announced on the site. Your continued use of our services after an update means you accept the revised policy.</p>

        <h2 style={h2}>12. Contact</h2>
        <p style={p}>For any privacy-related enquiry, data request, or concern:</p>
        <ul style={ul}>
          <li style={li}>Email: <a style={a} href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li style={li}>Postal: Ben Lewis Simpson, Woking, Surrey, United Kingdom</li>
          <li style={li}>LinkedIn: <a style={a} href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Ben Lewis</a></li>
        </ul>
      </div>
    </section>
  );
}
