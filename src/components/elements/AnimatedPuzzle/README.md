# Animated Puzzle Component

A beautiful, customizable animated puzzle component built with React, TypeScript, and CSS animations.

## Features

- ✨ **Clean SVG-based puzzle pieces** with smooth animations
- 🎨 **Fully customizable colors** and theming
- ⚡ **Performant CSS animations** with hardware acceleration
- 📱 **Responsive design** that works on all screen sizes
- 🎭 **Multiple animation modes** (infinite loop, sparkle effects)
- 🔧 **TypeScript support** with comprehensive interfaces
- 🎯 **Zero dependencies** (except React)

## Installation

The component is located in `src/components/elements/AnimatedPuzzle/`

## Usage

### Basic Usage

```tsx
import AnimatedPuzzle from "@/components/elements/AnimatedPuzzle";

export default function MyPage() {
  return (
    <div>
      <AnimatedPuzzle />
    </div>
  );
}
```

### Custom Styling

```tsx
<AnimatedPuzzle
  primaryColor="#f39c12"
  secondaryColor="#e74c3c"
  backgroundGradient={["#2c3e50", "#34495e", "#3b4652"]}
  animationDuration={1.5}
  pieceDelay={0.3}
  showSparkles={true}
  infiniteLoop={true}
/>
```

### Minimal Configuration

```tsx
<AnimatedPuzzle
  primaryColor="#2ecc71"
  secondaryColor="#27ae60"
  showSparkles={false}
  animationDuration={3}
/>
```

## Props

| Prop                 | Type                  | Default                             | Description                                  |
| -------------------- | --------------------- | ----------------------------------- | -------------------------------------------- |
| `width`              | `string \| number`    | `"537"`                             | Width of the puzzle SVG                      |
| `height`             | `string \| number`    | `"1076"`                            | Height of the puzzle SVG                     |
| `animationDuration`  | `number`              | `2`                                 | Animation duration for each piece (seconds)  |
| `pieceDelay`         | `number`              | `0.5`                               | Delay between each piece animation (seconds) |
| `primaryColor`       | `string`              | `"#ffffff"`                         | Primary color for puzzle pieces              |
| `secondaryColor`     | `string`              | `"#64b5f6"`                         | Secondary color for hover/active states      |
| `showSparkles`       | `boolean`             | `true`                              | Whether to show sparkle effect               |
| `backgroundGradient` | `string[]`            | `["#1a1a2e", "#16213e", "#0f3460"]` | Background gradient colors                   |
| `className`          | `string`              | `""`                                | Custom CSS class name                        |
| `infiniteLoop`       | `boolean`             | `true`                              | Whether animation should loop infinitely     |
| `style`              | `React.CSSProperties` | `{}`                                | Custom style object                          |

## Animation Sequence

1. **Puzzle Appear**: Each piece fades in with a scale and translate effect
2. **Path Drawing**: SVG paths are drawn using stroke-dasharray animation
3. **Fill Animation**: Pieces are filled with color after path drawing
4. **Pulse Effect**: Continuous subtle scaling for life-like movement
5. **Hover Effects**: Interactive hover states with glow effects

## Customization

### CSS Custom Properties

The component uses CSS custom properties for dynamic theming:

```css
.animated-puzzle {
  --primary-color: #ffffff;
  --secondary-color: #64b5f6;
  --animation-duration: 2s;
  --piece-delay: 0.5s;
}
```

### Custom Animations

You can extend or override animations by targeting specific classes:

```css
.puzzle-piece.custom-animation {
  animation: myCustomAnimation 3s ease-in-out infinite;
}

@keyframes myCustomAnimation {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 72+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## Performance

- Uses hardware-accelerated CSS transforms
- Optimized SVG paths for smooth rendering
- Minimal JavaScript footprint
- Efficient animation timing functions

## Examples

Check out the demo page at `/puzzle-demo` to see various configurations in action.

## Files Structure

```
src/components/elements/AnimatedPuzzle/
├── index.tsx                 # Main component
├── interface.ts             # TypeScript interfaces
├── puzzle-animation.css     # Animation styles
└── README.md               # Documentation
```

## Contributing

Feel free to contribute improvements, bug fixes, or new features!

## License

This component is part of the SPT Frontend project.
