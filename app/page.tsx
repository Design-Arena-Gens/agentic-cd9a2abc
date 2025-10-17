"use client";

import { useEffect, useMemo, useState } from 'react';

type LeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  consent: boolean;
  source?: string;
};

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function LandingPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const utmSource = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const url = new URL(window.location.href);
    return url.searchParams.get('utm_source') ?? undefined;
  }, []);

  useEffect(() => {
    // Autofocus on name for quicker mobile funnel
    const el = document.getElementById('fullName') as HTMLInputElement | null;
    if (el) el.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName || !email) {
      setError('Please enter your name and email.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setError('Please agree to be contacted to continue.');
      return;
    }

    setLoading(true);
    try {
      const payload: LeadPayload = {
        fullName,
        email,
        phone: phone || undefined,
        consent,
        source: utmSource,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to submit');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-white">
        <header className="border-b">
          <div className="container-narrow flex items-center h-14">
            <div className="font-heading text-xl font-bold">Crumbl</div>
          </div>
        </header>
        <section className="container-narrow py-10 text-center">
          <h1 className="h1">You're on the list!</h1>
          <p className="p mt-3">
            Check your email for the next steps. Complete the quick survey and
            required partner offers to unlock your $100 Crumbl gift card.
          </p>
          <a href="#offers" className="btn btn-primary mt-6">See Required Offers</a>
        </section>
        <OffersSection />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container-narrow flex items-center h-14">
          <div className="font-heading text-xl font-bold">Crumbl</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container-narrow py-10">
        <div className="rounded-2xl border bg-crumblPink/20 p-5 sm:p-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-crumblPink px-3 py-1 text-sm font-semibold text-black">
              Limited Spots • Mobile-First
            </div>
            <h1 className="h1 mt-4">
              Get a $100 Crumbl Gift Card
            </h1>
            <p className="p mt-3">
              Complete a short survey and several partner offers to qualify. Perfect for TikTok and social users who love cookies and deals.
            </p>
          </div>

          {/* Lead Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">Full name</label>
              <input
                id="fullName"
                type="text"
                inputMode="text"
                autoComplete="name"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Mobile number (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span>
                I agree to be contacted via email and/or SMS about this promotion and related offers. Message/data rates may apply. You can opt out at any time.
              </span>
            </label>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-base"
            >
              {loading ? 'Submitting…' : 'Claim Your Spot'}
            </button>

            <p className="mt-2 text-center text-xs text-gray-600">
              By continuing, you acknowledge this promotion requires completion of a survey and several partner offers to qualify for the $100 Crumbl gift card.
            </p>
          </form>
        </div>
      </section>

      <TrustSection />
      <HowItWorks />
      <OffersSection />
      <FAQSection />
      <Footer />
    </main>
  );
}

function TrustSection() {
  return (
    <section className="container-narrow py-8">
      <ul className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
        <li className="rounded-lg border p-3 text-sm">SSL Secured</li>
        <li className="rounded-lg border p-3 text-sm">No Spam</li>
        <li className="rounded-lg border p-3 text-sm">Mobile First</li>
        <li className="rounded-lg border p-3 text-sm">US Only</li>
      </ul>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: 'Join the waitlist',
      body: 'Enter your info to secure your spot.',
    },
    {
      title: 'Complete survey',
      body: 'Answer a few quick questions about your preferences.',
    },
    {
      title: 'Finish required offers',
      body: 'Complete several partner offers to qualify.',
    },
    {
      title: 'Claim $100 gift card',
      body: 'Receive instructions to redeem your Crumbl gift card.',
    },
  ];
  return (
    <section className="container-narrow py-10">
      <h2 className="h2 text-center">How it works</h2>
      <ol className="mt-6 space-y-4">
        {steps.map((s, idx) => (
          <li key={idx} className="rounded-xl border p-4">
            <div className="font-heading text-lg font-semibold">{idx + 1}. {s.title}</div>
            <p className="p mt-1">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function OffersSection() {
  const offers = [
    { name: 'Streaming Trial', desc: 'Try 7 days free of a popular streaming service.' },
    { name: 'Cashback App', desc: 'Install and activate 1 cashback offer.' },
    { name: 'Gaming Offer', desc: 'Reach level 10 in a featured mobile game.' },
  ];
  return (
    <section id="offers" className="container-narrow py-10">
      <h2 className="h2 text-center">Required partner offers</h2>
      <ul className="mt-6 space-y-4">
        {offers.map((o, i) => (
          <li key={i} className="rounded-xl border p-4">
            <div className="font-heading text-lg font-semibold">{o.name}</div>
            <p className="p mt-1">{o.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: 'Is this really free?',
      a: 'Yes. To qualify, you must complete the survey and required partner offers. No purchase necessary beyond offer requirements.',
    },
    {
      q: 'How long does it take?',
      a: 'Most people finish within 15–30 minutes depending on the selected offers.',
    },
    {
      q: 'When do I receive the gift card?',
      a: 'After verification of completed offers, you will receive redemption instructions by email or SMS.',
    },
  ];
  return (
    <section className="container-narrow py-10">
      <h2 className="h2 text-center">FAQ</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="font-heading text-lg font-semibold">{f.q}</div>
            <p className="p mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container-narrow py-8 text-center text-xs text-gray-600">
        <p>
          This promotion is not affiliated with or endorsed by Crumbl. By providing your information, you agree to be contacted regarding this promotion and related offers. See our Privacy notice.
        </p>
      </div>
    </footer>
  );
}
