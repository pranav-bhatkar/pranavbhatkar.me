# PostHog Analytics Setup

This portfolio now includes comprehensive PostHog analytics tracking. Follow these steps to set up PostHog:

## 1. Create PostHog Account

1. Go to [PostHog](https://posthog.com) and create a free account
2. Create a new project
3. Copy your Project API Key from the project settings

## 2. Environment Variables

Create a `.env.local` file in your project root and add:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 3. Analytics Events Tracked

The following events are automatically tracked:

### Page Views
- Automatic page view tracking on route changes
- Includes referrer and timestamp information

### User Interactions
- `contact_clicked` - When users click contact buttons/links
- `projects_clicked` - When users click project-related links
- `social_clicked` - When users click social media links
- `blog_post_clicked` - When users click on blog posts
- `view_all_projects_clicked` - When users click "View All Projects"
- `view_all_blog_clicked` - When users click "View All Blog Posts"
- `scroll_to_top_clicked` - When users click scroll to top button
- `footer_link_clicked` - When users click footer links
- `contact_form_submitted` - When users submit the contact form
- `resume_downloaded` - When users download the resume

### Event Properties
Each event includes relevant properties like:
- `location` - Where the event occurred (hero, about, contact, etc.)
- `platform` - For social media clicks
- `project` - For project-related events
- `slug` - For blog post clicks

## 4. Custom Analytics Hook

Use the `useAnalytics` hook in your components:

```tsx
import { useAnalytics } from '@/hooks/useAnalytics'

function MyComponent() {
  const { trackEvent, trackPageView, identifyUser } = useAnalytics()
  
  const handleClick = () => {
    trackEvent('button_clicked', { button: 'cta' })
  }
  
  return <button onClick={handleClick}>Click me</button>
}
```

## 5. PostHog Dashboard

Once set up, you can view analytics in your PostHog dashboard:
- User behavior and engagement
- Popular pages and content
- Conversion funnels
- Custom event tracking
- User journey analysis

## 6. Privacy Compliance

PostHog is GDPR compliant and includes:
- Automatic user identification
- Data retention controls
- Privacy settings
- Cookie consent management

## 7. Development vs Production

- In development, PostHog events are logged to console
- In production, events are sent to PostHog servers
- No sensitive data is tracked
- All tracking respects user privacy settings