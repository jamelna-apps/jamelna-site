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
        <div className="text-xs uppercase tracking-wider text-warm mb-3">
          <Link href={`/${locale}/resources`} className="hover:underline">
            Resources
          </Link>{' '}
          / Grant finder
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-heading mb-4">
          Find US grants that fit your organization
        </h1>
        <p className="text-lg text-text-secondary">
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
