/**source: https://github.com/thatanjan/next-auth-yt **/
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

const { GITHUB_ID = '', GITHUB_SECRET = '',GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = ''} = process.env;

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,
  debug: true,
}
export default NextAuth(authOptions)