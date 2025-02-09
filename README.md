# Maps Explorer

A modern web application for exploring places around you, built with React, TypeScript, and the Google Maps API. View the live version at [https://maps.buremba.com/](https://maps.buremba.com/).

## Features

- 🗺️ Interactive map interface with custom markers
- 🏠 Set home location via search or map click
- 🚶‍♂️ Calculate walking distances to multiple selected places
- 📍 Filter places by venue type (restaurants, cafes, etc.)
- 📱 Responsive design for mobile and desktop
- 🌓 System theme support (light/dark mode)
- 🔍 Advanced search with Google Places API
- 📊 Sortable list view with place details
- 🔗 Direct links to Google Maps for each place

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Google Maps JavaScript API & Places API
- TailwindCSS for styling
- Tanstack Table for list management
- Lucide Icons for beautiful UI elements

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API key with Maps JavaScript API and Places API enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/maps-explorer.git
   cd maps-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Google Maps API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables

The following environment variables are required:

- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

For development, create a `.env` file in the root directory. For production, set these in your hosting platform's environment settings.

## Deployment

The app is currently deployed on Cloudflare Pages. To deploy your own version:

1. Fork this repository
2. Connect your fork to Cloudflare Pages
3. Set the environment variables in your Cloudflare Pages project settings
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Maps Platform](https://developers.google.com/maps) for their excellent mapping services
- [TailwindCSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tanstack Table](https://tanstack.com/table) for the powerful table functionality
