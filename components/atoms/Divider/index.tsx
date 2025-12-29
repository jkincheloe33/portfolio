import styled from 'styled-components'
import { theme } from '@/theme'

const { color } = theme

export const Divider = () => <Wrapper />

const Wrapper = styled.div`
  background-color: ${color.teal};
  height: 485px;
  width: 100%;
`
