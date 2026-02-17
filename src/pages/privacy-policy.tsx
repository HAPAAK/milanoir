import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { privacyPolicy } from "@/data/legalContent";

const PrivacyPolicyPage = () => (
  <LegalPageLayout
    title={privacyPolicy.title}
    lastUpdated={privacyPolicy.lastUpdated}
    sections={privacyPolicy.sections}
  />
);

export default PrivacyPolicyPage;
