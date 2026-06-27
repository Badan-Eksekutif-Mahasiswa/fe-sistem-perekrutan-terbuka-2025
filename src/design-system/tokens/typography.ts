export const fontFamily = {
  heading: '"Plus Jakarta Sans", sans-serif',
  body:    '"Plus Jakarta Sans", sans-serif',
  script:  '"Roadster Script", cursive',
} as const;

export const textStyles = {
  // Headers ExtraBold 800
  h1: { fontSize: '36px', fontWeight: 800, letterSpacing: '1.44px', lineHeight: '100%' },
  h2: { fontSize: '28px', fontWeight: 800, letterSpacing: '1.12px', lineHeight: '100%' },
  h3: { fontSize: '24px', fontWeight: 800, letterSpacing: '0.24px', lineHeight: '100%' },
  h4: { fontSize: '20px', fontWeight: 800, letterSpacing: '0.20px', lineHeight: '100%' },
  h5: { fontSize: '16px', fontWeight: 800, letterSpacing: '0.16px', lineHeight: '100%' },
  // Subheadings SemiBold 600
  m1: { fontSize: '24px', fontWeight: 600, letterSpacing: '0.24px', lineHeight: '100%' },
  m2: { fontSize: '20px', fontWeight: 600, letterSpacing: '0.20px', lineHeight: '100%' },
  m3: { fontSize: '16px', fontWeight: 600, letterSpacing: '0.16px', lineHeight: '100%' },
  m4: { fontSize: '12px', fontWeight: 600, letterSpacing: '0.12px', lineHeight: '100%' },
  // Body Regular 400
  p1: { fontSize: '18px', fontWeight: 400, letterSpacing: '0.18px', lineHeight: '150%' },
  p2: { fontSize: '16px', fontWeight: 400, letterSpacing: '0.16px', lineHeight: '150%' },
  p3: { fontSize: '14px', fontWeight: 400, letterSpacing: '0.28px', lineHeight: '150%' },
  p4: { fontSize: '12px', fontWeight: 400, letterSpacing: '0.12px', lineHeight: '150%' },
} as const;
