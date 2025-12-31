'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'

interface ContributeButtonProps {
    title: string
    amount: number
}

export function ContributeButton({ title, amount }: ContributeButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-md"
            >
                <Heart className="h-4 w-4" />
                Contribute
            </button>

            {/* Coming Soon Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="w-full max-w-md rounded-xl bg-card border border-border p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-full bg-primary/20 p-3">
                                <Heart className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="mb-2 text-center text-2xl font-bold text-card-foreground">
                            Coming Soon!
                        </h3>
                        <p className="mb-6 text-center text-muted-foreground">
                            The contribution feature is currently under development. Check back soon
                            to support this wishlist item!
                        </p>
                        <div className="rounded-lg border border-border bg-muted p-4">
                            <div className="mb-1 text-sm font-medium text-foreground">
                                Item: {title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Remaining: ${amount.toLocaleString()}
                            </div>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:opacity-90"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

