// app/page.js (App Router)
// pages/index.js (Pages Router)
'use client' // only in App Router

import React from 'react'
import dynamic from 'next/dynamic'

const CustomEditor = dynamic(
  () => {
    return import('../../../components/custom-editor')
  },
  { ssr: false }
)

function Page() {
  return <CustomEditor initialData="<h1>Hello from CKEditor in Next.js!</h1>" />
}

export default Page
