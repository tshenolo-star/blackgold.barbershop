import mjml2html from 'mjml';

export interface TshenoloEmailOptions {
  previewText: string;
  heading: string;
  bodyMjml: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/* ---------- Brand ---------- */
const BRAND_NAME = 'Blackgold Barber Co.';
const BRAND_TAGLINE = 'Sharp Cuts. Timeless Craft.';
const BRAND_DARK = '#0a0e1a';        // charcoal
const BRAND_ACCENT = '#C9A227';      // gold
const BG_NEUTRAL = '#F8FAFC';

/* ---------- Helpers ---------- */
const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const field = (label: string, value: string) => `
    <mj-text font-size="12px" font-weight="600" color="${BRAND_DARK}" text-transform="uppercase" letter-spacing="0.5px" padding-bottom="4px" font-family="monospace">
        ${label}
    </mj-text>
    <mj-text font-size="16px" color="#1F2937" padding-bottom="20px">
        ${escapeHtml(value)}
    </mj-text>`;

const paragraphs = (text: string): string =>
  escapeHtml(text)
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\r?\n/g, '<br/>'))
    .map((p) => `<mj-text padding-bottom="12px" color="#4B5563">${p}</mj-text>`)
    .join('');

export const renderParagraphs = paragraphs;

/* ---------- Base renderer ---------- */
export async function renderTshenoloEmail(opts: TshenoloEmailOptions): Promise<string> {
  const year = new Date().getFullYear();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://blackgoldbarber.co.za';

  const ctaSection =
    opts.ctaLabel && opts.ctaHref
      ? `
        <mj-section background-color="${BG_NEUTRAL}" padding="16px 0 0 0">
            <mj-column>
                <mj-button background-color="${BRAND_DARK}" color="#FFFFFF" font-weight="600" border-radius="8px" href="${opts.ctaHref}" padding="12px 24px" inner-padding="12px 24px">
                    ${opts.ctaLabel}
                </mj-button>
            </mj-column>
        </mj-section>`
      : '';

  const mjml = `
<mjml>
    <mj-head>
        <mj-title>${opts.heading} - ${BRAND_NAME}</mj-title>
        <mj-preview>${opts.previewText}</mj-preview>
        <mj-raw>
            <meta name="color-scheme" content="light only" />
            <meta name="supported-color-schemes" content="light only" />
        </mj-raw>
        <mj-attributes>
            <mj-all font-family="Arial, Helvetica, sans-serif" />
            <mj-text color="#1F2937" font-size="15px" line-height="1.6" />
            <mj-section padding="0" />
        </mj-attributes>
        <mj-style inline="inline">
            a { color: ${BRAND_ACCENT}; text-decoration: none; }
        </mj-style>
    </mj-head>
    <mj-body background-color="#F4F5F7" width="600px">

        <!-- Header -->
        <mj-section background-color="${BRAND_DARK}" padding="28px 32px">
            <mj-column>
                <mj-text align="left" font-size="14px" font-weight="700" color="#FFFFFF" font-family="monospace" letter-spacing="1px">
                    <a href="${siteUrl}" style="color: #FFFFFF; text-decoration: none;">BLACKGOLD</a>
                </mj-text>
                <mj-text align="left" font-size="11px" font-weight="600" color="${BRAND_ACCENT}" font-family="monospace" letter-spacing="2px" padding-top="4px">
                    ${BRAND_TAGLINE.toUpperCase()}
                </mj-text>
            </mj-column>
        </mj-section>

        <!-- Body -->
        <mj-section background-color="#FFFFFF" padding="32px 32px 40px 32px">
            <mj-column>
                <mj-text align="left" font-size="20px" font-weight="700" color="${BRAND_DARK}" padding-bottom="24px">
                    ${opts.heading}
                </mj-text>
                ${opts.bodyMjml}
                ${ctaSection}
            </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section background-color="${BG_NEUTRAL}" padding="24px 32px" border-top="1px solid #E5E7EB">
            <mj-column>
                <mj-text align="center" color="#6B7280" font-size="12px" line-height="1.6" padding-bottom="4px">
                    49A Market Avenue, Vereeniging, 1928
                </mj-text>
                <mj-text align="center" color="#6B7280" font-size="12px" line-height="1.6" padding-bottom="8px">
                    <a href="tel:+27725036443" style="color:${BRAND_ACCENT}; text-decoration:none;">+27 72 503 6443</a>
                </mj-text>
                <mj-text align="center" color="#9CA3AF" font-size="11px" line-height="1.5">
                    &copy; ${year} ${BRAND_NAME}.
                    <a href="${siteUrl}" style="color: #9CA3AF; text-decoration: underline;">${siteUrl}</a>
                </mj-text>
            </mj-column>
        </mj-section>

    </mj-body>
</mjml>`;

  const result = await mjml2html(mjml, { validationLevel: 'soft' });
  return result.html;
}