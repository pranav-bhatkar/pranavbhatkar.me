'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '../shadcn/badge'
import ScrollReveal from '../animations/ScrollReveal'
import StaggeredReveal from '../animations/StaggeredReveal'

const skills = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React', level: 95, color: 'bg-blue-500' },
      { name: 'Next.js', level: 90, color: 'bg-gray-800' },
      { name: 'TypeScript', level: 88, color: 'bg-blue-600' },
      { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
      { name: 'Framer Motion', level: 85, color: 'bg-pink-500' },
      { name: 'GSAP', level: 80, color: 'bg-green-500' }
    ]
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', level: 90, color: 'bg-green-600' },
      { name: 'Express', level: 85, color: 'bg-gray-600' },
      { name: 'NestJS', level: 82, color: 'bg-red-500' },
      { name: 'PostgreSQL', level: 88, color: 'bg-blue-700' },
      { name: 'MongoDB', level: 85, color: 'bg-green-700' },
      { name: 'Redis', level: 75, color: 'bg-red-600' }
    ]
  },
  {
    category: 'DevOps & Tools',
    technologies: [
      { name: 'Docker', level: 85, color: 'bg-blue-500' },
      { name: 'AWS', level: 80, color: 'bg-orange-500' },
      { name: 'Vercel', level: 90, color: 'bg-black' },
      { name: 'Git', level: 95, color: 'bg-orange-600' },
      { name: 'Linux', level: 88, color: 'bg-yellow-600' },
      { name: 'CI/CD', level: 82, color: 'bg-purple-500' }
    ]
  }
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, categoryIndex) => (
            <ScrollReveal key={skillCategory.category} delay={categoryIndex * 0.2}>
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {skillCategory.category}
                </h3>
                
                <StaggeredReveal staggerDelay={0.1}>
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      className="mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: categoryIndex * 0.2 + techIndex * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 font-medium">{tech.name}</span>
                        <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                          {tech.level}%
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${tech.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                          transition={{ 
                            delay: categoryIndex * 0.2 + techIndex * 0.1 + 0.3,
                            duration: 1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </StaggeredReveal>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional skills */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Additional Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'UI/UX Design', 'Mobile Development', 'Machine Learning', 'Blockchain',
                'GraphQL', 'REST APIs', 'Microservices', 'Testing', 'Performance Optimization',
                'Security', 'Agile/Scrum', 'Project Management'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    variant="outline" 
                    className="bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}