# Unsplash Clone

A modern photo gallery application built with Next.js, featuring real photos from the Pexels API. This is a clone of Unsplash with a clean, responsive design.

## Features

- 🖼️ **Real Photos**: Fetches trending photos from Pexels API
- 🔍 **Search Functionality**: Search for photos by keywords
- 📱 **Responsive Design**: Works on all device sizes
- ⚡ **Fast Loading**: Optimized images with Next.js Image component
- 🎨 **Modern UI**: Clean, Unsplash-inspired interface

## Getting Started

### Prerequisites

1. Get a free API key from [Pexels](https://www.pexels.com/api/)
2. Node.js 18+ installed

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd assembly-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
# Pexels API Key
PEXELS_API_KEY=your_pexels_api_key_here

# Next.js Base URL (for API calls)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
