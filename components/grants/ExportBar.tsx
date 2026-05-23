'use client';

import { useState } from 'react';
import type {
  ClassroomProject,
  CuratedFunder,
  FoundationLead,
  OrgProfile,
  RankedGrant,
} from '@/lib/grants/types';
import { toMarkdown, todayFilenameStamp } from '@/lib/grants/export/markdown';

interface ExportBarProps {
  profile: OrgProfile;
  results: RankedGrant[];
  curatedFunders?: CuratedFunder[];
  foundationLeads?: FoundationLead[];
  classroomProjects?: ClassroomProject[];
}

type CopyState = 'idle' | 'copied' | 'error';

export function ExportBar({
  profile,
  results,
  curatedFunders,
  foundationLeads,
  classroomProjects,
}: ExportBarProps) {
  const [pdfBusy, setPdfBusy] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const buildMarkdown = (): string =>
    toMarkdown({ profile, results, curatedFunders, foundationLeads, classroomProjects });

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onCopy = async () => {
    const text = buildMarkdown();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (err) {
      console.error('[grants] copy failed:', err);
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2500);
    }
  };

  const onDownloadMarkdown = () => {
    const blob = new Blob([buildMarkdown()], { type: 'text/markdown;charset=utf-8' });
    downloadBlob(blob, `jamelna-grants-${todayFilenameStamp()}.md`);
  };

  const onDownloadPdf = async () => {
    setPdfBusy(true);
    try {
      const [{ pdf }, { GrantFindingsPDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/lib/grants/export/pdf'),
      ]);
      const blob = await pdf(
        <GrantFindingsPDF
          profile={profile}
          results={results}
          curatedFunders={curatedFunders}
          foundationLeads={foundationLeads}
          classroomProjects={classroomProjects}
        />,
      ).toBlob();
      downloadBlob(blob, `jamelna-grants-${todayFilenameStamp()}.pdf`);
    } catch (err) {
      console.error('[grants] PDF export failed:', err);
    } finally {
      setPdfBusy(false);
    }
  };

  const copyLabel =
    copyState === 'copied'
      ? 'Copied!'
      : copyState === 'error'
        ? 'Copy failed'
        : 'Copy to clipboard';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onCopy}
        className="px-4 py-2 text-sm rounded-md bg-warm text-white hover:bg-warm/90"
      >
        {copyLabel}
      </button>
      <button
        onClick={onDownloadMarkdown}
        className="px-4 py-2 text-sm rounded-md border border-deep-border text-text-primary hover:bg-deep-alt"
      >
        Download .md
      </button>
      <button
        onClick={onDownloadPdf}
        disabled={pdfBusy}
        className="px-4 py-2 text-sm rounded-md border border-deep-border text-text-primary hover:bg-deep-alt disabled:opacity-60"
      >
        {pdfBusy ? 'Building PDF…' : 'Download .pdf'}
      </button>
    </div>
  );
}
