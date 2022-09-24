import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const { GITHUB_ID = '', GITHUB_SECRET = ''} = process.env;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)