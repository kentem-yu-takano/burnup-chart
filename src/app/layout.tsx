import NextAuthProvider from '@/providers/NextAuth'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'リリース速度チャート',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' data-theme='cupcake'>
      <body className={`bg-base-100 overflow-auto min-w-[900px] text-base-content font-sans`}>
        <NextAuthProvider>
          <main className='flex min-h-screen flex-col items-center p-4'>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  )
}
