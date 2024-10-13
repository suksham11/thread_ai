'use client'
import Link from 'next/link'

import {SignInButton, SignOutButton, UserButton, SignedOut, SignedIn, useAuth} from '@clerk/nextjs'
import { useState, useEffect} from 'react'


export function Navbar(){
    const {userId} = useAuth()
    const [isMenuOpen , setIsMenuOpen] = useState(false)
    const [isScrolled , setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
           setIsScrolled(window.scrollY > 10)
        };
        window.addEventListener('scroll',handleScroll)
        return() => window.removeEventListener("scroll", handleScroll);
    });
    return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 
    'bg-gray-900/80 backdrop-blur-md' : "bg-transparent"
    }`} 
    >
     <nav className="container mx-auto px-4">
        <span>Threadai</span>
     </nav>
     
     </header>

    }
