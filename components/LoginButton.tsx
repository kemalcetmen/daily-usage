import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default LoginButton