"use client";
import {
  useState,
  useEffect,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Clock, Instagram, Linkedin, Twitter, Zap } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const contentTypes = [
  {
    value: "twitter",
    label: "Twitter Thread",
  },
  {
    value: "instagram",
    label: "Instagram Caption",
  },
  {
    value: "linkedin",
    label: "Linkedin Post",
  },
];

export default function GenerateContent() {
  const [contentType, setContentType] = useState(contentTypes[0].value);
  const [prompt, setPrompt] = useState("");
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 mt-14 lg:grid-cols-3 gap-8">
          {/* left sidebar */}
          <div className="lg:col-span-1 bg-gray-800 rounded-2xl p-6 h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-blue-400">History</h2>
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <div className="space-y-4"></div>
          </div>

          {/* main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Available Points</p>
                  <p className="text-2xl font-bold text-yellow-400">{0}</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full transition-colors">
                <Link href="/pricing">Get More Points</Link>
              </Button>
            </div>

            {/* Move Content Type here */}
            <div className="bg-gray-800 p-6 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Content Type
                </label>
                <Select
                  onValueChange={setContentType}
                  defaultValue={contentType}
                >
                  <SelectTrigger className="w-full bg-gray-700 border-none rounded-xl">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          {type.value === "twitter" && (
                            <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                          )}
                          {type.value === "instagram" && (
                            <Instagram className="mr-2 h-4 w-4 text-pink-400" />
                          )}
                          {type.value === "linkedin" && (
                            <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
                          )}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Prompt
              </label>
              <Textarea
                id="prompt"
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-gray-700 border-none rounded-xl resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
