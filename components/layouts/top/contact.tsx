import React from 'react'

const contact = () => {
  return (
    <div>
      <p>お問い合わせは次の２つの方法からお選びいただけます。必要に応じてご利用ください。みなさまからのお問い合わせをお待ちしております。</p>
      <div className="grid sm:grid-cols-2 lg:gap-[1vw] sm:gap-[1.5vw] gap-[5vw] my-[2rem] text-center">
        <a href="/contact/#form">
          <div className="flex flex-col justify-center items-center bg-gray-100 hover:bg-gray-200 duration-300 rounded-lg p-8 aspect-video">
            {/* <i className="fa-solid fa-user-tie text-8xl"></i> */}
            <p className="font-bold text-xl">フォームでお問い合わせ（推奨）</p>
            <small>お困りの際はこちらをご利用ください。</small>
          </div>
        </a>
        <a href="/contact/#mail">
          <div className="flex flex-col justify-center items-center bg-gray-100 hover:bg-gray-200 duration-300 rounded-lg p-8 aspect-video">
            <p className="font-bold text-xl">メールでお問い合わせ</p>
            <small>返信は2-3週お時間を頂戴する場合があります。</small>
          </div>
        </a>
      </div>
    </div>
  )
}

export default contact