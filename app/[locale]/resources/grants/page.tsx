import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import { IntakeWizard } from '@/components/grants/IntakeWizard';
import { SourcesFooter } from '@/components/grants/SourcesFooter';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GrantsIntakePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${locale}/resources`}
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-heading mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Resources
        </Link>
        <hr className="heading-rule" />
        <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
          Find US grants that fit your organization
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Answer four quick questions. We will search Grants.gov, ProPublica Nonprofit Explorer, and
          DonorsChoose, then ask Claude to rank the best matches for your project. Results never
          leave your browser unless you choose to email or download them.
        </p>

        <div className="mt-8">
          <IntakeWizard locale={locale} />
        </div>

        <details className="mt-8 text-sm text-text-secondary">
          <summary className="cursor-pointer text-text-primary font-medium">
            What we do with your data
          </summary>
          <div className="mt-3 space-y-2 text-text-muted">
            <p>
              Your inputs are not stored. Results live only in your browser session. If you choose
              to email results to yourself, your email address is used only to send that single
              message and is never retained.
            </p>
            <p>
              We never sell, share, or enrich your profile. Claude receives your inputs only to
              rank opportunities from public grant APIs.
            </p>
          </div>
        </details>

        <SourcesFooter />
      </div>
    </PageWrapper>
  );
}
