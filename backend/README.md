# Crypto to Fiat Currency Converter - Backend

## Overview

The backend of the Crypto to Fiat Currency Converter is built using Express. It handles the logic for converting cryptocurrency values to fiat currency and manages communication with external APIs.

## Tech Stack

- Express
- Joi for input validation
- Logger with error logging to `appError.log`
- Route-Controller-Service structure

## Getting Started

To run the backend locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.

### Installation
1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a .env file in the server directory and add your Coin Market Cap API key and Logger env:
    ```env
    CMC_CRYPTO_API=your_coin_market_cap_api_key
    NODE_ENV=[dev or prod]
    ```

### Usage
Start the backend server:
    ```bash
    npm start
    ```
The backend will be running at http://localhost:5000.

### Logging
Errors are logged to appError.log using a logger.

### Input Validation
Joi is used for input validation.

## Contributing
Contributions to the backend are welcome! If you'd like to contribute,

## License
This project is licensed under the MIT License.