import styled from 'styled-components'

interface Props {
  children: React.ReactNode
  className?: string
  unContain?: boolean
}

export const Container = ({ children, className, unContain }: Props) => (
  <Wrapper className={className} unContain={unContain}>
    {children}
  </Wrapper>
)

// prettier-ignore
const Wrapper = styled.div<{ unContain?: boolean }>`
  width: 100%;
  margin: 0 auto;

  ${p => !p.unContain && `
    max-width: 1264px;
    padding: 0 20px;
  `}
`;
