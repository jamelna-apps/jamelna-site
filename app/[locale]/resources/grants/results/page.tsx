import PageWrapper from '@/components/PageWrapper';
import { ResultsView } from '@/components/grants/ResultsView';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GrantsResultsPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto">
        <ResultsView locale={locale} />
      </div>
    </PageWrapper>
  );
}
