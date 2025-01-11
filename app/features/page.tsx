"use client";
import { useState } from "react";
import { Sparkles, Brain, Zap, Clock, Palette, Lock } from "lucide-react";

export default function FeaturesPage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      label: "All Features",
      icon: <Sparkles className="w-4 h-4" />,
    },
    { id: "ai", label: "AI Tools", icon: <Brain className="w-4 h-4" /> },
    {
      id: "collaboration",
      label: "Collaboration",
      icon: <Zap className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Content Creation",
      description:
        "Generate high-quality, original content in seconds using state-of-the-art AI technology.",
      details:
        "Leverage advanced language models to create blog posts, social media content, and marketing copy that resonates with your audience.",
      category: "ai",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Templates",
      description:
        "Choose from hundreds of pre-built templates or create your own custom templates.",
      details:
        "Save time and maintain consistency with intelligent templates that adapt to your brand voice and style.",
      category: "ai",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time on content projects.",
      details:
        "Share drafts, leave comments, and track changes seamlessly within the platform.",
      category: "collaboration",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Content Calendar",
      description: "Plan and schedule your content across multiple platforms.",
      details:
        "Maintain a consistent publishing schedule and never miss a deadline with our intuitive calendar interface.",
      category: "collaboration",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Brand Voice Control",
      description:
        "Maintain consistent brand messaging across all your content.",
      details:
        "Define your brand's tone, style, and vocabulary to ensure all generated content matches your voice.",
      category: "ai",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Advanced Security",
      description:
        "Enterprise-grade security to protect your content and data.",
      details:
        "Rest easy knowing your content is protected with encryption, access controls, and regular backups.",
      category: "security",
    },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((feature) => feature.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Features that <span className="text-blue-600">empower</span> your
              content
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to create exceptional content at scale
            </p>
          </div>
        </div>
      </div>

      {/* Feature Category Buttons */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:shadow"
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg"
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
              <div className="px-6 pb-6">
                <p
                  className={`text-sm text-gray-600 transition-opacity duration-300 ${
                    hoveredFeature === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {feature.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to transform your content creation?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Start creating amazing content today with our AI-powered platform
          </p>
          <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}
