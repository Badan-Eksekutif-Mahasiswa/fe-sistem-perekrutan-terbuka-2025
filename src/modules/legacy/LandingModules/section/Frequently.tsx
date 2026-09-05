import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FrequentlyAsked = () => {
  return (
    <section className="flex flex-col gap-4 px-12 max-lg:px-10 max-md:px-8">
      <h1 className="text-center text-h1 text-neutral-50 font-jakarta">Frequently Asked Question</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Siapa saja yang bisa mendaftar di SPT?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Seluruh mahasiswa aktif Universitas Indonesia yang terdaftar sebagai Ikatan Keluarga Mahasiswa (IKM UI) dapat mendaftar melalui SPT menggunakan akun SSO UI.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Berapa banyak event yang bisa saya daftarkan sekaligus?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Kamu bisa mendaftar ke lebih dari satu event rekrutmen secara bersamaan, namun setiap event hanya mengizinkan satu pendaftaran per akun.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Apakah saya bisa mengubah pilihan divisi setelah mendaftar?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Pilihan divisi dapat diubah selama status pendaftaranmu masih Draft dan pendaftaran belum disubmit secara resmi.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Bagaimana cara mengetahui hasil seleksi berkas?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Panitia akan mengirimkan informasi hasil seleksi berkas melalui email yang kamu cantumkan saat mendaftar.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Apakah pendaftaran bisa diubah setelah submit?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Setelah pendaftaran disubmit, data tidak bisa diubah lagi oleh pendaftar. Pastikan seluruh data dan link tugas sudah benar sebelum menekan tombol submit.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Di mana saya bisa mendapatkan informasi lebih lanjut?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Informasi lebih lanjut dapat diperoleh melalui akun media sosial resmi BEM UI 2026 atau menghubungi contact person yang tertera di halaman event.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Kenapa tidak bisa login atau muncul pesan masa berlaku akun telah habis?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              SPT menggunakan SSO UI untuk proses login. Jika muncul pesan bahwa masa berlaku akun telah habis atau tidak bisa login, kemungkinan hal ini berkaitan dengan sistem SSO milik UI, bukan SPT. Coba akses layanan lain yang menggunakan SSO UI untuk memastikan akun masih aktif. Jika masalah berlanjut, hubungi pihak UI yang menangani SSO.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>Kenapa link tugas yang sudah diisi tidak tersimpan setelah keluar dari halaman?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Patikan untuk menyimpan perubahan secara berkala. Pada halaman pertama tekan tombol <strong>Lanjut</strong> untuk menyimpan data diri, lalu pada halaman kedua tekan tombol <strong>Simpan Draft</strong> setelah mengisi link tugas agar data tersimpan sebelum keluar dari halaman.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
export default FrequentlyAsked;
