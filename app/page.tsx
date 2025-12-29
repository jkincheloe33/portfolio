'use client'

import { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import { About, Callout, CaseStudies, Contact, Hero } from '@/components'
import { theme } from '@/theme'
import { data } from '@/utils'

import { backgroundHandler } from '@/components/sections/About/Background'
import { meetHandler } from '@/components/sections/About/Meet'
import { contactHandler } from '@/components/sections/Contact'

const { about, caseStudies, contact, hero } = data
const { color, easing, timing } = theme

export default function Home() {
  const [refs, setRefs] = useReducer(selectedReducer, [])

  useEffect(() => {
    handleScroll(refs)
  }, [refs])

  const handleScroll = refs => {
    const backgroundRefs = refs.filter(ref => ref.comp === 'Background')
    const contactRefs = refs.filter(ref => ref.comp === 'Contact')
    const meetRefs = refs.filter(ref => ref.comp === 'Meet')
    const refsCurrent = [...new Set(refs.map(ref => ref.ref.current && true))]

    const handleRaf = () => {
      backgroundHandler(backgroundRefs)
      meetHandler(meetRefs)
      contactHandler(contactRefs)

      requestAnimationFrame(handleRaf)
    }

    if (refsCurrent.length === 1 && refsCurrent[0]) {
      handleRaf()
    }
  }

  function selectedReducer(state, action) {
    switch (action.type) {
      case 'create': {
        if (!state.includes(action.payload)) return [...state, action.payload]
        return state.filter(item => item !== action.payload)
      }
      default: {
        return state
      }
    }
  }

  return (
    <Wrapper>
      <Hero {...hero} />
      <About {...about} setRefs={setRefs} />
      <CaseStudies {...caseStudies} />
      <Contact {...contact} setRefs={setRefs} />
      <Callout />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${color.black};
  overflow: hidden;
  transition: background-color ${timing.colorMode} ${easing.easeIn};
`
