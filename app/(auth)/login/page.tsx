'use client'

import React from 'react'
import LoginForm from './components/LoginForm'
import { UserLoginCredential } from './dto/user-login-credential'
import { signIn } from 'next-auth/react'

const LoginPage = () => {
    const handleLogin = async ({ email, password }: UserLoginCredential) => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        if (res?.error) {
            console.log('ERROR', 'Login failed');
        } else {
            console.log('SUCCESS', 'Login success');
        }
    }
    return (
        <div>
            <LoginForm
                handleLogin={handleLogin}
                handleForgotPassword={function (): void {
                    throw new Error('Function not implemented.')
                }} />
        </div>
    )
}

export default LoginPage