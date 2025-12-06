import React from 'react'

const links = () => {
  return (
    <div>
      <h2 id='links'>関連リンク</h2>
      <ul className='pt-4 pl-8 list-disc leading-10'>
        <li><a className='b' href="https://www.x.com/meshiden_jp" target="_blank" rel="noopener noreferrer">X (旧 Twitter) - @meshiden_jp <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a></li>
        <li><a className='b' href="https://www.instagram.com/meshiden.jp" target="_blank" rel="noopener noreferrer">Instagram - @meshiden.jp <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a></li>
        <li><a className='b' href="https://discord.com/users/1287985017615679513" target="_blank" rel="noopener noreferrer">Discord <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a></li>
        <li><a className='b' href="https://www.youtube.com/@meshiden_jp" target="_blank" rel="noopener noreferrer">YouTube <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a></li>
        <li><a className='b' href="https://www.github.com/meshiden-dot-jp" target="_blank" rel="noopener noreferrer">GitHub <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a></li>
        <li><a className='b' href="https://www.behance.net/meganenasi61c5" target="_blank" rel="noopener noreferrer">Behance <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a></li>
      </ul>
    </div>
  )
}

export default links