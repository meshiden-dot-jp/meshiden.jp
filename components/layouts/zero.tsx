import React from 'react'

const zero = () => {
    return (
        <div>
            <div className="flex items-center justify-center gap-12 h-[50vh]">
                <div className="text-center">
                    <i className="fa-regular fa-0 text-5xl font-thin"></i>
                    <h2 className="pt-6">閲覧可能な記事がありません</h2>
                    <p className="">
                        記事が投稿されるまでしばらくお待ち下さい。
                    </p>
                </div>
            </div>
        </div>
    )
}

export default zero