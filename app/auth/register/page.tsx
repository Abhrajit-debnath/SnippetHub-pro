import React from 'react'
import SignUpComponent from '../components/sign-up-form'
import ThemeToggle from '../components/theme-toggle'

const page = () => {
  return (
       <div className="min-h-screen flex items-center justify-center px-4">
        <ThemeToggle/>
      <SignUpComponent/>
    </div>
  )
}

export default page
