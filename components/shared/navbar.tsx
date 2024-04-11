import React from 'react'

import Link from 'next/link'
import Profile from './Profile'
import { Button } from '../ui/button'


export default function NavBar() {
  return (
    <div className='flex justify-between items-center h-20'>
        <h1 className="text-xl bold">
            <Link href="/">
                Habbit Tracker
            </Link>
        </h1>
        <div className='flex space-x-2'>
            <Button variant='ghost'>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
            <Profile />

        </div>

    </div>
  )
}
