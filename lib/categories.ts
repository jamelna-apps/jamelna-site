// Shared metadata for the three work categories. Data keys stay as
// professional / products / creative; display labels read Professional /
// Personal / Art. Used by the filter bar and the per-card category badges.

export type CategoryKey = 'professional' | 'products' | 'creative';

export const CATEGORY_ORDER: CategoryKey[] = ['professional', 'products', 'creative'];

export const CATEGORY_META: Record<
  CategoryKey,
  { labelKey: string; dot: string; chip: string; bar: string }
> = {
  professional: {
    labelKey: 'catProfessional',
    dot: 'bg-terra',
    chip: 'border-terra/40 text-terra',
    bar: 'bg-terra',
  },
  products: {
    labelKey: 'catPersonal',
    dot: 'bg-ink-light',
    chip: 'border-ink-light/40 text-ink-light',
    bar: 'bg-ink',
  },
  creative: {
    labelKey: 'catArt',
    dot: 'bg-[#8AA76E]',
    chip: 'border-[#8AA76E]/50 text-[#A7C089]',
    bar: 'bg-[#8AA76E]',
  },
};
