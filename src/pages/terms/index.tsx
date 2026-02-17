import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { termsAndConditions } from "@/data/legalContent";

const TermsPage = () => (
  <LegalPageLayout
    title={termsAndConditions.title}
    lastUpdated={termsAndConditions.lastUpdated}
    sections={termsAndConditions.sections}
  />
);

export default TermsPage;
