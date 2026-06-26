'use client';

import { useState } from 'react';
import {
  DSButton,
  GlassCard,
  TextBox,
  HighlightText,
  Badge,
  DSCheckbox,
  DSInput,
  DSDropdown,
  LogoSPT,
  LogoBackground,
  GedungRektoratUI,
  DiamondIcon,
  Union,
  DSNavbar,
  DSFooter,
  Awan,
  BalonUdara,
  DSFilterCard,
  DSTabs,
  DSEventCard,
  SearchBar,
  EventGrid,
  FilterPanel,
  type EventData,
} from '@/design-system';

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Rekrutmen Staff BEM UI 2026',
    organizer: 'BEM UI',
    status: 'open',
    startedAt: new Date('2026-06-01'),
    closedAt: new Date('2026-06-30'),
    description: 'Bergabunglah bersama kami dalam perjalanan membangun BEM UI yang lebih baik. Terbuka untuk seluruh mahasiswa UI.',
    divisions: ['Developer', 'Designer', 'Marketing'],
  },
  {
    id: '2',
    title: 'Rekrutmen Panitia COMPFEST 17',
    organizer: 'COMPFEST',
    status: 'closed',
    startedAt: new Date('2026-05-01'),
    closedAt: new Date('2026-05-15'),
    description: 'COMPFEST adalah acara nasional teknologi terbesar di Indonesia yang diselenggarakan oleh Fasilkom UI.',
    divisions: ['Divisi A', 'Divisi B'],
  },
  {
    id: '3',
    title: 'Staff PSDM BEM UI 2026',
    organizer: 'Departemen PSDM',
    status: 'active',
    startedAt: new Date('2026-08-01'),
    closedAt: new Date('2026-08-20'),
    description: 'Bergabung sebagai staf PSDM untuk membangun SDM BEM UI yang unggul.',
    divisions: ['Kaderisasi', 'Pelatihan'],
  },
  {
    id: '4',
    title: 'Rekrutmen Panitia Festival UI',
    organizer: 'BEM UI',
    status: 'draft',
    startedAt: new Date('2026-09-01'),
    closedAt: new Date('2026-09-20'),
    description: 'Festival tahunan terbesar UI. Daftarkan dirimu sebagai panitia acara bergengsi ini.',
    divisions: ['Acara', 'Logistik', 'Kreatif', 'Humas'],
  },
  {
    id: '5',
    title: 'Staff Akademik BEM UI',
    organizer: 'Departemen Akademik',
    status: 'open',
    startedAt: new Date('2026-07-10'),
    closedAt: new Date('2026-07-31'),
    description: 'Departemen Akademik BEM UI membuka rekrutmen untuk staff baru periode 2026.',
    divisions: ['Advokasi', 'Riset'],
  },
  {
    id: '6',
    title: 'Panitia MAKARA UI 2026',
    organizer: 'BEM UI',
    status: 'closed',
    startedAt: new Date('2026-04-01'),
    closedAt: new Date('2026-04-15'),
    description: 'Makara UI adalah rangkaian acara penyambutan mahasiswa baru Universitas Indonesia.',
    divisions: ['Perlengkapan', 'Acara', 'Dokumentasi'],
  },
];

const sectionNav = [
  { id: 'tokens',    label: 'Tokens' },
  { id: 'atoms',     label: 'Atoms' },
  { id: 'molecules', label: 'Molecules' },
  { id: 'organisms', label: 'Organisms' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ name }: { name: string }) {
  return (
    <p className="text-primary-100/60 font-jakarta text-xs font-semibold uppercase tracking-widest mb-3">
      {name}
    </p>
  );
}

function ComponentBlock({
  name,
  children,
  fullWidth = false,
}: {
  name: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <GlassCard padding="md" className="flex flex-col gap-4">
        <p className="text-primary-100/70 font-jakarta text-xs font-semibold tracking-widest uppercase border-b border-primary-300/40 pb-2">
          {name}
        </p>
        <div>{children}</div>
      </GlassCard>
    </div>
  );
}

