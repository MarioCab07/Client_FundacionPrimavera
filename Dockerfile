FROM node:22-alpine3.21 AS build


# Install corepack and yarn
RUN corepack enable && corepack prepare yarn@stable --activate


# Install dependencies only when needed
WORKDIR /app

COPY package*.json yarn.lock .yarnrc.yml ./
RUN yarn install



COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf

COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  # SPA
  location / {
    try_files $uri /index.html;
  }

  # Proxy al backend dentro de la red de Docker
  location /api/ {
    proxy_pass http://backend:8008;   # SIN barra final para conservar /api en la URI
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
EOF

EXPOSE 80