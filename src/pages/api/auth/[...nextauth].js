import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "유저 이메일,페스워드 방식",
      credentials: {
        email: {
          label: "유저 이메일",
          type: "email",
          placeholder: "user@email.com",
        },
        password: { label: "패스워드", type: "password" },
      },
      async authorize(credentials, req) {
        const accountArray = [
          {
            id: "test@test.com",
            password: "test1234!@",
          },
        ];

        const matchedAccount = accountArray.find(
          (account) =>
            account.id === credentials.email &&
            account.password === credentials.password
        );

        if (matchedAccount) {
          const user = [
            {
              id: 1,
              name: "테스터1",
              email: "test@test.com",
            },
          ];

          const matchedUser = user.find((x) => x.email === matchedAccount.id);
          if (matchedUser) {
            return Promise.resolve(matchedUser);
          }
        }
        return Promise.resolve(null);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
