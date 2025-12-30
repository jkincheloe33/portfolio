'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  // Only create stylesheet once with lazy initial state
  // xss: prevent XSS attacks via style injection
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  // On client side, don't wrap with StyleSheetManager
  if (typeof window !== 'undefined') {
    return <>{children}</>
  }

  // On server side, wrap with StyleSheetManager to collect styles
  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
}
