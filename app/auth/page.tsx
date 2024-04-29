import React, { Suspense } from 'react'
import AuthComponent from './components/AuthComponents'

export default function page() {
  return (
    <Suspense>
        <AuthComponent />
    </Suspense>
  )
}
