import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import Providers from '@/components/site/Providers';
import ExportMode from '@/components/site/ExportMode';

// The brand typeface is a commercial grotesk (named first in the CSS stacks in globals.css; never printed on a
// page). Closest free stand-ins: Inter for text (same Swiss neo-grotesk proportions, a large x-height, tabular
// figures for the MW numerals, and an optical-size axis like the "Optical size" note of the type slide) and
// Inter Tight for display sizes and the tightly set word-mark.
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], axes: ['opsz'], display: 'swap' });
const interTight = Inter_Tight({ variable: '--font-inter-tight', subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: { template: '%s · Best Grid', default: 'Best Grid' },
  description: 'Best Grid brand system: logo, colour, type, motion, product and the physical brand.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <ExportMode />
      </body>
    </html>
  );
}
