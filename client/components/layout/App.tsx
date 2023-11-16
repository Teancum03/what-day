import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navigation from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import { ContextType, User } from '@models/user'
import { getNewUser } from '@/lib/utils'

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    setUser(getNewUser())
  }, [])

  return (
    <div className="flex h-screen flex-col justify-between bg-background">
      <header className="header">
        <Navigation user={user as User}/>
      </header>
      <section className="w-100 mx-auto mb-auto px-2 min-[320px]:px-6 py-5 dark:bg-neutral-900 sm:max-w-2xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
       <Outlet context={{user} satisfies ContextType} />
      </section>
      <Footer />
    </div>
  )
}

export default App
