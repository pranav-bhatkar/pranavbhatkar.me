'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import projectsData from '@/data/projectsData'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Badge } from '../shadcn/badge'
import { Button } from '../shadcn/button'
import ScrollReveal from '../animations/ScrollReveal'
import StaggeredReveal from '../animations/StaggeredReveal'

export default function ModernProjects() {
  const { trackEvent } = useAnalytics()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleProjectClick = (projectTitle: string) => {
    trackEvent('project_clicked', { project: projectTitle, location: 'home' })
  }

  const handleViewAllClick = () => {
    trackEvent('view_all_projects_clicked', { location: 'home' })
  }

  // Show only first 3 projects on home page
  const featuredProjects = projectsData.slice(0, 3)

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>
        </ScrollReveal>

        <StaggeredReveal
          staggerDelay={0.2}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imgSrc}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Overlay buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-black/50 border-gray-600 text-white hover:bg-black/70"
                    onClick={() => handleProjectClick(project.title)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-black/50 border-gray-600 text-white hover:bg-black/70"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 text-xs"
                    >
                      +{project.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Project Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                  <span>Featured</span>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </StaggeredReveal>

        {/* View All Button */}
        <ScrollReveal delay={0.8}>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg font-semibold"
                onClick={handleViewAllClick}
              >
                <Link href="/projects">
                  View All Projects
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}