import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quehaceres App',
  description: 'Creado con Next.js, React, Typescript y Tailwind CSS hosteado en Netlify.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
