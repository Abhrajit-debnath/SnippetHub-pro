import React from 'react'
import SnippetAnalytics from './snippet-analytics'

const SnippetAnalysisView = () => {
  return (
    <div className='h-auto bg-sidebarBg w-full md:w-[40%] rounded-xl p-5  xl:w-[45%] 2xl:w-[50%]'>
      <h2 className='text-white font-poppins capitalize text-lg pb-3'>snippet analytics</h2>
      <SnippetAnalytics/>
    </div>
  )
}

export default SnippetAnalysisView
