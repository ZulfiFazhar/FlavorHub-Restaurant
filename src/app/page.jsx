'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter()
  useEffect(() => {
    router.push('/resto')
  }, [])

  return (
    <div>Loading...</div>
  )
}

export default page