import {
  SiYoutube, 
  SiInstagram, 
  SiX,
  SiPinterest, 
  SiReddit, 
  SiThreads, 
  SiBluesky, 
  SiBehance,
  SiApplemusic,
  SiGithub, 
  SiQiita, 
  SiZenn,
  SiSpeakerdeck,
  SiSnapchat,
  SiBereal,
  SiClubhouse,
  SiPixiv,
  SiDiscord,
  SiTiktok,
  SiSpotify,
  SiTwitch,
  SiNote,
  SiFigma,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ServiceItem = {
  label: string
  icon: React.ReactNode
  url: string
}

type Category = {
  label: string
  items: ServiceItem[]
}

const G = () => <Globe size={24} />

const categories: Category[] = [
  {
    label: 'ソーシャルメディア',
    items: [
      { label: 'YouTube',   icon: <SiYoutube />,   url: 'https://www.youtube.com/@meshiden-dot-jp' },
      { label: 'Instagram', icon: <SiInstagram />, url: 'https://www.instagram.com/meshiden.jp/' },
      { label: 'TikTok',    icon: <SiTiktok />,    url: 'https://www.tiktok.com/@meshiden.jp?_r=1&_t=ZS-964vIFLFIuu' },
      { label: 'X',         icon: <SiX />,         url: 'https://x.com/meshiden_jp' },
      { label: 'Pinterest', icon: <SiPinterest />, url: 'https://pin.it/6jL1D0dA5' },
      { label: 'Reddit',    icon: <SiReddit />,    url: 'https://www.reddit.com/user/meahiden_jp/' },
      { label: 'Snapchat',  icon: <SiSnapchat />,  url: 'https://snapchat.com/t/SPQyteUG' },
      { label: 'Threads',   icon: <SiThreads />,   url: 'https://www.threads.com/@meshiden.jp' },
      { label: 'Twitch',    icon: <SiTwitch />,    url: 'https://www.twitch.tv/meshidendotjp' },
      { label: 'Bluesky',   icon: <SiBluesky />,   url: 'https://bsky.app/profile/meshiden-dot-jp.bsky.social' },
      { label: 'Clubhouse', icon: <SiClubhouse />, url: 'https://www.clubhouse.com/@meshiden.jp?utm_medium=ch_profile&utm_campaign=ineLqMfTIGP2J4lQWE5UTA-2281139&chs=jg5ID8dAn%3AX92IHIzkm8fejQhKMtaBjYf8Mioc7S2QImCCMoweo78' },
      { label: 'Bereal',    icon: <SiBereal />,    url: 'https://bere.al' },
      { label: 'Behance',   icon: <SiBehance />,   url: 'https://www.behance.net/meganenasi61c5' },
      { label: 'pixiv',     icon: <SiPixiv />,     url: 'https://www.pixiv.net/users/38016775' },
      { label: 'LinkedIn',  icon: <FaLinkedin />,  url: 'https://www.linkedin.com/in/%E5%84%AA%E6%96%97-%E9%A3%AF%E7%94%B0-05b7a8406/' },
    ],
  },
  {
    label: '開発',
    items: [
      { label: 'GitHub',     icon: <SiGithub />,      url: 'https://github.com/meshiden-dot-jp' },
      { label: 'Figma',      icon: <SiFigma />,       url: 'https://www.figma.com/@meshiden_jp' },
      { label: 'Qiita',      icon: <SiQiita />,       url: 'https://qiita.com/meshiden-dot-jp' },
      { label: 'Zenn',       icon: <SiZenn />,        url: 'https://zenn.dev/meshiden' },
      { label: 'Topaz',      icon: <G />,             url: 'https://topaz.dev/meshiden' },
      { label: 'Note',       icon: <SiNote />,        url: 'https://note.com/meshidendotjp'},
      { label: 'Speakerdeck',icon: <SiSpeakerdeck />, url: 'https://speakerdeck.com/meshidendotjp' },
      { label: 'Discord',    icon: <SiDiscord />,     url: 'https://discord.com/users/1287985017615679513' },
    ],
  },
  {
    label: '音楽',
    items: [
      { label: 'Spotify',     icon: <SiSpotify />,    url: 'https://open.spotify.com/user/21gbe4fz7hmhevi4ooxj6k7ry?si=AdCMdTT7S4-AWUPP7aAiJQ' },
      { label: 'Apple Music', icon: <SiApplemusic />, url: 'https://music.apple.com/profile/meshiden_jp' },
    ],
  },
]

const Page = () => {
  return (
    <div className="sm:w-[70%] w-[90%] m-auto pb-32">
      <h1>SNS</h1>
      {categories.map((category) => (
        <section key={category.label}>
          <h2 className="text-sm font-semibold text-gray-500 mb-2 pt-0 sm:pt-6 lg:pt-12">
            {category.label}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-8 pb-8 sm:pb-4 lg:pb-0">
            {category.items.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 hover:opacity-60 transition-opacity"
              >
                <div className="text-2xl">{item.icon}</div>
                <span className="text-xs text-center leading-tight">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
      <div className="flex justify-center pt-16">
        <Button asChild>
          <Link className="sm:w-[50%] w-full" href="/">
            トップへ戻る
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Page