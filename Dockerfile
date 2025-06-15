# Install dependencies only when needed
FROM node:lts AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:lts AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_WEATHER_API_KEY
ENV NEXT_PUBLIC_WEATHER_API_KEY=${NEXT_PUBLIC_WEATHER_API_KEY}

RUN npm run build

# Production image
FROM node:lts AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]