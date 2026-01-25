'use client'

import ContributionMascot from '@/components/ContributionMascot'
import CustomSlider from '@/components/CustomSlider'
import { Button } from '@/components/shadcn/button'
import { Checkbox } from '@/components/shadcn/checkbox'
import { Input } from '@/components/shadcn/input'
import { Textarea } from '@/components/shadcn/textarea'
import { api } from '@/convex/_generated/api'
import { RAZORPAY_FEE_PERCENT, calculateWithPlatformFee, formatINR } from '@/data/wishlistData'
import { useAction, useQuery } from 'convex/react'
import { ArrowLeft, Check, CreditCard, IndianRupee } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function ContributePage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const item = useQuery(api.wishlist.getById, { id })
    const createOrder = useAction(api.payments.createPaymentOrder)

    const [amount, setAmount] = useState(500)
    const [customAmount, setCustomAmount] = useState('')
    const [coverPlatformFee, setCoverPlatformFee] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [showPublicly, setShowPublicly] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)

    const communityAmount = item ? item.collectedAmount : 0
    const totalRaised = item ? item.selfContribution + communityAmount : 0
    const remaining = item ? Math.max(0, item.targetAmount - totalRaised) : 0

    // Slider constraints
    const maxSliderAmount = remaining
    const minSliderAmount = 50

    // Calculate final amount with platform fee if opted
    const finalAmount = useMemo(() => {
        return coverPlatformFee ? calculateWithPlatformFee(amount) : amount
    }, [amount, coverPlatformFee])

    const platformFeeAmount = useMemo(() => {
        return coverPlatformFee ? finalAmount - amount : 0
    }, [finalAmount, amount, coverPlatformFee])

    const handleSliderChange = (value: number) => {
        setAmount(value)
        setCustomAmount('')
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '')
        setCustomAmount(value)
        if (value) {
            const parsed = parseInt(value, 10) || 0
            setAmount(Math.max(parsed, 0))
        }
    }

    // Calculate quick amounts as percentages (10, 25, 50, 75, 100%) of the max allowable amount.
    const quickAmountPercents = [0.1, 0.25, 0.5, 0.75, 1]
    const quickAmounts = useMemo(() => {
        // Only show quick amounts if a valid max amount exists and is at least the minimum
        if (isNaN(maxSliderAmount) || maxSliderAmount < minSliderAmount) {
            return []
        }
        return quickAmountPercents
            .map((pct) =>
                Math.max(
                    minSliderAmount,
                    Math.round((maxSliderAmount * pct) / 100) * 100 > maxSliderAmount
                        ? Math.round(maxSliderAmount * pct)
                        : Math.round((maxSliderAmount * pct) / 100) * 100
                )
            )
            .map((val) => Math.min(val, maxSliderAmount))
    }, [maxSliderAmount, minSliderAmount])

    const handleProceed = async () => {
        if (amount < minSliderAmount || !item) return
        if (!name.trim()) {
            alert('Please enter your name')
            return
        }
        if (!email.trim()) {
            alert('Please enter your email')
            return
        }
        if (!phone.trim()) {
            alert('Please enter your phone number')
            return
        }
        if (!message.trim()) {
            alert('Please enter a message')
            return
        }

        setIsProcessing(true)

        try {
            // Mock payment - create order and immediately succeed
            const orderData = await createOrder({
                wishlistItemId: item._id,
                amount: finalAmount,
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                message: message.trim(),
                showPublicly,
            })

            // Simulate payment processing delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Mock: Payment always succeeds
            if (orderData.success) {
                router.push(`/wishlist/${id}?payment=success&order_id=${orderData.orderId}`)
            } else {
                throw new Error('Payment failed')
            }
        } catch (error) {
            console.error('Error processing payment:', error)
            alert('Failed to process payment. Please try again.')
            setIsProcessing(false)
        }
    }

    if (item === undefined) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-lg text-muted-foreground">Loading...</div>
                </div>
            </main>
        )
    }

    if (!item) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium mb-4">Item not found</h1>
                    <Link href="/wishlist">
                        <Button variant="heroOutline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to wishlist
                        </Button>
                    </Link>
                </div>
            </main>
        )
    }

    const isValidAmount = amount >= minSliderAmount

    return (
        <main className="min-h-screen bg-background py-20">
            {/* Header */}
            <header className="border-b border-border">
                <div className="container px-6 md:px-8 py-6">
                    <Link
                        href={`/wishlist/${id}`}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to item
                    </Link>
                </div>
            </header>

            <div className="container px-6 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left side - Item preview & Mascot */}
                    <div className="space-y-8">
                        {/* Item card */}
                        <div className="border border-border p-6">
                            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                                Contributing to
                            </p>
                            <h2 className="text-2xl font-medium mb-2">{item.title}</h2>
                            <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Goal</span>
                                <span className="font-medium">{formatINR(item.targetAmount)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-1">
                                <span className="text-muted-foreground">Remaining</span>
                                <span className="font-medium text-foreground/70">
                                    {formatINR(remaining)}
                                </span>
                            </div>
                        </div>

                        {/* Mascot */}
                        <div className="border border-border p-8 flex items-center justify-center min-h-[320px]">
                            <ContributionMascot amount={amount} maxAmount={maxSliderAmount} />
                        </div>
                    </div>

                    {/* Right side - Amount selection & Payment */}
                    <div className="space-y-8">
                        {/* Amount display */}
                        <div className="text-center py-8 border border-border">
                            <p className="text-sm text-muted-foreground mb-2">Your contribution</p>
                            <div className="text-5xl md:text-6xl font-medium tracking-tight">
                                {formatINR(amount)}
                            </div>
                            {!isValidAmount && (
                                <p className="text-xs text-destructive mt-2">
                                    Minimum amount is {formatINR(minSliderAmount)}
                                </p>
                            )}
                        </div>

                        {/* Slider */}
                        <div className="px-2">
                            <CustomSlider
                                value={Math.min(Math.max(amount, minSliderAmount), maxSliderAmount)}
                                onChange={handleSliderChange}
                                min={minSliderAmount}
                                max={maxSliderAmount}
                                step={50}
                            />
                        </div>

                        {/* Quick amounts */}
                        <div className="flex flex-wrap gap-2">
                            {quickAmounts.map((quickAmount) => (
                                <button
                                    key={quickAmount}
                                    onClick={() => {
                                        setAmount(quickAmount)
                                        setCustomAmount('')
                                    }}
                                    className={`px-4 py-2 text-sm border transition-colors ${
                                        amount === quickAmount
                                            ? 'border-foreground bg-foreground text-background'
                                            : 'border-border hover:border-foreground'
                                    }`}
                                >
                                    {formatINR(quickAmount)}
                                </button>
                            ))}
                        </div>

                        {/* Custom amount */}
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter custom amount (min ₹50)"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className="pl-9 h-12 text-lg border-border focus:border-foreground"
                            />
                        </div>

                        {/* Contact information */}
                        <div className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Your name *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-12"
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Your email *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12"
                                required
                            />
                            <Input
                                type="tel"
                                placeholder="Your phone number *"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-12"
                                required
                            />
                            <Textarea
                                placeholder="Your message *"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[100px] resize-none"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Show publicly option */}
                        <div className="border border-border p-4">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="showPublicly"
                                    checked={showPublicly}
                                    onCheckedChange={(checked) => setShowPublicly(checked === true)}
                                    className="mt-0.5"
                                />
                                <div className="flex-1">
                                    <label
                                        htmlFor="showPublicly"
                                        className="text-sm font-medium cursor-pointer flex items-center gap-2"
                                    >
                                        Show this contribution publicly
                                        {showPublicly && (
                                            <Check className="w-4 h-4 text-green-600" />
                                        )}
                                    </label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {showPublicly
                                            ? 'Your name and message will be visible on the wishlist page'
                                            : 'Your contribution will remain anonymous'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Platform fee option */}
                        <div className="border border-border p-4">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="platformFee"
                                    checked={coverPlatformFee}
                                    onCheckedChange={(checked) =>
                                        setCoverPlatformFee(checked === true)
                                    }
                                    className="mt-0.5"
                                />
                                <div className="flex-1">
                                    <label
                                        htmlFor="platformFee"
                                        className="text-sm font-medium cursor-pointer flex items-center gap-2"
                                    >
                                        Cover the {RAZORPAY_FEE_PERCENT}% platform fee
                                        {coverPlatformFee && (
                                            <Check className="w-4 h-4 text-green-600" />
                                        )}
                                    </label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {coverPlatformFee
                                            ? `You'll pay ${formatINR(finalAmount)} (includes ${formatINR(platformFeeAmount)} fee)`
                                            : `Adding ${formatINR(Math.round((amount * RAZORPAY_FEE_PERCENT) / 100))} ensures I receive the full ${formatINR(amount)}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment summary */}
                        {isValidAmount && (
                            <div className="bg-muted/30 p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Contribution</span>
                                    <span>{formatINR(amount)}</span>
                                </div>
                                {coverPlatformFee && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Platform fee ({RAZORPAY_FEE_PERCENT}%)
                                        </span>
                                        <span>{formatINR(platformFeeAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-medium pt-2 border-t border-border">
                                    <span>Total</span>
                                    <span>{formatINR(finalAmount)}</span>
                                </div>
                            </div>
                        )}

                        {/* Proceed button */}
                        <Button
                            variant="hero"
                            size="xl"
                            className="w-full"
                            onClick={handleProceed}
                            disabled={
                                !isValidAmount ||
                                isProcessing ||
                                !name.trim() ||
                                !email.trim() ||
                                !phone.trim() ||
                                !message.trim()
                            }
                        >
                            <CreditCard className="w-5 h-5 mr-2" />
                            {isProcessing ? 'Processing...' : 'Complete Contribution'}
                        </Button>

                        {/* Payment methods info */}
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-2">
                                Mock payment integration - will be replaced with Razorpay
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Payment processing is simulated for testing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
