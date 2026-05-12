import { useState } from 'react'
import { Outlet } from 'react-router'

export default function App() {
  return (
  <>
    <main>
      <Outlet />
    </main>
    </>
  )
}

