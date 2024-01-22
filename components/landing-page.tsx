import { Link } from 'lucide-react'
import React from 'react'
import { Button } from 'react-day-picker'

export default function LandingPage() {
  return (
    <div>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  )
}
