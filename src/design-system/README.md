# SPT BEM UI 2026 — Design System

Design system lengkap untuk platform rekrutmen SPT BEM UI 2026. Semua komponen bersumber dari Figma file `mpCzfDjIZjS0LjtfhHazGL`, page "Final".

## Import

```typescript
// Selalu import dari design-system, BUKAN dari path langsung
import { DSButton, GlassCard, Badge, LogoSPT } from '@/design-system';
import { colors, gradients, shadows } from '@/design-system/tokens';
```

## Tokens

### Colors
```typescript
import { colors } from '@/design-system/tokens';

colors.marun.DEFAULT   // '#5e121c' — brand marun
colors.primary[500]    // '#1d2642' — navy
colors.primary[300]    // '#475ca3' — biru border
colors.pink.light      // '#ffced8'
colors.status.success  // '#20b80b'
```

### Gradients (via CSS variable)
```css
backgroundImage: 'var(--gradient-btn-1)'      /* primary button */
backgroundImage: 'var(--gradient-btn-3)'      /* external button */
backgroundImage: 'var(--gradient-navbar)'     /* navbar */
backgroundImage: 'var(--gradient-card-blue)'  /* glass card */
backgroundImage: 'var(--gradient-highlight)'  /* highlight text bar */
backgroundImage: 'var(--gradient-page)'       /* page background */
```

### Shadows
```css
boxShadow: 'var(--shadow-glass)'   /* 0px 2px 7px rgba(255,255,255,0.15) — PUTIH */
boxShadow: 'var(--shadow-btn)'     /* 0px 4px 3px + 0px 10px 7.5px rgba(0,0,0,0.1) */
```

## Komponen

### Atoms

#### Button
```tsx
<DSButton variant="primary">Daftar Sekarang</DSButton>
<DSButton variant="secondary">Tentang SPT</DSButton>
<DSButton variant="external">Selengkapnya</DSButton>
<DSButton variant="signin">Sign In</DSButton>

// Props
variant?: 'primary' | 'secondary' | 'external' | 'signin'
size?: 'sm' | 'md' | 'lg'
leftIcon?: ReactNode
disabled?: boolean
loading?: boolean
href?: string        // renders as <Link>
fullWidth?: boolean
```

#### GlassCard
```tsx
<GlassCard padding="md">
  <p>Konten card</p>
</GlassCard>

// Props
padding?: 'none' | 'sm' | 'md' | 'lg'
as?: 'div' | 'section' | 'article'
```

#### TextBox
```tsx
<TextBox>
  <p>Teks body dengan dark glass, border pink, blur 47.5px</p>
</TextBox>
```

#### HighlightText
```tsx
<HighlightText textSize="h1">Sistem Perekrutan Terbuka</HighlightText>

// Props
textSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
```

#### Badge
```tsx
<Badge status="open" />
<Badge status="closed" />
<Badge status="active" label="Sedang Berjalan" />

// status: 'open' | 'active' | 'closed' | 'draft'
```

#### DSCheckbox
```tsx
<DSCheckbox
  label="Universitas"
  checked={checked}
  onChange={(v) => setChecked(v)}
/>
```

#### DSInput
```tsx
<DSInput
  label="Nama Lengkap"
  placeholder="Masukkan nama..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  required
  error="Field wajib diisi"
/>
```

#### DSDropdown
```tsx
<DSDropdown
  label="Pilih Divisi"
  options={[{ value: 'multimedia', label: 'Multimedia' }]}
  value={value}
  onChange={setValue}
/>
```

#### LogoSPT
```tsx
<LogoSPT size="md" showText />
// size: 'sm' (64px) | 'md' (120px) | 'lg' (160px)
```

#### LogoBackground
```tsx
<LogoBackground variant="single" opacity={0.4} width={300} height={300} />
<LogoBackground variant="pattern" opacity={0.3} />
```

#### DiamondIcon
```tsx
<DiamondIcon size={20} color="white" filled />
```

### Molecules

#### DSNavbar
```tsx
<DSNavbar
  navLinks={[{ href: '/', label: 'Home' }]}
  onSignIn={() => router.push('/login')}
/>
```

#### DSFooter
```tsx
<DSFooter
  orgName="Badan Eksekutif Mahasiswa UI 2026"
  socialLinks={[...]}
  copyrightText="© BEM UI 2026"
/>
```

#### DSFilterCard
```tsx
<DSFilterCard
  sections={[
    { title: 'Tingkat', options: ['Universitas', 'Pra-Kampus'] },
  ]}
  values={filterState}
  onChange={setFilterState}
/>
```

#### DSTabs
```tsx
<DSTabs
  tabs={[{ id: 'overview', label: 'Overview' }]}
  activeTab={active}
  onChange={setActive}
/>
```

#### DSEventCard
```tsx
<DSEventCard
  event={{ id: '1', title: 'BEM UI', status: 'open', ... }}
  onRegister={(id) => handleRegister(id)}
  onDetail={(id) => router.push(`/${id}`)}
/>
```

#### SearchBar
```tsx
<SearchBar
  value={query}
  onChange={setQuery}
  onClear={() => setQuery('')}
  placeholder="Cari event..."
/>
```

### Organisms

#### EventGrid
```tsx
<EventGrid
  events={events}
  loading={isLoading}
  onRegister={handleRegister}
  onDetail={handleDetail}
/>
```

#### FilterPanel
```tsx
<FilterPanel
  initialFilters={{ Universitas: false, UKM: false }}
  onFilterChange={(filters) => applyFilters(filters)}
/>
```

## Preview

Akses `/design-system` di browser untuk melihat semua komponen dengan semua variannya.
