'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Container as ContainerBase } from '@/components'
import { theme } from '@/theme'
import { media } from '@/utils'

import { Background, BackgroundType } from './Background'
import { Details, DetailsType } from './Details'
import { Meet, MeetType } from './Meet'

const { easing, timing } = theme

interface Props {
  background: BackgroundType
  details: DetailsType
  meet: MeetType
  setRefs: (refs: React.RefObject<HTMLDivElement>[]) => void
}

export const About = ({ background, details, meet, setRefs }: Props) => {
  const [isIOSMobile, setIsIOSMobile] = useState(false)

  const uniforms = {
    details: {
      uTexture: { value: null },
      uTime: { value: 0.0 },
    },
    meet: {
      uTexture: { value: null },
      uTime: { value: 0.0 },
    },
  }

  // const handleUniforms = () => {
  //   uniforms.details.uTime.value += 0.01
  //   uniforms.meet.uTime.value += 0.01
  //   requestAnimationFrame(handleUniforms)
  // }

  // handleUniforms()

  useEffect(() => {
    const handleUniforms = () => {
      uniforms.details.uTime.value += 0.01
      uniforms.meet.uTime.value += 0.01
      requestAnimationFrame(handleUniforms)
    }

    handleUniforms()
  }, [])

  useEffect(() => {
    const ua = window.navigator.userAgent
    // this check is due to uniforms not working on IOS Safari
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
    setIsIOSMobile(iOS)
  }, [])

  return (
    <Wrapper>
      <Container>
        <Background {...background} setRefs={setRefs} />
        <Meet {...meet} isIOSMobile={isIOSMobile} setRefs={setRefs} uniforms={uniforms.meet} />
        <Details {...details} isIOSMobile={isIOSMobile} uniforms={uniforms.details} />
      </Container>
    </Wrapper>
  )
}

const Container = styled(props => <ContainerBase {...props} />)`
  position: relative;
`

// prettier-ignore
const Wrapper = styled.div`
  padding-top: 200px;
  position: relative;

  &::after {
    background: linear-gradient(black, transparent);
    content: '';
    height: 200px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-image ${timing.colorMode} ${easing.easeIn};
  }

  @media only screen and (max-width: 1272px) {
    padding-top: 100px;
  }

  ${media.down.md`
    padding-top: 50px;
  `}
`;
