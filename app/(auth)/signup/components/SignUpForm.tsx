'use client'

import Button from '@/app/components/ui/Button'
import InputField from '@/app/components/ui/InputField'
import React, { useState } from 'react'
import { CreateUserDto } from '../dto/create-user.dto'

type Props = {
  handleSignUp: (createUser: CreateUserDto) => void
}

const SignupForm = ({ handleSignUp }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})
  //const [hasUserInteracted, setHasUserInteracted] = useState(false)
  /*
  const [passwordRules, setPasswordRules] = useState<PasswordRules>({
    minLength: false,
    hasSpecialChar: false,
    hasAlphanumeric: false,
  })

  useEffect(() => {
    setPasswordRules({
      minLength: password.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasAlphanumeric: /[a-zA-Z]/.test(password) && /\d/.test(password),
    })
  }, [password])
  */
  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {}
    if (!email.trim()) newErrors.email = 'Email is required.'
    if (!password.trim()) newErrors.password = 'Password is required.'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //if (!hasUserInteracted) setHasUserInteracted(true)
    if (!validate()) return
    handleSignUp({ email, password })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    //if (!hasUserInteracted) setHasUserInteracted(true)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 pb-2'>
        <InputField
          label='Email'
          type='email'
          value={email}
          placeholder='Email'
          error={errors.email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className='flex gap-4'>
          <div className='flex-1/2'>
            <InputField
              label='Password'
              type='password'
              value={password}
              placeholder='Password'
              error={errors.password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='flex-1/2'>
            <InputField
              label='Confirm Password'
              type='password'
              value={confirmPassword}
              placeholder='Re-enter Password'
              error={errors.confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {
          /* 
          <PasswordRulesValidator hasUserInteracted={hasUserInteracted} rules={passwordRules} />
          */
        }

      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <Button
          type='submit'
          className='w-full'
          label='Join Now'
        />
      </div>
    </form>
  )
}

export default SignupForm