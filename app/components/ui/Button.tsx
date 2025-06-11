import React from 'react'

type ButtonProps = {
    label: string
    onClick?: () => void
    disabled?: boolean
    className?: string
    type?: 'button' | 'submit'
    padding?: string
}

const Button = ({
    label,
    disabled,
    className,
    type = 'button',
    padding = 'px-6 py-2',
    onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-xl ${!disabled && 'cursor-pointer'} ${padding} ${className} bg-[#2b3a38] text-gray-500`}>
            {label}
        </button>
    )
}

export default Button