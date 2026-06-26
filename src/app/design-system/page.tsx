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
  DSFilterCard,
  DSTabs,
  DSEventCard,
  SearchBar,
  EventGrid,
  FilterPanel,
  type EventData,
} from '@/design-system';

const sampleEvents: EventData[] = [
  {
    id: '1',
    title: 'BEM UI Open Recruitment 2026',
    organizer: 'BEM UI',
    status: 'open',
    startedAt: new Date('2026-07-01'),
    closedAt: new Date('2026-07-31'),
    description: 'Bergabunglah bersama kami dalam perjalanan membangun BEM UI yang lebih baik. Terbuka untuk seluruh mahasiswa UI.',
    divisions: ['Multimedia', 'Akademik', 'PSDM', 'Sosmas'],
  },
  {
    id: '2',
    title: 'Panitia Festival UI 2026',
    organizer: 'BEM UI',
    status: 'closed',
    startedAt: new Date('2026-06-01'),
    closedAt: new Date('2026-06-15'),
    description: 'Festival tahunan terbesar UI. Daftarkan dirimu sebagai panitia.',
    divisions: ['Acara', 'Logistik', 'Kreatif'],
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
];

export default function DesignSystemPage() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [inputVal, setInputVal] = useState('');
  const [dropVal, setDropVal] = useState('');
  const [activeTab, setActiveTab] = useState('atoms');
  const [searchVal, setSearchVal] = useState('');

  return (
    <div
      className="min-h-screen pt-32 pb-20 font-jakarta"
      style={{ backgroundImage: 'var(--gradient-page)' }}
    >
      {/* Header */}
      <header className="text-center py-12 border-b border-primary-300 mb-16 px-8">
        <HighlightText textSize="h1">Design System</HighlightText>
        <p className="text-white/60 text-p2 mt-4">SPT BEM UI 2026 — Komponen Lengkap</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-20">

        {/* ===== TOKENS ===== */}
        <section>
          <h2 className="text-h2 text-white font-extrabold mb-8">Design Tokens</h2>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="text-h4 text-white font-extrabold mb-4">Warna Utama</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Marun', bg: '#5e121c' },
                { name: 'Primary-500', bg: '#1d2642' },
                { name: 'Primary-300', bg: '#475ca3' },
                { name: 'Primary-100', bg: 'rgba(156,179,211,1)' },
                { name: 'Secondary-300', bg: '#ddc446' },
                { name: 'Pink Light', bg: '#ffced8' },
                { name: 'Status Success', bg: '#20b80b' },
                { name: 'Status Danger', bg: '#d01515' },
              ].map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1">
                  <div className="w-16 h-16 rounded-[12px] border border-white/20" style={{ background: c.bg }} />
                  <span className="text-white text-p4 font-jakarta text-center text-xs">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradients */}
          <div>
            <h3 className="text-h4 text-white font-extrabold mb-4">Gradients</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Navbar', style: 'var(--gradient-navbar)' },
                { name: 'Card Blue', style: 'var(--gradient-card-blue)' },
                { name: 'Footer', style: 'var(--gradient-footer-ds)' },
                { name: 'Btn 1 (Primary)', style: 'var(--gradient-btn-1)' },
                { name: 'Btn 3 (External)', style: 'var(--gradient-btn-3)' },
                { name: 'Page', style: 'var(--gradient-page)' },
                { name: 'Highlight', style: 'var(--gradient-highlight)' },
              ].map((g) => (
                <div key={g.name} className="flex flex-col items-center gap-1">
                  <div className="w-24 h-12 rounded-[12px] border border-white/20" style={{ backgroundImage: g.style }} />
                  <span className="text-white text-xs font-jakarta text-center">{g.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ATOMS ===== */}
        <section>
          <h2 className="text-h2 text-white font-extrabold mb-8">Atoms</h2>

          {/* Buttons */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Button (4 variants)</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <DSButton variant="primary" size="md">Primary Button</DSButton>
              <DSButton variant="secondary" size="md">Secondary Button</DSButton>
              <DSButton variant="external" size="md">Selengkapnya</DSButton>
              <DSButton variant="signin" size="md">Sign In</DSButton>
              <DSButton variant="primary" size="sm">Small</DSButton>
              <DSButton variant="primary" size="lg">Large</DSButton>
              <DSButton variant="primary" size="md" loading>Loading</DSButton>
              <DSButton variant="primary" size="md" disabled>Disabled</DSButton>
            </div>
          </div>

          {/* GlassCard */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">GlassCard</h3>
            <GlassCard className="max-w-sm">
              <p className="text-white font-jakarta">Glass card dengan gradient biru dan shadow putih.</p>
            </GlassCard>
          </div>

          {/* TextBox */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">TextBox</h3>
            <TextBox className="max-w-sm">
              <p className="text-white font-jakarta text-p3">Dark glass card dengan border pink dan backdrop-blur 47.5px</p>
            </TextBox>
          </div>

          {/* HighlightText */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">HighlightText</h3>
            <div className="flex flex-col gap-3 items-start">
              <HighlightText textSize="h1">Heading H1</HighlightText>
              <HighlightText textSize="h2">Heading H2</HighlightText>
              <HighlightText textSize="h3">Heading H3</HighlightText>
            </div>
          </div>

          {/* Badge */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Badge (status)</h3>
            <div className="flex flex-wrap gap-3">
              <Badge status="open" />
              <Badge status="active" />
              <Badge status="closed" />
              <Badge status="draft" />
              <Badge status="open" label="Custom Label" />
            </div>
          </div>

          {/* Checkbox */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Checkbox</h3>
            <div className="flex flex-col gap-3">
              {['Universitas', 'Pra-Kampus', 'UKM'].map((opt) => (
                <DSCheckbox
                  key={opt}
                  label={opt}
                  checked={!!checkedState[opt]}
                  onChange={(v) => setCheckedState((prev) => ({ ...prev, [opt]: v }))}
                />
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Input</h3>
            <div className="max-w-sm space-y-4">
              <DSInput
                label="Nama Lengkap"
                placeholder="Masukkan nama..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                required
              />
              <DSInput label="Email" type="email" placeholder="user@example.com" />
              <DSInput label="Error state" placeholder="..." error="Field ini wajib diisi" />
            </div>
          </div>

          {/* Dropdown */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Dropdown</h3>
            <div className="max-w-sm">
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
            </div>
          </div>

          {/* LogoSPT */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">LogoSPT</h3>
            <div className="flex gap-8 items-end">
              <LogoSPT size="sm" showText />
              <LogoSPT size="md" showText />
              <LogoSPT size="lg" showText />
              <LogoSPT size="md" showText={false} />
            </div>
          </div>

          {/* DiamondIcon */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">DiamondIcon</h3>
            <div className="flex gap-4 items-center">
              <DiamondIcon size={16} />
              <DiamondIcon size={20} />
              <DiamondIcon size={28} />
              <DiamondIcon size={20} filled />
              <DiamondIcon size={20} color="#ddc446" />
            </div>
          </div>

          {/* LogoBackground */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">LogoBackground</h3>
            <div className="flex gap-6">
              <div className="relative w-32 h-32 rounded-[12px] overflow-hidden border border-primary-300 bg-primary-500/30">
                <LogoBackground variant="single" opacity={0.6} width={128} height={128} />
              </div>
              <div className="relative w-32 h-32 rounded-[12px] overflow-hidden border border-primary-300 bg-primary-500/30">
                <LogoBackground variant="pattern" opacity={0.4} width={128} height={128} />
              </div>
            </div>
          </div>

          {/* GedungRektoratUI */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">GedungRektoratUI</h3>
            <GedungRektoratUI width={300} height={200} />
          </div>

          {/* Union */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Union (ornamen)</h3>
            <Union width={100} height={100} />
          </div>
        </section>

        {/* ===== MOLECULES ===== */}
        <section>
          <h2 className="text-h2 text-white font-extrabold mb-8">Molecules</h2>

          {/* Tabs */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">Tabs</h3>
            <DSTabs
              tabs={[
                { id: 'atoms',     label: 'Atoms' },
                { id: 'molecules', label: 'Molecules' },
                { id: 'organisms', label: 'Organisms' },
                { id: 'tokens',    label: 'Tokens' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <p className="text-white/60 mt-3 font-jakarta text-p4">Tab aktif: {activeTab}</p>
          </div>

          {/* SearchBar */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">SearchBar</h3>
            <SearchBar
              value={searchVal}
              onChange={setSearchVal}
              onClear={() => setSearchVal('')}
              className="max-w-md"
            />
          </div>

          {/* FilterCard */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">FilterCard</h3>
            <DSFilterCard
              values={checkedState}
              onChange={setCheckedState}
              className="max-w-sm"
            />
          </div>

          {/* EventCard */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">EventCard</h3>
            <div className="space-y-4 max-w-3xl">
              {sampleEvents.map((event) => (
                <DSEventCard
                  key={event.id}
                  event={event}
                  onRegister={(id) => alert(`Daftar event ${id}`)}
                  onDetail={(id) => alert(`Detail event ${id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== ORGANISMS ===== */}
        <section>
          <h2 className="text-h2 text-white font-extrabold mb-8">Organisms</h2>

          {/* EventGrid */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">EventGrid</h3>
            <EventGrid events={sampleEvents} onDetail={(id) => alert(`Detail ${id}`)} />
          </div>

          {/* EventGrid loading */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">EventGrid — Loading State</h3>
            <EventGrid events={[]} loading className="max-w-3xl" />
          </div>

          {/* EventGrid empty */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">EventGrid — Empty State</h3>
            <EventGrid events={[]} />
          </div>

          {/* FilterPanel */}
          <div className="mb-10">
            <h3 className="text-h4 text-white font-extrabold mb-4">FilterPanel (dengan active chips)</h3>
            <FilterPanel
              initialFilters={{ Universitas: true, UKM: true }}
              onFilterChange={(f) => console.log('Filter changed:', f)}
              className="max-w-sm"
            />
          </div>
        </section>

        {/* ===== NAVBAR & FOOTER Preview ===== */}
        <section>
          <h2 className="text-h2 text-white font-extrabold mb-8">Navbar & Footer (DS variants)</h2>
          <p className="text-white/60 font-jakarta text-p3 mb-6">
            DSNavbar dan DSFooter dari design-system tersedia untuk dipakai di halaman baru. Navbar aktif di atas halaman ini adalah komponen existing (bukan DS).
          </p>
          <div className="border border-primary-300 rounded-[12px] overflow-hidden">
            <DSNavbar
              navLinks={[
                { href: '/', label: 'Home' },
                { href: '/event', label: 'Recruitment' },
                { href: '/design-system', label: 'Design System' },
              ]}
            />
          </div>
          <div className="mt-6 border border-primary-300 rounded-[12px] overflow-hidden">
            <DSFooter />
          </div>
        </section>

      </main>
    </div>
  );
}
