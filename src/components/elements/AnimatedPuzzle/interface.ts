export interface AnimatedPuzzleProps {
  /**
   * Width of the puzzle SVG
   * @default "537"
   */
  width?: string | number;

  /**
   * Height of the puzzle SVG
   * @default "1076"
   */
  height?: string | number;

  /**
   * Animation duration for each puzzle piece (in seconds)
   * @default 2
   */
  animationDuration?: number;

  /**
   * Delay between each piece animation (in seconds)
   * @default 0.5
   */
  pieceDelay?: number;

  /**
   * Primary color for the puzzle pieces
   * @default "#ffffff"
   */
  primaryColor?: string;

  /**
   * Secondary color for hover and active states
   * @default "#64b5f6"
   */
  secondaryColor?: string;

  /**
   * Whether to show the sparkle effect
   * @default true
   */
  showSparkles?: boolean;

  /**
   * Background gradient colors
   * @default ["#1a1a2e", "#16213e", "#0f3460"]
   */
  backgroundGradient?: string[];

  /**
   * CSS class name for custom styling
   */
  className?: string;

  /**
   * Whether the animation should loop infinitely
   * @default true
   */
  infiniteLoop?: boolean;

  /**
   * Enable wave animation effect
   * @default false
   */
  enableWaveEffect?: boolean;

  /**
   * Enable completion glow effect
   * @default false
   */
  enableCompletionEffect?: boolean;

  /**
   * Custom style object
   */
  style?: React.CSSProperties;
}

export interface PuzzlePieceProps {
  /**
   * SVG path data for the puzzle piece
   */
  pathData: string;

  /**
   * Animation delay for this specific piece
   */
  animationDelay: string;

  /**
   * Stroke color for the piece
   */
  strokeColor?: string;

  /**
   * Fill color for the piece
   */
  fillColor?: string;

  /**
   * Stroke width for the piece
   */
  strokeWidth?: string | number;
}
