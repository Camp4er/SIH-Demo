import './globals.css'
import React from 'react'
import Header from '../components/Header'
import { StoreProvider } from '../lib/store'   // ✅ import this

export const metadata = {
  title: 'SIH Civic Demo',
  description: 'Demo for civic issue reporting',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>  
          <Header />
          <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </StoreProvider>
      </body>
    </html>
  )
}
