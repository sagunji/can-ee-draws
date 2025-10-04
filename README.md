# Canada Express Entry Draws API

A RESTful API service that provides access to historical data of Canada's Express Entry draws. This API helps track and analyze Express Entry draw patterns, including CRS scores, invitation numbers, category-specific draws, and candidate pool distribution.

### 🎉 Check out my app to see more Canada immigration related features

[![Download on the App Store](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg)](https://apps.apple.com/us/app/immime/id6745764350)

## 🌟 Features

- Retrieve all Express Entry draws
- Filter draws by year and category
- Get the latest draw (closest to today's date)
- View CRS score distribution in the candidate pool
- Automated updates via GitHub Actions
- Deployed on Cloudflare Workers

## 🚀 API Endpoints

### Base URL

```
https://can-ee-draws.karanjit-sagun01.workers.dev
```

### Available Endpoints

1. **Get All Draws**

   ```
   GET /draws
   ```

   Query Parameters:

   - `year` (optional): Filter draws by year (e.g., 2023, 2024)
   - `category` (optional): Filter draws by category (e.g., PNP, CEC, French, Healthcare)

2. **Get Latest Draw**

   ```
   GET /draws/latest
   ```

   Returns the draw closest to today's date

3. **Get Candidate Pool Distribution**
   ```
   GET /pool
   ```
   Returns the current CRS score distribution of candidates in the Express Entry pool

### API Documentation

For detailed API documentation, visit: [https://can-ee-draws.workers.dev/api/docs](https://can-ee-draws.workers.dev/api/docs)

## 💻 Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/can-ee-draws.git
   cd can-ee-draws
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm dev
   ```

4. Build the project

   ```bash
   pnpm build
   ```

5. Deploy to Cloudflare Workers
   ```bash
   pnpm deploy
   ```

## 🔧 Data Extraction

The project includes a data extraction script that fetches the latest Express Entry draw data from IRCC and updates the local data files.

### Running the Extractor

1. **Basic extraction** (without webhook notification):

   ```bash
   node ./scripts/extractor.js
   ```

2. **With webhook notification**:
   ```bash
   WEBHOOK_API=https://your-webhook-url.com/api/notify node ./scripts/extractor.js
   ```

### What the Extractor Does

- Fetches the latest draw data from IRCC's official API
- Converts the data to the project's format
- Updates `data/ee-draws.json` with new draw information
- Updates `data/distribution.json` with candidate pool distribution
- Sends a webhook notification (if `WEBHOOK_API` is set)
- Handles duplicate draws gracefully

### Environment Variables

- `WEBHOOK_API` (optional): URL to send notifications when new draws are found

### Automated Extraction

The extractor runs automatically via GitHub Actions:

- **Schedule**: Every 5 minutes from 10:00-22:00 UTC, Monday-Friday
- **Manual trigger**: Available via GitHub Actions workflow_dispatch
- **Webhook**: Configured via GitHub repository secrets

## 🔄 Automated Workflows

### GitHub Actions

1. **Pull Request Checks**

   - Automatically runs build checks on pull requests
   - Ensures code quality before merging

2. **Automated Deployment**
   - Automatically deploys to Cloudflare Workers when code is pushed to main
   - Runs data updates every 30 minutes during business hours (UTC 10:00-17:00, Mon-Fri)

## 📦 Tech Stack

- Hono - Lightweight web framework
- Cloudflare Workers - Edge computing platform
- pnpm - Package manager
- Rollup - Module bundler
- GitHub Actions - CI/CD and automation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data source: [IRCC Express Entry Draws](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html)
- Inspired by the need for easy access to Express Entry draw history
