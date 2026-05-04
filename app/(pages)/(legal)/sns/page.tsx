import {
  SiYoutube, SiInstagram, SiX,
  SiPinterest, SiReddit, SiThreads, 
  SiBluesky, SiBehance,SiApplemusic,
  SiGithub, SiQiita, SiZenn,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
// import { Globe } from 'lucide-react'

type ServiceItem = {
  label: string
  icon: React.ReactNode
  url: string
}

type Category = {
  label: string
  items: ServiceItem[]
}

// const G = () => <Globe size={24} />

const categories: Category[] = [
  {
    label: 'ソーシャルメディア',
    items: [
      { label: 'YouTube',   icon: <SiYoutube />,   url: 'https://www.youtube.com/@meshiden-dot-jp' },
      { label: 'Instagram', icon: <SiInstagram />, url: 'https://www.instagram.com/meshiden.jp/' },
    //   { label: 'TikTok',   icon: <SiTiktok />,    url: 'https://tiktok.com' },
      { label: 'X',         icon: <SiX />,         url: 'https://x.com/meshiden_jp' },
      { label: 'Pinterest', icon: <SiPinterest />, url: 'https://jp.pinterest.com/meshidendotjp/_profile/' },
      { label: 'Reddit',    icon: <SiReddit />,    url: 'https://www.reddit.com/user/meahiden_jp/' },
    //   { label: 'Snapchat',  icon: <SiSnapchat />,  url: 'https://snapchat.com' },
      { label: 'Threads',   icon: <SiThreads />,   url: 'https://www.threads.com/@meshiden.jp' },
    //   { label: 'Twitch',    icon: <SiTwitch />,    url: 'https://twitch.tv' },
      { label: 'Bluesky',   icon: <SiBluesky />,   url: 'https://bsky.app/profile/meshiden-dot-jp.bsky.social' },
    //   { label: 'Clubhouse', icon: <SiClubhouse />, url: 'https://clubhouse.com' },
    //   { label: 'Bereal',    icon: <SiBereal />,    url: 'https://bere.al' },
      { label: 'Behance',   icon: <SiBehance />,   url: 'https://www.behance.net/meganenasi61c5' },
    //   { label: 'pixiv',     icon: <SiPixiv />,     url: 'https://pixiv.net' },
      { label: 'LinkedIn',  icon: <FaLinkedin />,  url: 'https://www.linkedin.com/in/%E5%84%AA%E6%96%97-%E9%A3%AF%E7%94%B0-05b7a8406/' },
    ],
  },
//   {
//     label: 'コミュニケーション',
//     items: [
//       { label: 'WhatsApp',   icon: <SiWhatsapp />,   url: 'https://whatsapp.com' },
//       { label: 'Discord',    icon: <SiDiscord />,    url: 'https://discord.com' },
//       { label: 'Slack',      icon: <SiSlack />,      url: 'https://slack.com' },
//       { label: 'Zoom',       icon: <SiZoom />,       url: 'https://zoom.us' },
//       { label: 'Google Meet',icon: <SiGooglemeet />, url: 'https://meet.google.com' },
//       { label: 'Webex',      icon: <SiWebex />,      url: 'https://webex.com' },
//     ],
//   },
  {
    label: '開発',
    items: [
      { label: 'GitHub',     icon: <SiGithub />,     url: 'https://github.com/meshiden-dot-jp' },
      { label: 'Qiita',      icon: <SiQiita />,      url: 'https://qiita.com/meshiden-dot-jp' },
      { label: 'Zenn',       icon: <SiZenn />,       url: 'https://zenn.dev/meshiden' },
    //   { label: 'Connpass',   icon: <G />,             url: 'https://connpass.com' },
    //   { label: 'Slideshare', icon: <SiSlideshare />, url: 'https://slideshare.net' },
    //   { label: 'Note',       icon: <SiNote />,       url: 'https://note.com' },
    ],
  },
  {
    label: '音楽',
    items: [
    //   { label: 'Spotify',     icon: <SiSpotify />,    url: 'https://spotify.com' },
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

    </div>
  )
}

export default Page