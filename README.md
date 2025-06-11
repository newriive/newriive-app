# 🗺️ newriive-app

**Newriive** is a full-stack web application designed to support immigrants through personalized tools and resources — built entirely on AWS.

This repo contains the dynamic app: user authentication, dashboards, and future service modules.

---

## 🚀 Tech Stack

| Layer        | Technology                       |
|--------------|-----------------------------------|
| Frontend     | [Next.js (App Router)](https://nextjs.org/docs/app) + Tailwind CSS |
| Auth         | [Amazon Cognito](https://aws.amazon.com/cognito/) |
| Backend API  | AWS Lambda + API Gateway (via Next.js routes or serverless) |
| Database     | [DynamoDB](https://aws.amazon.com/dynamodb/) |
| Deployment   | S3 + CloudFront or AppRunner      |

---

## 📁 Project Structure

```bash
newriive-app/
├── app/                  # App Router pages and routes
├── components/           # UI components
├── lib/                  # AWS SDK logic (auth, db)
├── styles/               # Tailwind CSS styles
├── public/               # Static assets (favicon, OG)
├── .github/workflows/    # CI/CD (optional)
├── .env.local.example    # Environment variable template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🧪 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/newriive/newriive-app.git
cd newriive-app
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Fill in with:

```env
COGNITO_USER_POOL_ID=...
COGNITO_CLIENT_ID=...
DYNAMODB_TABLE_USERS=Users
DYNAMODB_TABLE_CHECKLIST=Checklist
```

---

## 🛠 Local Development

```bash
npm run dev
```

---

## 🧱 Infrastructure Setup

| Service     | Setup Guide |
|-------------|-------------|
| Cognito     | [AWS Docs](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) |
| DynamoDB    | [AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html) |
| S3 + CloudFront | [Static Site Hosting](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html) |

---

## 📌 Roadmap

- [x] Static site via S3 (see [newriive-site](https://github.com/newriive/newriive-site))
- [ ] Auth via Cognito
- [ ] Checklist tracker (DynamoDB)
- [ ] User dashboard UI
- [ ] Waitlist → onboard flow
- [ ] Real-time feedback collection
- [ ] Admin dashboard

---

## 📄 License

MIT — see [LICENSE](./LICENSE)
