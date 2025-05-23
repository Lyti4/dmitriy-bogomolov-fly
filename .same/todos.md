# МебельЭко - Project Todos

## Project Status
- [x] Initial repo clone
- [x] Dependencies installation
- [x] Start development server

## Current Tasks
- [x] Review project structure
- [x] Understand existing functionality
- [x] Identify any issues or bugs
- [x] Make improvements if needed
- [x] Prepare for deployment

## Project Structure Review
- Main components located in src/components/
- Image assets in public/images/
- Portfolio data in src/data/portfolio/ (Markdown files)
- Netlify CMS configuration in public/admin/
- Main styling using Tailwind CSS

## Functionality Understanding
- Site is a furniture workshop portfolio website
- Main sections include: Hero banner, Benefits, Portfolio, Services, About, Contacts
- Portfolio has filtering by categories: Proven, Kitchens, Cabinets, Tables, Bathroom
- Portfolio items display in a grid with image carousels
- Images can be viewed in a modal lightbox
- Netlify CMS is set up for content management (portfolio items)
- OptimizedImage component used for lazy loading and image optimization

## Issues Identified
- The Portfolio.tsx component is using hardcoded data instead of loading from markdown files
- Image paths in Portfolio.tsx need leading slash fix (line 64 in OptimizedImage.tsx handles this)
- The server is running correctly but may need better image optimization
- Netlify CMS integration exists but is not fully utilized for dynamic content

## Issues Fixed
- Fixed build script for Netlify deployment by modifying package.json
- Updated vite.config.ts with better rollup options for optimized builds
- Simplified the build process by removing problematic netlify.cjs file
- Fixed the direct copy of public folder contents to dist folder
- Updated build configuration in netlify.toml to use the right build command
