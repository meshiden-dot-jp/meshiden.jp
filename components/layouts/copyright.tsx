import React from 'react'

const copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='no-print'>
        <small className='flex justify-center sm:justify-start'>&copy; {currentYear} IIDA Yuto All Rights Reserved.</small>
    </div>
  )
}

export default copyright