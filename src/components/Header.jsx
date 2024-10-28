import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Header() {
    const location = useLocation()
    const navigation = useNavigate()
    console.log(location);
    function UrlPath(url){
        if (location.pathname === url){
            return true
        }
    }
  return (
    <div className='w-full bg-white sticky top-0'>
        <header>
            <nav className='px-3 max-w-6xl m-auto'>
                <ul className='flex justify-center gap-8 '>
                    <li className={`sm:text-base text-sm py-2 cursor-pointer border-b-[2px] border-transparent hover:border-b-orange-200 transition duration-300 ease-in-out ${UrlPath("/") && "border-b-orange-600 font-semibold"}`} onClick={()=>navigation("/")}>Home</li>
                    <li className={`sm:text-base text-sm py-2 cursor-pointer border-b-[2px] border-transparent hover:border-b-orange-200 transition duration-300 ease-in-out ${UrlPath("/menu") && "border-b-orange-600 font-semibold"}`} onClick={()=>navigation("/menu")}>Menu</li>
                    <li className={`sm:text-base text-sm py-2 cursor-pointer border-b-[2px] border-transparent hover:border-b-orange-200 transition duration-300 ease-in-out ${UrlPath("/promotions") && "border-b-orange-600 font-semibold"}`} onClick={()=>navigation("/promotions")}>Promotion</li>
                    {/* <li className={`sm:text-base text-sm py-2 cursor-pointer border-b-[2px] border-transparent hover:border-b-orange-200 transition duration-300 ease-in-out ${UrlPath("/contact-us") && "border-b-orange-600 font-semibold"}`} onClick={()=>navigation("/contact-us")}>Contact</li>
                    <li className={`sm:text-base text-sm py-2 cursor-pointer border-b-[2px] border-transparent hover:border-b-fuchsia-200 transition duration-300 ease-in-out ${UrlPath("/about-us") && "border-b-fuchsia-600 font-semibold"}`} onClick={()=>navigation("/about-us")}>About</li> */}
                    <li className={`whitespace-nowrap sm:text-base text-sm py-2 cursor-pointer border-b-[2px] border-transparent hover:border-b-orange-200 transition duration-300 ease-in-out ${UrlPath("/connect") && "border-b-orange-600 font-semibold"}`} onClick={()=>navigation("/connect")}>Sign in</li>
                </ul>
            </nav>
        </header>
    </div>
  )
}
