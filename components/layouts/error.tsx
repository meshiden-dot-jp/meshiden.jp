import React from 'react'

const error = () => {
    return (
        <div>
            <div className="flex items-center justify-center gap-12 h-[50vh]">
                <div className="text-center">
                    <i className="fa-solid fa-xmark text-5xl font-thin"></i>
                    <h2 className="pt-6">記事を読み込めませんでした</h2>
                    <p className="">
                        しばらくしてから、再度読み込んでください。<br />
                        状況が改善しない場合は、<a className='border-b-[1.5px] border-black' href="/contact">お問い合わせフォーム</a>にご連絡ください。
                    </p>
                </div>
            </div>
        </div>
    )
}

export default error