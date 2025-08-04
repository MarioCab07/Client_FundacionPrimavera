FROM node:22-alpine3.21


# Install corepack and yarn
RUN corepack enable && corepack prepare yarn@stable --activate


# Install dependencies only when needed
WORKDIR /app

COPY package*.json yarn.lock .yarnrc.yml ./
RUN yarn install



COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]