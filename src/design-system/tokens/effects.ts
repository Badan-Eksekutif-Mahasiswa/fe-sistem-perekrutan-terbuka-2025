export const gradients = {
  navbar:    'linear-gradient(66.6deg, rgba(95,19,29,0.49) 20.4%, rgb(95,19,29) 43.3%, rgba(95,19,29,0.35) 125.8%)',
  cardBlue:  'linear-gradient(180deg, rgba(156,179,211,0.5) 0%, rgba(72,85,115,0.5) 49.24%, rgba(11,16,45,0.5) 99.94%)',
  footer:    'linear-gradient(180deg, rgba(11,16,45,0.5) 0%, rgba(72,85,115,0.5) 50.76%, rgba(156,179,211,0.5) 99.94%)',
  btn1:      'linear-gradient(156.6deg, rgba(156,179,211,1) 31.8%, rgb(28,38,93) 71.9%)',
  btn3:      'linear-gradient(90deg, rgb(255,206,216) 27.3%, rgb(231,186,195) 56.3%, rgb(203,164,172) 88.7%, rgb(153,124,130) 148.8%)',
  page:      'linear-gradient(to bottom, #1d2642, #0a0d17)',
  highlight: 'linear-gradient(to right, rgba(95,19,29,0) 0%, #5f131d 49.6%, rgba(95,19,29,0) 117.4%)',
  primary:   'linear-gradient(to right, rgba(111,130,192,0.8), rgba(50,65,115,0.8))',
  secondary: 'linear-gradient(to right, #e5d16e, #ad9a37)',
} as const;

export const shadows = {
  btn:       '0px 4px 3px rgba(0,0,0,0.1), 0px 10px 7.5px rgba(0,0,0,0.1)',
  large:     '0px 4px 6px rgba(0,0,0,0.1), 0px 10px 15px rgba(0,0,0,0.1)',
  card:      '0px 10px 50px 0px rgba(0,0,0,0.3)',
  glassCard: '0px 2px 7px 0px rgba(255,255,255,0.15)',
  inner:     '-2px -2px 9px rgba(0,0,0,0.5), 2px 2px 9px rgba(0,0,0,0.5)',
  textbox:   '0px 3.857px 19.284px rgba(0,0,0,0.5)',
} as const;

export const borderRadius = {
  btn:     '12px',
  card:    '12px',
  navbar:  '48px',
  textbox: '38.567px',
} as const;

export const blur = {
  glass:   '10px',
  textbox: '47.5px',
} as const;
