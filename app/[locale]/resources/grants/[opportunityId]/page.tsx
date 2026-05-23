import PageWrapper from '@/components/PageWrapper';
import { GrantDetailView } from '@/components/grants/GrantDetailView';

interface PageProps {
  params: Promise<{ locale: string; opportunityId: string }>;
  searchParams: Promise<{ source?: string }>;
}

export default async function GrantDetailPage({ params, searchParams }: PageProps) {
  const { locale, opportunityId } = await params;
  const { source } = await searchParams;
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <GrantDetailView
          opportunityId={opportunityId}
          source={source ?? 'grants_gov'}
          locale={locale}
        />
      </div>
    </PageWrapper>
  );
}
