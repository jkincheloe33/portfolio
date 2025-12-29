import styled from 'styled-components'

import { Container } from '@/components'
import { P, theme } from '@/theme'
import { parseContent } from '@/utils'

const { color, easing, timing } = theme

const data = `Developed by me in Next JS. Design by me + Jake Pierce. You can check out this site in more detail on my <a href="https://github.com/jkincheloe33/portfolio" target="_blank">Github</a>`

export const Callout = () => (
  <Wrapper>
    <Container>
      <Copy dangerouslySetInnerHTML={parseContent(data)} />
    </Container>
  </Wrapper>
)

const Copy = styled(props => <P {...props} />)`
  font-size: 14px;
  overflow: hidden;
  text-align: center;
  transition: color ${timing.colorMode} ${easing.easeIn};

  a {
    color: inherit;
    font-style: italic;
    overflow: hidden;
    position: relative;

    &::before {
      background-color: ${color.yellow};
      bottom: 0;
      content: '';
      height: 4px;
      left: 0;
      opacity: 0.5;
      position: absolute;
      transform: translateY(0);
      transition: transform 250ms ${easing.easeIn};
      width: 100%;
    }

    &:hover {
      &::before {
        transform: translateY(-40%);
      }
    }
  }
`

const Wrapper = styled.div`
  background-color: #222;
  margin-top: 100px;
  transition: background-color ${timing.colorMode} ${easing.easeIn};
`
