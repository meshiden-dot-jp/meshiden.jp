import React from 'react'
import Link from 'next/link'

const lowernav = () => {
  return (
    <>
      <li><Link href="/disclaimer"><small>免責事項</small></Link></li>
      <li><Link href="/privacy"><small>プライバシーポリシー</small></Link></li>
      <li><Link href="/ai"><small>AIポリシー</small></Link></li>
      <li><Link href="/accessibility"><small>ウェブアクセシビリティ</small></Link></li>
      <li><Link href="/pride"><small>プライドポリシー</small></Link></li>
      {/* <li><Link href="/sns"><small>SNS</small></Link></li> */}
    </>
  )
}

export default lowernav
