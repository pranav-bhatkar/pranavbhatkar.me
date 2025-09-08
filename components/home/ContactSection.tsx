'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Button } from '../shadcn/button'
import { Card } from '../shadcn/card'
import ScrollReveal from '../animations/ScrollReveal'

export default function ContactSection() {
  const { trackEvent } = useAnalytics()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'work@pranavbhatkar.me',
      href: 'mailto:work@pranavbhatkar.me',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9960935244',
      href: 'tel:+919960935244',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
      color: 'text-red-400'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/pranav-bhatkar',
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/pranavbhatkar',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/pranavbhatkar_',
      color: 'hover:text-blue-400'
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://youtube.com/@pranavbhatkar',
      color: 'hover:text-red-400'
    }
  ]

  const handleContactClick = (type: string, value: string) => {
    trackEvent('contact_method_clicked', { type, value })
  }

  const handleSocialClick = (platform: string) => {
    trackEvent('social_clicked', { platform, location: 'contact' })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    trackEvent('contact_form_submitted', { location: 'contact' })
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! I\'ll get back to you soon.')
    }, 2000)
  }

  return (
    <section ref={ref} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <ScrollReveal delay={0.2}>
              <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`p-3 bg-gray-700/50 rounded-lg ${info.color}`}>
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <Link
                        href={info.href}
                        className="text-white hover:text-blue-400 transition-colors"
                        onClick={() => handleContactClick(info.label.toLowerCase(), info.value)}
                      >
                        {info.value}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.4}>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 ${social.color} transition-all duration-300`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSocialClick(social.label)}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal delay={0.4} direction="right">
            <Card className="p-8 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}