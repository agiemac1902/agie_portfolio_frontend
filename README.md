# Portfolio

A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- React
- Shadcn UI Components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local with your actual values
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_API_URL`: The base URL for API requests (default: `/api`)
- `NEXT_PUBLIC_BACKEND_URL`: The URL of your backend server
- `BACKEND_URL`: The URL of your backend server (used server-side)

See `.env.example` for more details.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## License

MIT 