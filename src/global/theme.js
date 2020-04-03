// The base value that every setting is calculated from
const baseValue = 8;

// grid settings
const columns = 12;
const columnWidth = baseValue * 10; // 80
const gutterWidth = baseValue * 3; // 24
const gridWidth = columnWidth * columns + gutterWidth * (columns - 1); // 1224

// default breakpoints, based off of common devices sizes
const breakPoints = [320, 375, 480, 667, 768, 960, 1024, 1440, 1950];

// 8, 16, 24, 32, 40, 48, 56, 64, 72
const fontSizes = Array.from(
  { length: baseValue + 1 },
  (x, i) => (i + 1) * baseValue
);

// 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128
const spacing = Array.from(
  { length: baseValue * 2 },
  (x, i) => (i + 1) * baseValue
);

// setting up our size shorthands
const sizing = Array.from({ length: baseValue + 1 }, (x, i) => ({
  bp: breakPoints[i],
  fs: fontSizes[i],
  lh: fontSizes[i] * 1.5,
  sp: spacing[i]
}));

export default {
  color: {
    black: '#000000',
    blue: '#4287f5',
    green: '#54ff05',
    grey: '#3C3C3C',
    orange: '#F7821B',
    white: '#FFFFFF',
    yellow: '#e1ad01'
  },
  easing: {
    easeIn: 'cubic-bezier(0.08, 0.02, 0.06, 1)'
  },
  fontFamily: {
    poppins: 'Poppins, sans-serif'
  },
  fontSize: {
    h1: '64px',
    h2: '42px',
    h3: '21px',
    h4: '16px',
    h5: '14px',
    h6: '12px',
    label: '16px',
    p: '16px'
  },
  fontStyle: {
    inherit: 'inherit',
    italic: 'italic',
    normal: 'normal',
    oblique: 'oblique'
  },
  fontWeight: {
    black: '900',
    bold: '700',
    extraBold: '800',
    extraLight: '200',
    inherit: 'inherit',
    light: '300',
    medium: '500',
    regular: '400',
    thin: '100'
  },
  grid: {
    columnWidth: columnWidth, // 80
    gutterWidth: gutterWidth, // 24
    maxWidth: gridWidth, // 1224
    outerSpacing: baseValue * 3, // 24
    sectionSpacing: baseValue * 15, // 120
    totalColumns: columns
  },
  letterSpacing: {
    h1: '0',
    h2: '0',
    h3: '0',
    h4: '0',
    h5: '0',
    h6: '4.5px',
    label: '2.0px',
    p: '0'
  },
  lineHeight: {
    h1: '64px',
    h2: '41px',
    h3: '32px',
    h4: '16px',
    h5: '14px',
    label: '16px',
    p: '32px'
  },
  size: {
    lg: sizing[5],
    md: sizing[4],
    sm: sizing[3],
    xl: sizing[6],
    xs: sizing[2],
    xxl: sizing[7],
    xxs: sizing[1],
    xxxl: sizing[8],
    xxxs: sizing[0]
  },
  textTransform: {
    h1: 'none',
    h2: 'none',
    h3: 'none',
    h4: 'none',
    h5: 'uppercase',
    h6: 'uppercase',
    label: 'uppercase',
    p: 'none'
  }
};
