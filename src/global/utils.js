import { css } from 'styled-components';
import { rgba, stripUnit } from 'polished';
import theme from './theme';

const { grid } = theme;
const { columnWidth, gutterWidth, maxWidth } = grid;

export const sizes = {
  down: {
    lg: 959,
    md: 767,
    sm: 666,
    xl: 1023,
    xs: 479,
    xxl: 1439,
    xxs: 375,
    xxxl: 1949
  },
  up: {
    lg: 960,
    md: 768,
    sm: 667,
    xl: 1024,
    xs: 480,
    xxl: 1440,
    xxs: 376,
    xxxl: 1950
  }
};

export const isPx = value => value.toString().indexOf('px') > -1;

export const toUnitless = value => Number(stripUnit(value));

// use em in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units
// prettier-ignore
export const media = {
  down: Object.keys(sizes.down).reduce((accumulator, label) => {
    const emSize = sizes.down[label] / 16;
    accumulator[label] = (...args) => css`
      @media (max-width: ${emSize}em) {
        ${css(...args)}
      }
    `;
    return accumulator;
  }, {}),
  up: Object.keys(sizes.up).reduce((accumulator, label) => {
    const emSize = sizes.up[label] / 16;
    accumulator[label] = (...args) => css`
      @media (min-width: ${emSize}em) {
        ${css(...args)}
      }
    `;
    return accumulator;
  }, {})
};

/**
 * Based on the number of columns you want, this will determine the pixel size it takes up including the gutters.
 */
export const getColumnSpanSize = columns => {
  const columnTotal = columns * columnWidth;
  const gutterCount = Math.round(columns) - 1;
  // allowing for 1 or a fraction of a 1 column
  const gutterTotal = gutterCount >= 1 ? gutterCount * gutterWidth : 0;
  return columnTotal + gutterTotal;
};

/**
 * Returns a percentage based value for setting horizontal based css rules.
 */
export const getPercentValue = (size, container = maxWidth) => {
  const value = isPx(size) ? toUnitless(size) : size;
  return `${(value / container) * 100}%`;
};

/**
 * Utilizes my getColumnSpanSize function with my getPercentValue function to return a combined value of the amount of columns you want to span across.
 */
export const setColumnSpanSize = (columns, container = maxWidth) => {
  const totalWidth = getColumnSpanSize(columns);
  return getPercentValue(totalWidth, container);
};

export const parseContent = (content, max) => ({
  __html: max ? truncateWithEllipses(content, max) : content
});

/**
 * Trims the text based off of the number you pass to it and adds an ellipses
 */
export const truncateWithEllipses = (text, max) =>
  text.substr(0, max - 1) + (text.length > max ? '&hellip;' : '');

export const shadeOf = (color, opacity) => rgba(color, opacity);

export const maintainRatio = (width, height) => `
  position: relative;

  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: ${(height / width) * 100}%;
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1;

    > * {
      width: 100%;
      height: 100%;
    }
  }
`;
