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
          <AccordionTrigger>Bagaimana cara mengetahui jadwal interview saya?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Jadwal interview dapat dilihat langsung di halaman pendaftaranmu setelah kamu berhasil melakukan booking slot interview.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Apa yang terjadi jika saya tidak menghadiri interview?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Ketidakhadiran tanpa konfirmasi sebelumnya dapat mempengaruhi proses seleksimu. Hubungi panitia terkait jika ada kendala sebelum jadwal interview.
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
      </Accordion>
    </section>
  );
};
export default FrequentlyAsked;
