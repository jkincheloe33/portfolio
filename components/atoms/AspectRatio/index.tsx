import styled, { css } from 'styled-components'
import { maintainRatio } from '@/utils'

// prettier-ignore
export const AspectRatio = styled.div<{ max?: number; align?: 'left' | 'right'; width?: number; height?: number }>`
  ${p => p.max && css`
    max-width: ${p.max}px;
    margin: 0 auto;
    width: 100%;

    ${p.align === 'left' && `
      margin-left: 0;
    `}

    ${p.align === 'right' && `
      margin-right: 0;
    `}
  `}

  ${p => maintainRatio(p.width, p.height)}
`
