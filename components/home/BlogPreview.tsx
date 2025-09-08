'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Badge } from '../shadcn/badge'
import { Button } from '../shadcn/button'
import ScrollReveal from '../animations/ScrollReveal'

// Mock blog posts data - you can replace this with real data from your CMS
const blogPosts = [
  {
    title: 'Building Scalable React Applications with Modern Patterns',
    excerpt: 'Learn how to structure your React applications for scalability using modern patterns like custom hooks, context, and state management.',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['React', 'JavaScript', 'Architecture'],
    slug: 'scalable-react-applications',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop'
  },
  {
    title: 'Mastering TypeScript for Better Developer Experience',
    excerpt: 'Discover advanced TypeScript techniques that will improve your development workflow and catch bugs before they reach production.',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['TypeScript', 'Development', 'Best Practices'],
    slug: 'mastering-typescript',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=300&fit=crop'
  },
  {
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    date: '2024-01-05',
    readTime: '6 min read',
    tags: ['Web Development', 'Trends', 'Future'],
    slug: 'web-development-trends-2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
  }
]

export default function BlogPreview() {
  const { trackEvent } = useAnalytics()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleBlogClick = (slug: string, title: string) => {
    trackEvent('blog_post_clicked', { slug, title, location: 'home' })
  }

  const handleViewAllClick = () => {
    trackEvent('view_all_blog_clicked', { location: 'home' })
  }

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Insights</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Thoughts on web development, technology trends, and best practices
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.2}>
              <motion.article
                className="group bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Read time badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white border-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Read more link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    onClick={() => handleBlogClick(post.slug, post.title)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal delay={0.8}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-semibold"
                onClick={handleViewAllClick}
              >
                <Link href="/blog">
                  <BookOpen className="mr-2 w-5 h-5" />
                  View All Posts
                </Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}