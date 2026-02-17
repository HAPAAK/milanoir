/**
 * Centralized content for Privacy Policy and Terms & Conditions pages.
 * Edit text here — the page components render it automatically.
 */

export interface LegalSection {
  heading: string;
  body: string;
}

// ─── Privacy Policy ──────────────────────────────────────────────────────────

export const privacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: February 2026",
  sections: [
    {
      heading: "1. Information We Collect",
      body: "We collect personal information that you voluntarily provide to us, including your name, email address, and any other information you choose to provide.",
    },
    {
      heading: "2. How We Use Information",
      body: "We use your information to provide and improve our services, communicate with you, and comply with legal obligations.",
    },
    {
      heading: "3. Data Sharing",
      body: "We do not sell or trade your personal information. We may share it with trusted partners to operate the website and provide services, under confidentiality agreements.",
    },
    {
      heading: "4. Data Security",
      body: "We implement industry-standard measures to protect your information, but no method of transmission over the Internet is 100% secure.",
    },
    {
      heading: "5. Your Rights",
      body: "You may request access to, correction of, or deletion of your personal information. Contact us with any requests.",
    },
    {
      heading: "6. Changes to This Policy",
      body: "We may update this Privacy Policy. Continued use of the site after changes signifies your acceptance of the new terms.",
    },
  ] as LegalSection[],
};

// ─── Terms & Conditions ──────────────────────────────────────────────────────

export const termsAndConditions = {
  title: "Terms & Conditions",
  lastUpdated: "Last updated: February 2026",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      body: "By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.",
    },
    {
      heading: "2. Use of Service",
      body: "You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the Service.",
    },
    {
      heading: "3. Intellectual Property",
      body: "All content on this website, including text, graphics, logos, and images, is the property of Milanoir Events or its content suppliers and is protected by international copyright laws.",
    },
    {
      heading: "4. Limitation of Liability",
      body: "Milanoir Events will not be liable for any damages arising from the use of this website or from any information, content, materials, products, or services included on or otherwise made available to you through this website.",
    },
    {
      heading: "5. Changes to Terms",
      body: "Milanoir Events reserves the right to modify these Terms and Conditions at any time. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.",
    },
  ] as LegalSection[],
};