// ─── Color swatches ───────────────────────────────────────────────────────────

const colorSwatches = [
  { name: 'marun',        hex: '#5e121c',               label: '#5e121c' },
  { name: 'marun-light',  hex: '#7a1a27',               label: '#7a1a27' },
  { name: 'primary-900',  hex: 'rgba(11,16,45,1)',       label: '#0b102d' },
  { name: 'primary-500',  hex: '#1d2642',                label: '#1d2642' },
  { name: 'primary-300',  hex: '#475ca3',                label: '#475ca3' },
  { name: 'primary-100',  hex: 'rgba(156,179,211,1)',    label: '#9cb3d3' },
  { name: 'secondary-300',hex: '#ddc446',               label: '#ddc446 — gold aksen' },
  { name: 'secondary-200',hex: '#e5d16e',               label: '#e5d16e — gold muda' },
  { name: 'pink-light',   hex: '#ffced8',                label: '#ffced8' },
  { name: 'pink-border',  hex: '#d8a6b1',                label: '#d8a6b1' },
  { name: 'neutral-100',  hex: '#ffffff',                label: '#ffffff' },
  { name: 'neutral-300',  hex: '#bbbbbb',                label: '#bbbbbb' },
  { name: 'status-success',hex: '#20b80b',              label: '#20b80b' },
  { name: 'status-danger', hex: '#d01515',              label: '#d01515' },
  { name: 'status-info',   hex: '#537bff',              label: '#537bff' },
  { name: 'status-warning',hex: '#ddc446',              label: '#ddc446' },
];

const gradientSwatches = [
  { name: 'gradient-navbar',    var: 'var(--gradient-navbar)' },
  { name: 'gradient-card-blue', var: 'var(--gradient-card-blue)' },
  { name: 'gradient-footer-ds', var: 'var(--gradient-footer-ds)' },
  { name: 'gradient-btn-1',     var: 'var(--gradient-btn-1)' },
  { name: 'gradient-btn-3',     var: 'var(--gradient-btn-3)' },
  { name: 'gradient-page',      var: 'var(--gradient-page)' },
  { name: 'gradient-highlight', var: 'var(--gradient-highlight)' },
];

const shadowSwatches = [
  { name: 'shadow-glass',  shadow: '0px 2px 7px 0px rgba(255,255,255,0.15)',     bg: '#1d2642' },
  { name: 'shadow-btn',    shadow: '0px 4px 3px rgba(0,0,0,0.1), 0px 10px 7.5px rgba(0,0,0,0.1)', bg: '#ffffff' },
  { name: 'shadow-card',   shadow: '0px 10px 50px 0px rgba(0,0,0,0.3)',          bg: '#ffffff' },
  { name: 'shadow-textbox',shadow: '0px 3.857px 19.284px rgba(0,0,0,0.5)',       bg: '#ffffff' },
];

