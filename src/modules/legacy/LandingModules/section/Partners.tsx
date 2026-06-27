import Image from "next/image";

const Partners = () => {
  const data = [
    { link: "/partners/semarak.png" },
    { link: "/partners/uiartx.png" },
    { link: "/partners/semarak.png" },
    { link: "/partners/uiartx.png" },
    { link: "/partners/semarak.png" },
    { link: "/partners/uiartx.png" },
    { link: "/partners/semarak.png" },
    { link: "/partners/uiartx.png" },
    { link: "/partners/semarak.png" },
    { link: "/partners/uiartx.png" },
  ];

  const firstRowData = data.slice(0, 5);
  const secondRowData = data.slice(5, 10);

  return (
    <div className="flex flex-col gap-10 md:gap-20 items-center py-16 px-6 md:px-20">
      <h1 className="text-center text-h1  font-bold leading-[110%] md:leading-[140%] text-neutral-50 font-jakarta ">
        Program BEM UI
      </h1>
      <div className="flex overflow-hidden">
        <div className="flex animate-infinite-scroll-1 flex-nowrap items-center">
          {firstRowData.map((item, idx) => (
            <Image
              key={idx}
              alt="Partner Logo"
              src={item.link}
              width={160}
              height={160}
              className="mr-8 h-auto w-24 max-w-none lg:mr-16 lg:w-40"
            />
          ))}
        </div>
        <div
          className="flex animate-infinite-scroll-1 flex-nowrap items-center"
          aria-hidden="true"
        >
          {firstRowData.map((item, idx) => (
            <Image
              key={`duplicate-${idx}`}
              alt="Partner Logo"
              src={item.link}
              width={160}
              height={160}
              className="mr-8 h-auto w-24 max-w-none lg:mr-16 lg:w-40"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row-reverse overflow-hidden">
        <div className="flex animate-infinite-scroll-2 flex-nowrap items-center">
          {secondRowData.map((item, idx) => (
            <Image
              key={idx}
              alt="Partner Logo"
              src={item.link}
              width={160}
              height={160}
              className="mr-8 h-auto w-24 max-w-none lg:mr-16 lg:w-40"
            />
          ))}
        </div>
        <div
          className="flex animate-infinite-scroll-2 flex-nowrap items-center"
          aria-hidden="true"
        >
          {secondRowData.map((item, idx) => (
            <Image
              key={`duplicate-${idx}`}
              alt="Partner Logo"
              src={item.link}
              width={160}
              height={160}
              className="mr-8 h-auto w-24 max-w-none lg:mr-16 lg:w-40"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Partners;
