'use client'

import { Dock, DockIcon } from '@/components/magicui/dock'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { Book, HomeIcon, Info, Network } from 'lucide-react'
import Link from 'next/link'

import ThemeSwitch from './ThemeSwitch'
import TransitionLink from './TransitionLink'
import { buttonVariants } from './shadcn/button'
import { Separator } from './shadcn/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './shadcn/tooltip'

const navbar = [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/about', icon: Info, label: 'About' },
    { href: '/blog', icon: Book, label: 'Blog' },
    { href: '/projects', icon: Network, label: 'Projects' },
]
export default function NavDock() {
    return (
        <TooltipProvider>
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex origin-bottom h-full max-h-14">
                <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
                <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
                    {navbar.map((item) => (
                        <DockIcon key={item.href}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <TransitionLink
                                        href={item.href}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                                            'size-12 rounded-full'
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </TransitionLink>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}

                    <Separator orientation="vertical" className="h-full py-2" />
                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <ThemeSwitch />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Theme</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </div>
        </TooltipProvider>
    )
}