const typographyStyles = [
  { label: 'h1', size: '2.25rem', weight: 800, desc: 'Heading 1 · 36px ExtraBold' },
  { label: 'h2', size: '1.75rem', weight: 800, desc: 'Heading 2 · 28px ExtraBold' },
  { label: 'h3', size: '1.5rem',  weight: 800, desc: 'Heading 3 · 24px ExtraBold' },
  { label: 'h4', size: '1.25rem', weight: 800, desc: 'Heading 4 · 20px ExtraBold' },
  { label: 'h5', size: '1rem',    weight: 800, desc: 'Heading 5 · 16px ExtraBold' },
  { label: 'm1', size: '1.5rem',  weight: 600, desc: 'Subheading 1 · 24px SemiBold' },
  { label: 'm2', size: '1.25rem', weight: 600, desc: 'Subheading 2 · 20px SemiBold' },
  { label: 'm3', size: '1rem',    weight: 600, desc: 'Subheading 3 · 16px SemiBold' },
  { label: 'm4', size: '0.75rem', weight: 600, desc: 'Subheading 4 · 12px SemiBold' },
  { label: 'p1', size: '1.125rem',weight: 400, desc: 'Body 1 · 18px Regular' },
  { label: 'p2', size: '1rem',    weight: 400, desc: 'Body 2 · 16px Regular' },
  { label: 'p3', size: '0.875rem',weight: 400, desc: 'Body 3 · 14px Regular' },
  { label: 'p4', size: '0.75rem', weight: 400, desc: 'Body 4 · 12px Regular' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const [checkedAtom, setCheckedAtom] = useState<Record<string, boolean>>({ Universitas: true });
  const [filterValues, setFilterValues] = useState<Record<string, boolean>>({ Universitas: true, UKM: true });
  const [inputVal, setInputVal] = useState('');
  const [dropVal, setDropVal] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchVal, setSearchVal] = useState('');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="min-h-screen font-jakarta"
      style={{ backgroundImage: 'var(--gradient-page)' }}
    >
      {/* Page header */}
      <header className="pt-32 pb-12 text-center px-20 border-b border-primary-300/40">
        <HighlightText textSize="h1">Design System</HighlightText>
        <p className="text-primary-100/60 text-m2 font-semibold mt-3">
          SPT BEM UI 2026 — Semua Komponen
        </p>
      </header>

      {/* ── Sticky section nav ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-40 flex justify-center gap-1 px-4 py-3 border-b border-primary-300/30"
        style={{
          background: 'rgba(11,16,45,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        aria-label="Design system sections"
      >
        {sectionNav.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="px-4 py-1.5 rounded-full text-m4 font-semibold text-white/70 hover:text-white hover:bg-primary-300/20 transition-all duration-200"
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — TOKENS
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="tokens" className="px-20 py-16 space-y-12 max-w-screen-xl mx-auto scroll-mt-16">
        <h2 className="text-h2 text-white font-extrabold">Design Tokens</h2>

        {/* Colors */}
        <div>
          <SectionLabel name="Colors" />
          <div className="flex flex-wrap gap-4">
            {colorSwatches.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-[60px] h-[60px] rounded-[12px] border border-white/20 shrink-0"
                  style={{ background: c.hex }}
                />
                <div className="text-center">
                  <p className="text-white text-[11px] font-semibold leading-none">{c.name}</p>
                  <p className="text-primary-100/50 text-[10px] font-mono mt-0.5">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <SectionLabel name="Typography — Plus Jakarta Sans" />
          <GlassCard padding="md" className="space-y-3">
            {typographyStyles.map((t) => (
              <div key={t.label} className="flex items-baseline gap-6 border-b border-primary-300/20 pb-3 last:border-0 last:pb-0">
                <span className="text-primary-100/40 font-mono text-xs w-6 shrink-0">{t.label}</span>
                <span
                  className="text-white leading-tight"
                  style={{ fontSize: t.size, fontWeight: t.weight, fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Aa — Plus Jakarta Sans
                </span>
                <span className="text-primary-100/40 text-xs font-jakarta ml-auto shrink-0">{t.desc}</span>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Gradients */}
        <div>
          <SectionLabel name="Gradients" />
          <div className="flex flex-wrap gap-4">
            {gradientSwatches.map((g) => (
              <div key={g.name} className="flex flex-col gap-2">
                <div
                  className="w-[200px] h-[80px] rounded-[12px] border border-white/20 shrink-0"
                  style={{ backgroundImage: g.var }}
                />
                <p className="text-primary-100/60 font-mono text-[11px]">{g.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shadows */}
        <div>
          <SectionLabel name="Shadows" />
          <div className="flex flex-wrap gap-6 items-end">
            {shadowSwatches.map((s) => (
              <div key={s.name} className="flex flex-col gap-2 items-center">
                <div
                  className="w-[120px] h-[60px] rounded-[12px]"
                  style={{ background: s.bg, boxShadow: s.shadow }}
                />
                <p className="text-primary-100/60 font-mono text-[11px]">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — ATOMS
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="atoms" className="px-20 py-16 max-w-screen-xl mx-auto scroll-mt-16">
        <h2 className="text-h2 text-white font-extrabold mb-10">Atoms</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* DSButton */}
          <ComponentBlock name="DSButton — 4 variants" fullWidth>
            <div className="flex flex-wrap gap-3 items-center">
              <DSButton variant="primary" size="sm">Primary</DSButton>
              <DSButton variant="secondary" size="sm">Secondary</DSButton>
              <DSButton variant="external" size="sm">Selengkapnya</DSButton>
              <DSButton variant="signin" size="sm">Sign In</DSButton>
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-3">
              <DSButton variant="primary" size="sm">SM</DSButton>
              <DSButton variant="primary" size="md">MD</DSButton>
              <DSButton variant="primary" size="lg">LG</DSButton>
              <DSButton variant="primary" size="md" loading>Loading</DSButton>
              <DSButton variant="primary" size="md" disabled>Disabled</DSButton>
            </div>
          </ComponentBlock>

          {/* GlassCard */}
          <ComponentBlock name="GlassCard">
            <GlassCard padding="sm">
              <p className="text-white text-p3">
                Glass card: gradient-card-blue + backdrop-blur 10px + shadow-glass (putih).
              </p>
            </GlassCard>
          </ComponentBlock>

          {/* TextBox */}
          <ComponentBlock name="TextBox">
            <TextBox>
              <p className="text-white text-p3">
                Dark glass: bg rgba(0,0,0,0.25) + border pink + backdrop-blur 47.5px + shadow-textbox.
              </p>
            </TextBox>
          </ComponentBlock>

          {/* HighlightText */}
          <ComponentBlock name="HighlightText">
            <div className="flex flex-col gap-3 items-start">
              <HighlightText textSize="h3">Judul H3</HighlightText>
              <HighlightText textSize="h4">Heading H4</HighlightText>
              <HighlightText textSize="h5">Teks H5</HighlightText>
            </div>
          </ComponentBlock>

          {/* Badge */}
          <ComponentBlock name="Badge — 4 status">
            <div className="flex flex-wrap gap-2">
              <Badge status="open" />
              <Badge status="active" />
              <Badge status="closed" />
              <Badge status="draft" />
              <Badge status="open" label="Custom" />
            </div>
          </ComponentBlock>

          {/* Checkbox */}
          <ComponentBlock name="DSCheckbox">
            <div className="flex flex-col gap-2">
              {['Universitas', 'Pra-Kampus', 'Tertutup'].map((opt) => (
                <DSCheckbox
                  key={opt}
                  label={opt}
                  checked={!!checkedAtom[opt]}
                  onChange={(v) => setCheckedAtom((p) => ({ ...p, [opt]: v }))}
                />
              ))}
            </div>
          </ComponentBlock>

          {/* Input */}
          <ComponentBlock name="DSInput">
            <div className="space-y-3">
              <DSInput
                label="Nama Lengkap"
                placeholder="Masukkan nama..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                required
              />
              <DSInput label="Error state" placeholder="..." error="Field wajib diisi" />
            </div>
          </ComponentBlock>

          {/* Dropdown */}
          <ComponentBlock name="DSDropdown">
            <DSDropdown
              label="Pilih Divisi"
              placeholder="Pilih..."
              options={[
                { value: 'multimedia', label: 'Multimedia' },
                { value: 'akademik',   label: 'Akademik' },
                { value: 'psdm',       label: 'PSDM' },
                { value: 'sosmas',     label: 'Sosmas' },
              ]}
              value={dropVal}
              onChange={setDropVal}
              required
            />
          </ComponentBlock>

          {/* LogoSPT */}
          <ComponentBlock name="LogoSPT — sm / md / lg">
            <div className="flex gap-6 items-end">
              <LogoSPT size="sm" showText />
              <LogoSPT size="md" showText />
              <LogoSPT size="lg" showText />
            </div>
          </ComponentBlock>

          {/* LogoBackground */}
          <ComponentBlock name="LogoBackground — single / pattern">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-[12px] overflow-hidden border border-primary-300 bg-primary-500/30">
                <LogoBackground variant="single" opacity={0.5} width={96} height={96} />
              </div>
              <div className="relative w-24 h-24 rounded-[12px] overflow-hidden border border-primary-300 bg-primary-500/30">
                <LogoBackground variant="pattern" opacity={0.5} width={96} height={96} />
              </div>
            </div>
          </ComponentBlock>

          {/* GedungRektoratUI */}
          <ComponentBlock name="GedungRektoratUI">
            <GedungRektoratUI width={280} height={180} />
          </ComponentBlock>

          {/* DiamondIcon */}
          <ComponentBlock name="DiamondIcon">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex flex-col items-center gap-1">
                <DiamondIcon size={12} />
                <span className="text-white/40 text-[10px]">12px</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <DiamondIcon size={16} />
                <span className="text-white/40 text-[10px]">16px</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <DiamondIcon size={20} />
                <span className="text-white/40 text-[10px]">20px</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <DiamondIcon size={28} />
                <span className="text-white/40 text-[10px]">28px</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <DiamondIcon size={20} filled />
                <span className="text-white/40 text-[10px]">filled</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <DiamondIcon size={20} color="#ddc446" />
                <span className="text-white/40 text-[10px]">gold</span>
              </div>
            </div>
          </ComponentBlock>

          {/* Union */}
          <ComponentBlock name="Union (ornamen pink outline)">
            <Union width={90} height={90} />
          </ComponentBlock>

          {/* Awan */}
          <ComponentBlock name="Awan — cloud dekoratif (variant 1 & 2)" fullWidth>
            <div className="flex flex-col gap-6 items-start">
              <div>
                <p className="text-white/40 text-[10px] font-mono mb-2">variant=&quot;1&quot; — wide fluffy</p>
                <Awan variant="1" width={320} height={90} />
              </div>
              <div>
                <p className="text-white/40 text-[10px] font-mono mb-2">variant=&quot;2&quot; — rounded fog</p>
                <Awan variant="2" width={240} height={120} />
              </div>
            </div>
          </ComponentBlock>

          {/* BalonUdara */}
          <ComponentBlock name="BalonUdara — balon udara SPT 2026">
            <div className="flex gap-6 items-end">
              <div className="flex flex-col items-center gap-2">
                <BalonUdara width={80} height={100} />
                <span className="text-white/40 text-[10px]">sm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BalonUdara width={120} height={150} />
                <span className="text-white/40 text-[10px]">md</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BalonUdara width={160} height={200} />
                <span className="text-white/40 text-[10px]">lg</span>
              </div>
            </div>
          </ComponentBlock>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — MOLECULES
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="molecules" className="scroll-mt-16">

        {/* DSNavbar — full width above section */}
        <div className="px-20 pt-8 pb-4 max-w-screen-xl mx-auto">
          <h2 className="text-h2 text-white font-extrabold mb-6">Molecules</h2>
          <SectionLabel name="DSNavbar — preview (non-fixed)" />
        </div>
        <div className="relative h-24 border-y border-primary-300/30 overflow-hidden mb-2" aria-label="Navbar preview">
          <div
            className="w-full border-b border-primary-300 flex justify-between items-center px-8 py-3"
            style={{ backgroundImage: 'var(--gradient-navbar)' }}
          >
            <div className="flex items-center gap-3">
              <LogoSPT size="sm" showText={false} />
              <span className="text-white font-extrabold tracking-widest text-m3">S P T <span className="text-xs">BEM UI</span></span>
            </div>
            <div className="flex gap-6 items-center">
              {[{ href: '/', label: 'Home' }, { href: '/event', label: 'Events' }, { href: '/about', label: 'Tentang' }].map((item) => (
                <span key={item.href} className="flex items-center gap-1.5 text-m3 text-white font-jakarta cursor-pointer hover:underline">
                  <DiamondIcon size={14} />
                  {item.label}
                </span>
              ))}
              <DSButton variant="signin" size="sm">Sign In</DSButton>
            </div>
          </div>
        </div>

        <div className="px-20 py-8 max-w-screen-xl mx-auto space-y-10">

          {/* DSTabs */}
          <ComponentBlock name="DSTabs" fullWidth>
            <DSTabs
              tabs={[
                { id: 'overview',  label: 'Overview' },
                { id: 'divisi',    label: 'Divisi' },
                { id: 'timeline',  label: 'Timeline' },
                { id: 'dokumen',   label: 'Dokumen' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <p className="text-primary-100/50 text-p4 mt-3 font-jakarta">Tab aktif: <strong className="text-white">{activeTab}</strong></p>
          </ComponentBlock>

          {/* SearchBar */}
          <ComponentBlock name="SearchBar" fullWidth>
            <SearchBar
              value={searchVal}
              onChange={setSearchVal}
              onClear={() => setSearchVal('')}
              placeholder="Cari event rekrutmen..."
            />
            {searchVal && (
              <p className="text-primary-100/50 text-p4 mt-2 font-jakarta">Query: &ldquo;{searchVal}&rdquo;</p>
            )}
          </ComponentBlock>

          {/* DSFilterCard */}
          <div>
            <SectionLabel name="DSFilterCard" />
            <div className="w-[280px]">
              <DSFilterCard
                values={filterValues}
                onChange={setFilterValues}
              />
            </div>
          </div>

          {/* DSEventCard */}
          <div>
            <SectionLabel name="DSEventCard" />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <DSEventCard
                event={{
                  id: '1',
                  title: 'Rekrutmen Staff BEM UI 2026',
                  organizer: 'BEM UI',
                  status: 'active',
                  startedAt: new Date('2026-06-01'),
                  closedAt: new Date('2026-06-30'),
                  description: 'Bergabunglah bersama kami dalam perjalanan membangun BEM UI yang lebih baik.',
                  divisions: ['Developer', 'Designer', 'Marketing'],
                }}
                onRegister={(id) => alert(`Daftar event ${id}`)}
                onDetail={(id) => alert(`Detail event ${id}`)}
              />
              <DSEventCard
                event={{
                  id: '2',
                  title: 'Rekrutmen Panitia COMPFEST',
                  organizer: 'COMPFEST',
                  status: 'closed',
                  startedAt: new Date('2026-05-01'),
                  closedAt: new Date('2026-05-15'),
                  description: 'COMPFEST adalah acara nasional teknologi terbesar yang diselenggarakan Fasilkom UI.',
                  divisions: ['Divisi A', 'Divisi B'],
                }}
                onDetail={(id) => alert(`Detail event ${id}`)}
              />
            </div>
          </div>

        </div>

        {/* DSFooter — full width below section */}
        <div className="px-20 pb-2 max-w-screen-xl mx-auto">
          <SectionLabel name="DSFooter — preview" />
        </div>
        <div className="border-t border-primary-300/30">
          <DSFooter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — ORGANISMS
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="organisms" className="px-20 py-16 max-w-screen-xl mx-auto scroll-mt-16 space-y-12">
        <h2 className="text-h2 text-white font-extrabold">Organisms</h2>

        {/* EventGrid + FilterPanel — 2 column layout */}
        <div>
          <SectionLabel name="FilterPanel + EventGrid — 2 kolom layout" />
          <div className="flex gap-6 items-start">
            {/* Left: FilterPanel 280px */}
            <div className="w-[280px] shrink-0">
              <FilterPanel
                initialFilters={{ Universitas: true, UKM: false }}
                onFilterChange={(f) => console.log('filter:', f)}
              />
            </div>
            {/* Right: EventGrid flex-1 */}
            <div className="flex-1 min-w-0">
              <EventGrid
                events={mockEvents}
                onRegister={(id) => alert(`Daftar ${id}`)}
                onDetail={(id) => alert(`Detail ${id}`)}
              />
            </div>
          </div>
        </div>

        {/* EventGrid loading state */}
        <div>
          <SectionLabel name="EventGrid — Loading State" />
          <EventGrid events={[]} loading />
        </div>

        {/* EventGrid empty state */}
        <div>
          <SectionLabel name="EventGrid — Empty State" />
          <EventGrid events={[]} />
        </div>

      </section>

    </div>
  );
}
