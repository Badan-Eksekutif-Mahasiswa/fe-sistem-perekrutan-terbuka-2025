import FilterCard from "./components/FilterCard";
import { FilterCategory } from "./const";

const PendaftaranModule = () => {
  return (
    <main className="min-h-screen mt-32">
      <div className="py-10 px-20 text-center gap-5 justify-center text-white flex flex-col">
        <h1 className="text-h1">Cari Lowongan</h1>
        <p className="text-p6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          dicta vero dolorem eligendi sunt vitae facilis, maxime quae
          exercitationem praesentium incidunt quia illo nisi, voluptates
          aspernatur fugiat culpa repellendus non.
        </p>
        <div className="flex flex-row ">
          <FilterCard filterCategory={FilterCategory} />
        </div>
      </div>
    </main>
  );
};

export default PendaftaranModule;
