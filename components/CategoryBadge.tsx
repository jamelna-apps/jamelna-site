'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CATEGORY_META, CategoryKey } from '@/lib/categories';

export default function CategoryBadge({ category }: { category: string }) {
  const t = useTranslations('work');
  const meta = CATEGORY_META[category as CategoryKey];
  if (!meta) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${meta.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {t(meta.labelKey)}
    </span>
  );
}
