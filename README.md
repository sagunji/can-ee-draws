# Canada Express Entry Draws API

A RESTful API service that provides access to historical data of Canada's Express Entry draws. This API helps track and analyze Express Entry draw patterns, including CRS scores, invitation numbers, and category-specific draws.

## 🌟 Features

- Retrieve all Express Entry draws
- Filter draws by year and category
- Get the latest draw (closest to today's date)
- Swagger API documentation

## 🚀 API Endpoints

### Base URL

```
https://can-ee-draws.onrender.com/api
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

### API Documentation

For detailed API documentation, visit: [https://can-ee-draws.onrender.com/api/docs](https://can-ee-draws.onrender.com/api/docs)

## 💻 Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/can-ee-draws.git
   cd can-ee-draws
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Access the API at `http://localhost:3000/api`

## 📦 Dependencies

- Express.js - Web framework
- Swagger UI Express - API documentation
- Swagger JSDoc - API documentation generation
- Nodemon - Development server with hot reloading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data source: [IRCC Express Entry Draws](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html)
- Inspired by the need for easy access to Express Entry draw history
