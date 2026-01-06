// components/jobs/InsightsWidget.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getInsights, dismissInsight } from '@/lib/jobs/conductor-client';
import type { JobInsight } from '@/lib/jobs/types';
import Link from 'next/link';

export default function InsightsWidget() {
  const { sessionToken } = useJobsAuth();
  const [insights, setInsights] = useState<JobInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, [sessionToken]);

  async function loadInsights() {
    if (!sessionToken) return;
    const result = await getInsights(sessionToken);
    if (result.data) {
      setInsights(result.data);
    }
    setLoading(false);
  }

  async function handleDismiss(insightId: string) {
    if (!sessionToken) return;
    await dismissInsight(sessionToken, insightId);
    setInsights(insights.filter(i => i.id !== insightId));
  }

  if (loading || insights.length === 0) return null;

  const urgentCount = insights.filter(i => i.priority === 'urgent').length;
  const highCount = insights.filter(i => i.priority === 'high').length;

  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        background: urgentCount > 0
          ? 'rgba(239, 68, 68, 0.1)'
          : 'rgba(251, 191, 36, 0.1)',
        border: `1px solid ${urgentCount > 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">
          {urgentCount > 0 ? '🔴' : '🟡'}
        </span>
        <h3 className="font-semibold text-white">
          {urgentCount > 0 ? `${urgentCount} Urgent` : ''}
          {urgentCount > 0 && highCount > 0 ? ', ' : ''}
          {highCount > 0 ? `${highCount} Important` : ''}
          {urgentCount === 0 && highCount === 0 ? 'Reminders' : ''}
        </h3>
      </div>

      <div className="space-y-2">
        {insights.slice(0, 3).map((insight) => (
          <div
            key={insight.id}
            className="flex items-start justify-between gap-3 p-3 rounded-lg"
            style={{ background: 'rgba(0, 0, 0, 0.2)' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <PriorityBadge priority={insight.priority} />
                <span className="text-white text-sm font-medium truncate">
                  {insight.title}
                </span>
              </div>
              <p className="text-[#636366] text-xs mt-1 truncate">
                {insight.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/jobs/view/${insight.jobId}`}
                className="text-xs text-[#00a8ff] hover:underline"
              >
                View
              </Link>
              <button
                onClick={() => handleDismiss(insight.id)}
                className="text-xs text-[#636366] hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      {insights.length > 3 && (
        <p className="text-xs text-[#636366] mt-2 text-center">
          +{insights.length - 3} more
        </p>
      )}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors = {
    urgent: 'bg-red-500/20 text-red-400',
    high: 'bg-yellow-500/20 text-yellow-400',
    medium: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <span className={`px-1.5 py-0.5 text-[10px] rounded ${colors[priority as keyof typeof colors] || colors.medium}`}>
      {priority.toUpperCase()}
    </span>
  );
}
