import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <p className="text-secondary-500  font-jakarta">Hello SPT</p>
      <div className="px-6">
        <Input placeholder="Placeholder" />
      </div>
    </>
  );
}
