import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import connectMongo from "./mongodb"
import User from "@/models/User"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectMongo()
                const user = await User.findOne({ email: credentials?.email })

                if (!user) throw new Error("User not found")

                const isValid = await bcrypt.compare(credentials!.password, user.password)
                if (!isValid) throw new Error("Invalid password")

                return { id: user._id, email: user.email }
            }
        })
    ],
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET
}
