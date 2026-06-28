import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResourcesHubPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <hr className="heading-rule" />
        <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
          Free tools for educators and non-profits
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Practical utilities we&apos;ve built while consulting with schools and non-profits. Free
          to use, no account required.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          <Link
            href={`/${locale}/resources/grants`}
            className="group block rounded-lg border border-deep-border p-6 hover:border-warm transition-colors bg-deep-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-text-heading group-hover:text-warm">
                  Grant finder
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Answer four questions about your organization and we will search federal grant
                  opportunities, rank the best fits with Claude, and let you email or download the
                  results.
                </p>
                <div className="mt-3 text-xs text-text-muted">
                  Grants.gov · ProPublica Nonprofit Explorer · DonorsChoose
                </div>
              </div>
              <span className="text-warm group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href={`/${locale}/k12-cs-education`}
            className="group block rounded-lg border border-deep-border p-6 hover:border-warm transition-colors bg-deep-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-semibold text-text-heading group-hover:text-warm">
                  K-12 CS education planner
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  AI-generated scope and sequence for K-12 computer science, aligned to CSTA
                  standards.
                </p>
              </div>
              <span className="text-warm group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
