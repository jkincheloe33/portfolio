import { createRef, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { H1, theme } from '@/theme'
import { media, setPayload } from '@/utils'

const { color, easing, timing } = theme

const offset = 50

const backgroundEnum = {
  COMP_REF: 0,
  TITLE_ONE: 1,
  TITLE_TWO: 2,
  TITLE_THREE: 3,
}

export const backgroundHandler = refs => {
  const compRef = refs[backgroundEnum.COMP_REF].ref.current
  const titleOne = refs[backgroundEnum.TITLE_ONE].ref.current
  const titleTwo = refs[backgroundEnum.TITLE_TWO].ref.current
  const titleThree = refs[backgroundEnum.TITLE_THREE].ref.current
  const width = window.innerWidth

  const scrolled = window.pageYOffset * 0.3
  titleOne.style.transform = `translateX(calc(${scrolled}px - ${offset}%))`
  titleTwo.style.transform = `translateX(-${scrolled}px)`
  titleThree.style.transform = `translateX(calc(${scrolled}px - ${offset}%))`
  if (width < 667) {
    compRef.style.transform = `translateY(-${scrolled / 3}px) rotateZ(-5deg)`
  } else if (width < 768) {
    compRef.style.transform = `translateY(-${scrolled}px) rotateZ(-5deg)`
  } else if (width < 959) {
    compRef.style.transform = `translateY(-${scrolled + 150}px) rotateZ(-5deg)`
  } else {
    compRef.style.transform = `translateY(-${scrolled}px) rotateZ(-5deg)`
  }
}

export type BackgroundType = {
  titles: string[]
}

interface Props extends BackgroundType {
  setRefs: (refs: React.RefObject<HTMLDivElement>[]) => void
}

export const Background = ({ setRefs, titles }: Props) => {
  // create an array of refs to assign to each range...JK
  // const refs = useRef(ranges.map(() => createRef<HTMLSpanElement>()))
  const ref = useRef<HTMLDivElement>(null)
  const refs = useRef([...Array(titles.length)].map(() => createRef<HTMLHeadingElement>())).current
  // const refs = [
  //   {
  //     comp: 'Background',
  //     ref: useRef(null)
  //   },
  //   {
  //     comp: 'Background',
  //     ref: useRef(null)
  //   },
  //   {
  //     comp: 'Background',
  //     ref: useRef(null)
  //   },
  //   {
  //     comp: 'Background',
  //     ref: useRef(null)
  //   }
  // ];

  useEffect(() => {
    setPayload([{ comp: 'Background', ref }, ...refs.map(ref => ({ comp: 'Background', ref }))], setRefs)
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper ref={ref}>
      {titles.map((title, i) => (
        <Title $even={!!(i % 2)} key={i} ref={refs[i]}>
          {title}
        </Title>
      ))}
    </Wrapper>
  )
}

const Title = styled(props => <H1 {...props} />)<{ $even: boolean }>`
  color: ${p => (p.$even ? color.white : color.yellow)};
  font-size: 100px;
  line-height: 85px;
  transform: ${p => (p.$even ? `translateX(-${offset}%)` : `translateX(0)`)};
  transition: color ${timing.colorMode} ${easing.easeIn};
  white-space: nowrap;

  ${media.up.lg`
    font-size: 200px;
    line-height: 180px;
  `}
`

const Wrapper = styled.div`
  bottom: 0;
  left: -50%;
  position: absolute;
  width: 200%;
  z-index: 0;

  ${media.down.md`
    bottom: 500px;
  `}
`
