import '@/styles/globals.css'
import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'

const mPlus = M_PLUS_Rounded_1c({
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'リリース速度チャート',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' data-theme='pastel'>
      <body className={`${mPlus.className} bg-base-100 overflow-auto min-w-[900px]`}>{children}</body>
    </html>
  )
}
