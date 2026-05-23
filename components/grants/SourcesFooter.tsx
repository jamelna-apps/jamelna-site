'use client';

export function SourcesFooter() {
  return (
    <div className="mt-10 border-t border-deep-border pt-6 text-xs text-text-muted space-y-2">
      <p>
        Data sources: <a className="underline hover:text-warm" href="https://www.grants.gov" target="_blank" rel="noreferrer">Grants.gov</a>,{' '}
        <a className="underline hover:text-warm" href="https://projects.propublica.org/nonprofits/" target="_blank" rel="noreferrer">ProPublica Nonprofit Explorer</a>,{' '}
        <a className="underline hover:text-warm" href="https://www.donorschoose.org/" target="_blank" rel="noreferrer">DonorsChoose.org</a>.
      </p>
      <p>
        Grant information may be out of date. Always verify eligibility, deadlines, and requirements directly
        with the awarding agency before applying. Jamelna is not affiliated with these agencies and does not
        guarantee award outcomes. AI-generated fit scores are suggestions only.
      </p>
    </div>
  );
}
