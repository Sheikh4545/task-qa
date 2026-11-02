FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

ENV CI=true

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
# For Chromium-only runs, use:
# CMD ["npx", "playwright", "test", "--project=chromium"]
