import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getTrueCostData, clearTrueCostCache } from '@/lib/ai-true-cost/data';
import { computeBreakdown } from '@/lib/ai-true-cost/math';

export const runtime = 'nodejs';

const OG_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
};

function fallbackCard(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f13',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9ca3af',
            marginBottom: 24,
          }}
        >
          THE TRUE COST OF AI
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          What does your AI really cost?
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#9ca3af',
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          Numbers coming in Phase B
        </div>
        <div style={{ fontSize: 14, color: '#6b7280' }}>jamelna.com</div>
      </div>
    ),
    { width: 1200, height: 630, headers: OG_CACHE_HEADERS }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const scenarioId = searchParams.get('scenario') ?? 'chatgpt-plus';

  // In dev, clear the module-level cache so YAML edits show up without restart.
  // In production the cache is intentionally persistent across requests.
  if (process.env.NODE_ENV !== 'production') {
    clearTrueCostCache();
  }

  try {
    const data = await getTrueCostData();
    const productsById = Object.fromEntries(data.products.map((p) => [p.id, p]));

    const product = productsById[scenarioId] ?? productsById['chatgpt-plus'];

    // Fallback card when no products are available yet (Phase A)
    if (!product) {
      return fallbackCard();
    }

    const breakdown = computeBreakdown(product);
    const subsidyMultiple = breakdown.subsidy_multiple.toFixed(1);

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#0f0f13',
            fontFamily: 'system-ui, sans-serif',
            padding: '60px 80px',
          }}
        >
          {/* Top label */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9ca3af',
            }}
          >
            THE TRUE COST OF AI
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                fontSize: 18,
                color: '#9ca3af',
                fontWeight: 600,
              }}
            >
              {product.vendor}
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </div>

            {/* Price row */}
            <div
              style={{
                display: 'flex',
                gap: 40,
                marginTop: 24,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  You pay
                </div>
                <div style={{ fontSize: 40, fontWeight: 700, color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                  ${breakdown.price_paid_usd.toFixed(2)}
                  <span style={{ fontSize: 18, color: '#9ca3af', marginLeft: 6 }}>/mo</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', color: '#374151', fontSize: 32, marginTop: 8 }}>
                →
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  True cost
                </div>
                <div style={{ fontSize: 40, fontWeight: 700, color: '#fb923c', fontVariantNumeric: 'tabular-nums' }}>
                  ${breakdown.true_cost_usd.toFixed(2)}
                  <span style={{ fontSize: 18, color: '#9ca3af', marginLeft: 6 }}>/mo</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 4, marginLeft: 20 }}>
                <div
                  style={{
                    background: 'rgba(251,146,60,0.15)',
                    border: '1px solid rgba(251,146,60,0.4)',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#fb923c',
                  }}
                >
                  {subsidyMultiple}× subsidized
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ fontSize: 14, color: '#4b5563' }}>jamelna.com</div>
        </div>
      ),
      { width: 1200, height: 630, headers: OG_CACHE_HEADERS }
    );
  } catch {
    // Return the fallback card (200) rather than a 500 so crawlers always
    // receive a valid image — e.g. when content YAML files are temporarily missing.
    return fallbackCard();
  }
}
