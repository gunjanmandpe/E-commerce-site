# Project Report: Dynamic Multi-Category Catalog

## Overview
This project is a responsive, light-themed e-commerce web application that displays a multi-category product catalog. It features a full-page hero slideshow, sidebar category filtering, and a detailed product view with dynamic specification rendering.

## Tools & Technologies Used
- **Frontend Framework**: React.js (via Vite)
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS (Modern CSS variables, Flexbox, Grid)
- **Design Inspiration**: Premium e-commerce platforms like Apple and Tesla.

## Implementation Approach
1. **State-Driven Filtering**: Used React's `useState` and `useSearchParams` to synchronize category filters with the URL.
2. **Dynamic Prop Rendering**: Built a flexible Detail Page that iterates through the `itemprops` array, ensuring that any category displays its unique attributes correctly.
3. **Hero Slideshow**: Implemented a custom, auto-advancing slideshow with unique marketing copy for each slide and pill-shaped active dot indicators.
4. **Section-Based Navigation**: Implemented hash-based navigation (#home, #products, #deals, #about) with smooth scrolling support across pages.
5. **Light Theme**: Developed a clean, high-contrast light theme with soft shadows and premium typography.

## Time Taken
- **Total Duration**: ~4 hours (including section expansion)

## Key Features
- **Full-Page Slideshow**: Stunning visuals with centered text overlays.
- **Dynamic Category Sidebar**: Real-time filtering with item counts.
- **Deals Section**: A dedicated area for limited-time offers and discounts.
- **About Section**: Professional brand storytelling with high-quality imagery and stats.
- **Proper E-commerce Navbar**: Functional links with active states and mobile support.
