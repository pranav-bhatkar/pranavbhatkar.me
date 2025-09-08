'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'
import { Github, Instagram, Mail, Twitter, Youtube, Heart, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from './shadcn/button'

export default function ModernFooter() {
  const { trackEvent } = useAnalytics()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    trackEvent('scroll_to_top_clicked')
  }

  const handleSocialClick = (platform: string) => {
    trackEvent('social_clicked', { platform, location: 'footer' })
  }

  const socialLinks = [
    {
      name: 'Twitter',
      href: siteMetadata.twitter,
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      href: siteMetadata.github,
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Instagram',
      href: siteMetadata.instagram,
      icon: Instagram,
      color: 'hover:text-pink-400'
    },
    {
      name: 'YouTube',
      href: siteMetadata.youtube,
      icon: Youtube,
      color: 'hover:text-red-400'
    },
    {
      name: 'Email',
      href: `mailto:${siteMetadata.email}`,
      icon: Mail,
      color: 'hover:text-blue-400'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <footer className="relative bg-black border-t border-gray-800">
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded-full shadow-lg"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {siteMetadata.author}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Full-stack developer passionate about creating amazing digital experiences. 
                Let's build something incredible together.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 ${social.color} transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialClick(social.name)}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => trackEvent('footer_link_clicked', { link: link.name })}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="text-white hover:text-blue-400 transition-colors"
                    onClick={() => trackEvent('contact_clicked', { method: 'email', location: 'footer' })}
                  >
                    {siteMetadata.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">India</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>© {new Date().getFullYear()} {siteMetadata.author}</span>
            <span>•</span>
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in India</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
              onClick={() => trackEvent('footer_link_clicked', { link: 'privacy' })}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
              onClick={() => trackEvent('footer_link_clicked', { link: 'terms' })}
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}