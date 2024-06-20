import { Account, AuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }: { token: JWT; account: Account | null }) => {
      if (account?.access_token) {
        // 初回サインイン時にアカウント情報を取得できる
        token.id = account.access_token
      }
      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // jwt関数でセットしたidをtoken.idで取得できる
      session.accessToken = token.id

      return session
    },
  },
}
