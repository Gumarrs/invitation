# Kirana Invitation

Marketplace undangan digital premium (frontend saja). Vue 3 + Vite + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + Lucide.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck (vue-tsc) + build produksi
npm run preview
```

## Struktur

```
src/
  data/         categories, themes, templates (23), testimonials, faqs
  components/   Navbar, HeroSection, CategorySection, ThemeSection, TemplateCard,
                TemplateGrid, FilterSidebar, PreviewModal, HowItWorks,
                ShowcaseSection, CTASection, Footer, FaqSection, FeaturedSection,
                OrnamentArt (SVG motif), InvitationMockup (pratinjau undangan)
  composables/  useCatalogFilters (filter di query URL), usePreview, useScrolled, useGsapContext
  directives/   v-magnetic, v-tilt
  lib/          gsap (registrasi plugin), reveal (data-reveal / data-split / data-mask / data-parallax)
  views/        HomeView, CatalogView, TemplateDetailView, DemoView
```

## Demo tema & kategori

- `/demo/tema/:id` (11 tema) dan `/demo/kategori/:id` (7 kategori), mis. `/demo/tema/jawa`, `/demo/kategori/birthday`.
- Demo tema bisa dicoba dengan jenis acara lain lewat `?category=`, demo kategori dengan tema lain lewat `?theme=`
  (ada pilihan chip di panel kiri).
- Isi demo: cover "Buka Undangan", sapaan khas tema, countdown, jadwal, salin alamat, simpan ke kalender (.ics),
  galeri SVG, RSVP (validasi + daftar ucapan, hanya di memori), dan QR contoh untuk kategori Corporate.
- Konten ada di `src/data/demos.ts`; halamannya `src/views/DemoView.vue`.

## Catatan teknis

- Tidak ada gambar eksternal: seluruh visual adalah SVG + CSS (`OrnamentArt`, `InvitationMockup`).
- Filter katalog disimpan di URL (`/katalog?category=wedding&theme=jawa&price=100-200&sort=price-asc&q=...`),
  sehingga tautan dari Kategori dan Tema langsung memfilter katalog.
- Animasi hanya memakai `transform`/`opacity`/`clip-path`. Semua tween dibuat di dalam `gsap.context`
  dan dibersihkan saat unmount. Tween idle hero dijeda saat hero keluar layar.
- `prefers-reduced-motion`: elemen tidak disembunyikan dan GSAP tidak dijalankan.
- Showcase horizontal di-pin hanya di layar ≥1024px; di mobile berupa swipe native.
- Tautan sosial di footer hanya dekoratif (demo) dan diberi label demikian.
