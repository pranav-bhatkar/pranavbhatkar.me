// Razorpay platform fee percentage
export const RAZORPAY_FEE_PERCENT = 2

export const formatINR = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount)
}

export const calculateWithPlatformFee = (amount: number): number => {
    return Math.round(amount * (1 + RAZORPAY_FEE_PERCENT / 100))
}
