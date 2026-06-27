import { useId } from "react";

export const AirBalloon = ({
  className = "w-full h-full shrink-0",
  ...props
}) => {
  const filterId = useId();
  return (
    <svg
      className={className}
      {...props}
      viewBox="0 0 230 329"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={`url(#${filterId})`}>
        <path
          d="M113.945 6.60008C2.12184 61.8085 114.108 227.388 114.108 227.388C114.108 227.388 65.2018 81.8844 113.945 6.60008Z"
          fill="#324173"
        />
        <path
          d="M114.269 6.60008C114.161 6.59985 114.053 6.60008 113.945 6.60008C65.2018 81.8844 114.108 227.388 114.108 227.388L114.123 227.388C115.086 224.458 161.794 81.1281 114.269 6.60008Z"
          fill="#475CA3"
        />
        <path
          d="M114.269 6.60008C161.794 81.1281 115.086 224.458 114.123 227.388L114.138 227.388C116.209 224.26 223.367 61.2894 114.269 6.60008Z"
          fill="#324173"
        />
        <path
          d="M114.269 6.60008C223.367 61.2894 116.209 224.26 114.138 227.388L114.161 227.388C150.399 195.784 271.661 49.6082 114.269 6.60008Z"
          fill="#475CA3"
        />
        <path
          d="M211.215 127.722C233.402 89.7814 206.869 6.79447 114.269 6.60008C271.661 49.6082 150.399 195.784 114.161 227.388L140.077 227.343C149.048 208.996 189.003 165.707 211.215 127.722Z"
          fill="#324173"
        />
        <path
          d="M114.108 227.388C77.3877 195.886 -45.905 49.6197 113.945 6.60008C2.12184 61.8085 114.108 227.388 114.108 227.388Z"
          fill="#475CA3"
        />
        <path
          d="M113.945 6.60008C22.2442 6.60008 -4.04209 89.7713 17.8922 127.772C39.8265 165.773 79.2807 209.08 88.1391 227.434L114.108 227.388C77.3877 195.886 -45.905 49.6197 113.945 6.60008Z"
          fill="#324173"
        />
        <path
          d="M136.447 238.81L135.721 265.328H138.626L139.639 238.81H136.447Z"
          fill="#324173"
        />
        <path
          d="M92.4409 265.435L91.7241 238.906H88.5719L89.5728 265.435H92.4409Z"
          fill="#324173"
        />
        <path
          d="M89.5728 265.435H83.8382C83.8382 284.076 88.1391 313.6 101.042 313.6H113.945L127.011 313.473C140.077 313.473 144.433 283.962 144.433 265.328H138.626H135.721H113.945L92.4409 265.435H89.5728Z"
          fill="#1D2642"
        />
        <path
          d="M91.7241 238.906L113.945 238.81H136.447H139.639L140.077 227.343L114.161 227.388L114.108 227.434L114.123 227.388L114.108 227.388L88.1391 227.434L88.5719 238.906H91.7241Z"
          fill="#1D2642"
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x="9.72748e-05"
          y="-2.47955e-05"
          width="229.2"
          height="328.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5.3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_333_1519"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_333_1519"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
