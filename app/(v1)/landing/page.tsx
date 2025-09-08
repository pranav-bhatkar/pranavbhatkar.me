import AboutSection from '@/components/home/AboutSection'
import BlogPreview from '@/components/home/BlogPreview'
import ContactSection from '@/components/home/ContactSection'
import ModernHero from '@/components/home/ModernHero'
import ModernProjects from '@/components/home/ModernProjects'
import SkillsSection from '@/components/home/SkillsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'

export default async function Page() {
    return (
        <main className="overflow-x-hidden">
            <ModernHero />
            <AboutSection />
            <SkillsSection />
            <ModernProjects />
            <TestimonialsSection />
            <BlogPreview />
            <ContactSection />
        </main>
    )
}
