'use client'

import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useRef } from 'react'
import { Card } from '../shadcn/card'
import ScrollReveal from '../animations/ScrollReveal'
import StaggeredReveal from '../animations/StaggeredReveal'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'Pranav delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made the entire development process smooth and efficient.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Startup Founder',
    company: 'InnovateLab',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Working with Pranav was a game-changer for our startup. He built a scalable platform that handles our growing user base perfectly. Highly recommended!',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Design Director',
    company: 'CreativeStudio',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Pranav\'s ability to translate complex designs into pixel-perfect implementations is remarkable. He\'s a true professional who delivers on time and within budget.',
    rating: 5
  },
  {
    name: 'David Kim',
    role: 'CTO',
    company: 'DataFlow Inc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The backend architecture Pranav designed for our data processing platform is robust and efficient. His expertise in modern technologies is impressive.',
    rating: 5
  },
  {
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    company: 'GrowthCo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    content: 'Pranav created a beautiful, responsive website that perfectly represents our brand. The user experience is outstanding and our conversion rates have improved significantly.',
    rating: 5
  },
  {
    name: 'Alex Martinez',
    role: 'E-commerce Manager',
    company: 'ShopSmart',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Our e-commerce platform built by Pranav handles thousands of transactions daily without any issues. The performance and reliability are exceptional.',
    rating: 5
  }
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Clients <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't just take my word for it - hear from the amazing people I've worked with
            </p>
          </div>
        </ScrollReveal>

        <StaggeredReveal
          staggerDelay={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 bg-gray-900/50 border-gray-700/50 backdrop-blur-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-400/20" />
                  <p className="text-gray-300 leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggeredReveal>

        {/* Stats */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Happy Clients' },
              { number: '100%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support' },
              { number: '5★', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}