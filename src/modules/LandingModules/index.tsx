import Hero from "./section/Hero";
import About from "./section/About";
import HowTo from "./section/HowTo";
import ContactPerson from "@/components/elements/ContactPerson";
import Partners from "./section/Partners";

const LandingModules = () => {
  return (
    <main className="flex flex-col gap-20 pb-20">
      <Hero />
      <About />
      <HowTo />
      <Partners />
      <div className="px-12 max-lg:px-10 max-md:px-8">
        <ContactPerson
          title="Contact Person"
          description="Reach out to our team for questions or support."
          contact={[
            {
              name: "Fauzan",
              method: "Line",
              link: "https://google2.com",
            },
            {
              name: "Fauzan2",
              method: "Line",
              link: "https://google.com",
            },
          ]}
        />
      </div>
    </main>
  );
};
export default LandingModules;
