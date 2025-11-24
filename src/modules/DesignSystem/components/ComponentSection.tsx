import { Diamond, Palette, Layout, Type, MousePointer } from "lucide-react";

interface ComponentSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export default function ComponentSection({
  title,
  description,
  icon: Icon,
  children,
}: ComponentSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-300/20 rounded-lg">
          <Icon className="w-6 h-6 text-primary-100" />
        </div>
        <div>
          <h2 className="text-h3  font-jakarta">{title}</h2>
          <p className="text-p5 text-neutral-300">{description}</p>
        </div>
      </div>
      <div className="bg-neutral-100/5 rounded-xl p-6 border border-neutral-100/10">
        {children}
      </div>
    </section>
  );
}
