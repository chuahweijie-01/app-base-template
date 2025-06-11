'use client'

import React from 'react'
import SignupForm from './components/SignUpForm'
import { CreateUserDto } from './dto/create-user.dto'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const router = useRouter();

  const handleSignUp = async ({ email, password }: CreateUserDto) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (res.ok) {
        setTimeout(() => router.push('/login'), 1500);
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <SignupForm
        handleSignUp={handleSignUp} />
    </div>
  )
}

export default SignUpPage