import { cn } from '@/lib/utils';
import './spin-animation.css';

export interface AnimatedSptPatternProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function AnimatedSptPattern({
  className,
  width = 342,
  height = 344,
}: AnimatedSptPatternProps) {
  return (
    <svg
      className={cn('animated-propellers pointer-events-none select-none', className)}
      viewBox="0 0 342 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      aria-hidden="true"
      style={{ width, height, maxWidth: 'none', flexShrink: 0 }}
    >
      <defs>
        <filter id="spt-blur" x="0" y="0" width="342" height="344" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0" result="effect1_foregroundBlur" />
        </filter>
      </defs>

      <g
        className="propeller-spin spin-slow"
        style={{ transformOrigin: '171px 172px' }}
        filter="url(#spt-blur)"
      >
        <g className="propeller" data-index="1">
          <path
            className="propeller-blade"
            strokeWidth="6.64887"
            d="M12.6383 193.916C69.9465 140.028 91.2205 116.9 130.884 121.994C126.363 106.627 123.137 63.3453 146.4 13.1624C181.601 58.347 227.489 79.6219 218.451 132.995C233.07 128.014 275.564 124.07 328.583 148.138C294.67 180.322 256.85 225.387 208.398 220.228C213.057 233.017 216.551 272.907 193.251 330.15C150.04 279.411 117.011 257.44 122.869 209.234C108.224 214.686 65.6756 219.254 12.6383 193.916Z"
          />
          <path
            className="propeller-blade"
            strokeWidth="6.64887"
            d="M146.4 13.1624C168.652 50.445 162.687 89.005 150.329 126.233C143.301 124.181 136.882 122.765 130.884 121.994C91.2205 116.9 69.9465 140.028 12.6383 193.916C25.1368 181.318 65.2045 163.95 125.487 195.253C124.272 200.163 123.407 204.809 122.869 209.234C117.011 257.44 150.04 279.411 193.251 330.15C178.704 313.069 174.098 299.9 179.074 266.294C181.499 249.913 187.016 235.543 193.792 217.19C198.768 218.728 203.634 219.721 208.398 220.228C256.85 225.387 294.67 180.322 328.583 148.138C316.556 159.552 277.018 175.583 215.079 148.399C215.923 144.865 216.761 141.208 217.59 137.42C217.919 135.92 218.205 134.446 218.451 132.995C227.489 79.6219 181.601 58.347 146.4 13.1624Z"
          />
          <circle
            className="propeller-dot"
            cx="89.9122"
            cy="96.2387"
            r="16.588"
            strokeWidth="6.64887"
            transform="rotate(-0.844222 89.9122 96.2387)"
          />
          <circle
            className="propeller-dot"
            cx="249.551"
            cy="246.372"
            r="16.588"
            strokeWidth="6.64887"
            transform="rotate(-0.844222 249.551 246.372)"
          />
        </g>
      </g>
    </svg>
  );
}
