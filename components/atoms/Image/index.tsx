import styled from 'styled-components'

export type ImageType = {
  alt: string
  src: string
}

interface Props extends ImageType {
  className?: string
}

export const Image = ({ alt, className, src }: Props) => (
  <Wrapper className={className}>
    <Img alt={alt} src={src} />
  </Wrapper>
)

const Img = styled.img`
  height: auto;
  width: 100%;
`

const Wrapper = styled.div`
  width: 100%;
`
