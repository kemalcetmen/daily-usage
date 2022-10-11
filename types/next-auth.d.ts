import 'next-auth' 
import NextAuth from 'next-auth' 
import * as auth from 'next-auth' 
// import * as client from 'next-auth/client' 
// import 'next-auth/client' 

declare module 'next-auth' {
  export * from 'next-auth'
  export type InitOptions = auth.InitOptions
  export default NextAuth
  interface Session {
    user: {
      name: string
      email: string
      image: string
      uid: string
    }
  }
}
