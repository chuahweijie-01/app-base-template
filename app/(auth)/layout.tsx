'use client'

import { usePathname } from "next/navigation";
import { loginInfo, signupInfo } from "./constants/landing-page-info.constant";
import { LandingPageInfo } from "./types/landing-page-info.type";
import Image from "next/image";
import landingPageIllustration from "@/public/landing-image.png"

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    const headerInfo: LandingPageInfo = isLoginPage ? loginInfo : signupInfo

    return (
        <div
            key={pathname}
            className='flex flex-col-reverse lg:flex-row items-center lg:justify-center align-middle'>
            <div className='flex flex-col mb-6 flex-1/2 gap-4 p-10 lg:pl-50'>
                <div className='flex flex-col gap-3 pb-2'>
                    <span className='font-bold text-2xl lg:text-4xl text-[#2b3a38]'>{headerInfo.header}</span>
                    <span className='text-gray-500 text-xs lg:text-base'>{headerInfo.description}</span>
                </div>
                {children}
            </div>
            <div className='flex-1/2 px-10 lg:p-20'>
            <Image src={landingPageIllustration} alt="" width={500}/>
            </div>
        </div>
    )
}

export default AuthLayout