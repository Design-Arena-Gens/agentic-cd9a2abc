import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Get a $100 Crumbl Gift Card — Limited Spots',
  description:
    'Join the waitlist to claim a $100 Crumbl gift card by completing a short survey and exclusive partner offers. Mobile-first, young adult friendly.',
  openGraph: {
    title: 'Get a $100 Crumbl Gift Card — Limited Spots',
    description:
      'Complete a quick survey + partner offers to unlock a $100 Crumbl gift card. Limited spots available. Mobile-first, designed for TikTok and social traffic.',
    url: 'https://agentic-cd9a2abc.vercel.app',
    siteName: 'Crumbl Rewards',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a $100 Crumbl Gift Card — Limited Spots',
    description:
      'Complete a quick survey + partner offers to unlock a $100 Crumbl gift card. Limited spots available.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
