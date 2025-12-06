import React from 'react'

const Icons = () => {
    return (
        <div>
            <ul className="grid grid-cols-6 justify-center text-2xl gap-3">
                <li className="flex flex-col items-center">
                    <a aria-label="X" href="https://www.x.com/meshiden_jp" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                        <i className="fa-brands fa-x-twitter block"></i>
                        <p className="text-[.625rem] text-center leading-[1.75rem]">X</p>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a aria-label="Instagram" href="https://www.instagram.com/meshiden.jp" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                        <i className="fa-brands fa-instagram block"></i>
                        <p className="text-[.625rem] text-center leading-[1.75rem]">Instagram</p>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a aria-label="Discord" href="https://discord.com/users/1287985017615679513" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                        <i className="fa-brands fa-discord block"></i>
                        <p className="text-[.625rem] text-center leading-[1.75rem]">Discord</p>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a aria-label="YouTube" href="https://www.youtube.com/@meshiden_jp" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                        <i className="fa-brands fa-youtube block"></i>
                        <p className="text-[.625rem] text-center leading-[1.75rem]">YouTube</p>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a aria-label="GitHub" href="https://www.github.com/meshiden-dot-jp" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                        <i className="fa-brands fa-github block"></i>
                        <p className="text-[.625rem] text-center leading-[1.75rem]">GitHub</p>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a aria-label="Behance" href="https://www.behance.net/meganenasi61c5" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                        <i className="fa-brands fa-behance block"></i>
                        <p className="text-[.625rem] text-center leading-[1.75rem]">Behance</p>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Icons
