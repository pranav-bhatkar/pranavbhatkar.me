'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Download, Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Button } from '../shadcn/button'
import ScrollReveal from '../animations/ScrollReveal'
import StaggeredReveal from '../animations/StaggeredReveal'

export default function ModernHero() {
  const { trackEvent } = useAnalytics()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  const handleContactClick = () => {
    trackEvent('contact_clicked', { location: 'hero' })
  }

  const handleProjectsClick = () => {
    trackEvent('projects_clicked', { location: 'hero' })
  }

  const handleDownloadClick = () => {
    trackEvent('resume_downloaded', { location: 'hero' })
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center">
          {/* Greeting */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-gray-800/50 border border-gray-700/50 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Available for new projects</span>
            </motion.div>
          </ScrollReveal>

          {/* Main heading */}
          <ScrollReveal delay={0.4} distance={40}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="block text-white">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pranav Bhatkar
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.6} distance={30}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Full-stack developer crafting digital experiences with{' '}
              <span className="text-blue-400 font-semibold">modern technologies</span>
              {' '}and{' '}
              <span className="text-purple-400 font-semibold">creative solutions</span>
            </p>
          </ScrollReveal>

          {/* Action buttons */}
          <ScrollReveal delay={0.8}>
            <StaggeredReveal
              staggerDelay={0.1}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg font-semibold"
                  onClick={handleProjectsClick}
                >
                  <Link href="/projects">
                    View My Work
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-semibold"
                  onClick={handleContactClick}
                >
                  <Link href="mailto:work@pranavbhatkar.me">
                    <Mail className="mr-2 w-5 h-5" />
                    Get In Touch
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-400 hover:text-white px-8 py-3 text-lg font-semibold"
                  onClick={handleDownloadClick}
                >
                  <Download className="mr-2 w-5 h-5" />
                  Download CV
                </Button>
              </motion.div>
            </StaggeredReveal>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={1.0}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: '50+', label: 'Projects' },
                { number: '3+', label: 'Years Experience' },
                { number: '100%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'Available' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}