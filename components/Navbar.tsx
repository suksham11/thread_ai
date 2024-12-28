'use client'
import Link from 'next/link'

import {SignInButton, SignOutButton, UserButton, SignedOut, SignedIn, useAuth} from '@clerk/nextjs'
import { Menu, PlugZap, X } from "lucide-react";
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
    }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center space-x-2">
              <PlugZap className="w-8 h-8 text-blue-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">
                Prompt AI
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`hidden sm:flex items-center space-x-8`}>
              {["Features", "Pricing", "Docs"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors py-2 sm:py-0 relative group"
                >
                  {item}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </div>
            <button
              className="sm:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 " />
              ) : (
                <Menu className="w-6 h-6 " />
              )}
            </button>
          </div>
        </div>

        <div
          className={`sm:hidden ${
            isMenuOpen ? "block" : "hidden"
          } sm:block mt-4 sm:mt-0`}
        >
          <div className="flex flex-col space-y-2">
            {["Features", "Pricing", "Docs"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:h-1"></span>
              </Link>
            ))}
            {userId && (
              <Link
                href={"/generate"}
                className="text-gray-300 hover:text-white transition-colors relative"
              >
                Dashboard
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:h-1"></span>
              </Link>
            )}
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="text-gray-300 hover:text-white transition-colors mt-2 sm:mt-0
                              "
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors
                              "
                >
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10  h-10",
                  },
                }}
              ></UserButton>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}
