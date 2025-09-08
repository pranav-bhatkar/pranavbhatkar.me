'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Code, Coffee } from 'lucide-react'
import { useRef } from 'react'
import ProfileCard from '../ProfileCard'
import ScrollReveal from '../animations/ScrollReveal'

export default function AboutSection() {
  const { trackEvent } = useAnalytics()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSocialClick = (platform: string) => {
    trackEvent('social_clicked', { platform, location: 'about' })
  }

  const profileData = {
    name: 'Pranav Bhatkar',
    title: 'Full Stack Developer',
    avatar: '/static/images/logo.png', // You can replace this with your actual avatar
    socialProfiles: [
      {
        platform: 'twitter' as const,
        username: 'pranavbhatkar_',
        displayName: 'Pranav Bhatkar',
        bio: 'Full-stack developer passionate about creating amazing digital experiences',
        followers: 1250,
        verified: true
      },
      {
        platform: 'github' as const,
        username: 'pranav-bhatkar',
        displayName: 'Pranav Bhatkar',
        bio: 'Open source contributor and developer',
        followers: 500,
        verified: false
      },
      {
        platform: 'instagram' as const,
        username: 'pranavbhatkar_',
        displayName: 'Pranav Bhatkar',
        bio: 'Behind the scenes of my coding journey',
        followers: 800,
        verified: false
      },
      {
        platform: 'linkedin' as const,
        username: 'pranavbhatkar',
        displayName: 'Pranav Bhatkar',
        bio: 'Professional network and career updates',
        followers: 1200,
        verified: true
      }
    ]
  }

  const stats = [
    { icon: Calendar, label: 'Experience', value: '3+ Years' },
    { icon: Code, label: 'Projects', value: '50+' },
    { icon: Coffee, label: 'Coffee Cups', value: '∞' },
    { icon: MapPin, label: 'Location', value: 'India' }
  ]

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-6">
                  I'm a passionate full-stack developer with over 3 years of experience building 
                  modern web applications. I love turning complex problems into simple, beautiful, 
                  and intuitive solutions.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open source projects, or sharing my knowledge through blog posts and tutorials. 
                  I believe in continuous learning and staying up-to-date with the latest trends in web development.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <stat.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.6}>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackEvent('projects_clicked', { location: 'about' })}
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="mailto:work@pranavbhatkar.me"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackEvent('contact_clicked', { location: 'about' })}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Right side - Profile Card */}
          <ScrollReveal delay={0.4} direction="right">
            <div className="flex justify-center lg:justify-end">
              <ProfileCard
                name={profileData.name}
                title={profileData.title}
                avatar={profileData.avatar}
                socialProfiles={profileData.socialProfiles}
                className="max-w-md"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}