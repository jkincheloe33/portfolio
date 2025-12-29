'use client'

import styled from 'styled-components'
import { theme } from './theme'

const { color, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textTransform } = theme

interface TypographyProps {
  inverted?: boolean
  lightMode?: boolean
  secondary?: boolean
}

export const H1 = styled.h1<TypographyProps>`
  color: ${p => (p.inverted ? color.white : color.black)};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.h1};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.black};
  letter-spacing: ${letterSpacing.h1};
  line-height: ${lineHeight.h1};
  text-transform: ${textTransform.h1};
`

// prettier-ignore
export const H2 = styled.h2<TypographyProps>`
  color: ${p => (p.inverted ? color.white : color.orange)};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.h2};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.black};
  letter-spacing: ${letterSpacing.h2};
  line-height: ${lineHeight.h2};
  text-transform: ${textTransform.h2};

  ${p => p.secondary && `
    color: ${color.grey};
    line-height: 56px;
  `}
`

export const H3 = styled.h3<TypographyProps>`
  color: ${p => (p.inverted ? color.white : color.orange)};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.h3};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.black};
  letter-spacing: ${letterSpacing.h3};
  line-height: ${lineHeight.h3};
  text-transform: ${textTransform.h3};
`

export const H4 = styled.h4<TypographyProps>`
  color: ${p => (p.inverted ? color.white : color.grey)};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.h4};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.regular};
  letter-spacing: ${letterSpacing.h4};
  line-height: ${lineHeight.h4};
  text-transform: ${textTransform.h4};
`

export const H5 = styled.h5<TypographyProps>`
  color: ${p => (p.inverted ? color.white : color.grey)};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.h5};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.regular};
  letter-spacing: ${letterSpacing.h5};
  line-height: ${lineHeight.h5};
  text-transform: ${textTransform.h5};
`

export const H6 = styled.h6<TypographyProps>`
  color: ${p => (p.inverted ? color.white : color.grey)};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.h6};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.regular};
  letter-spacing: ${letterSpacing.h6};
  line-height: ${lineHeight.h6};
  text-transform: ${textTransform.h6};
`

// prettier-ignore
export const P = styled.p<TypographyProps>`
  color: ${p => p.lightMode ? color.black : color.white};
  font-family: ${fontFamily.poppins};
  font-size: ${fontSize.p};
  font-style: ${fontStyle.normal};
  font-weight: ${fontWeight.light};
  letter-spacing: ${letterSpacing.p};
  line-height: ${lineHeight.p};
  text-transform: ${textTransform.p};

  ${p => p.secondary && `
    font-size: 32px;
    line-height: 56px;
  `}
`
