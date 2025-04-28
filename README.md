<p align="center">
  <img src="https://gist.githubusercontent.com/sagunji/8c0138a7af3e4cb16059261c1a8be691/raw/d26d6d84abdbd1277747565b574f252fa9ab63c0/canoeh.svg" alt="Canada NOCs Logo" height="120"/>
</p>

# Canada Express Entry Draws API

A RESTful API service that provides access to historical data of Canada's Express Entry draws. This API helps track and analyze Express Entry draw patterns, including CRS scores, invitation numbers, category-specific draws, and candidate pool distribution.

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
