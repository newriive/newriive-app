# newriive-app

A modern web application built with Next.js, Tailwind CSS, AWS Cognito, and DynamoDB.

## Project Structure

```plaintext
.
├── app/                # Next.js app directory
├── components/         # Reusable React components
├── lib/                # Utility libraries (e.g., DynamoDB)
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Global styles (Tailwind, etc.)
├── .github/            # GitHub workflows and templates
├── .env.example        # Example environment variables
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Copy the example environment file and update values**

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- Copy `.env.example` to `.env.local` and fill in the required values for AWS and other integrations.

## Testing

- Run all tests with:

  ```bash
  npm test
  ```

## Continuous Integration

- Pull requests and merges to `main` are automatically built and linted via GitHub Actions workflows in `.github/workflows/`.

## Contributing

- See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.
- For AI-assisted coding, see [`COPILOT_INSTRUCTIONS.md`](COPILOT_INSTRUCTIONS.md).

## License

This project is licensed under the MIT License.

---

Happy coding!
