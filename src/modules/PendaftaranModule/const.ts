const FilterCategory = [
  {
    type: "Tingkat",
    categories: ["Universitas", "Pra-Kampus"],
  },
  {
    type: "Tipe",
    categories: ["Kepanitiaan", "Organisasi", "UKM"],
  },
  {
    type: "Status",
    categories: ["Umum", "Tertutup", "Khusus"],
  },
];

const Events = [
  {
    title: "Staff Semarak Apresiasi",
    logo: "/placeholders/logo-event.webp",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis minus quis aperiam at error ducimus eveniet nemo optio illo. Tempora et corrupti eius reiciendis recusandae laudantium dolores possimus iusto dolore?",
    status: "Dibuka",
    startedAt: new Date("2025-08-11"),
    closedAt: new Date("2025-08-21"),
    categories: ["Universitas", "Kepanitiaan", "Umum"],
    isSaved: false,
  },

  {
    title: "Staff Semarak Apresiasi",
    logo: "/placeholders/logo-event.webp",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis minus quis aperiam at error ducimus eveniet nemo optio illo. Tempora et corrupti eius reiciendis recusandae laudantium dolores possimus iusto dolore?",
    status: "Akan Datang",
    startedAt: new Date("2025-08-11"),
    closedAt: new Date("2025-08-21"),
    categories: ["Universitas", "Kepanitiaan", "Umum"],
    isSaved: false,
  },

  {
    title: "Staff Semarak Apresiasi",
    logo: "/placeholders/logo-event.webp",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis minus quis aperiam at error ducimus eveniet nemo optio illo. Tempora et corrupti eius reiciendis recusandae laudantium dolores possimus iusto dolore?",
    status: "Ditutup",
    startedAt: new Date("2025-08-11"),
    closedAt: new Date("2025-08-21"),
    categories: ["Universitas", "Kepanitiaan", "Umum"],
    isSaved: false,
  },
] as const;

export { FilterCategory, Events };
