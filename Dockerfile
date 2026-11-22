FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG SITE_URL=https://tendendo.com
ARG CONTACT_EMAIL=tendendo.oficial@gmail.com
ARG FACEBOOK_URL
ARG NEXT_PUBLIC_ALLOWED_CAMPAIGNS
ENV SITE_URL=$SITE_URL \
    CONTACT_EMAIL=$CONTACT_EMAIL \
    FACEBOOK_URL=$FACEBOOK_URL \
    NEXT_PUBLIC_ALLOWED_CAMPAIGNS=$NEXT_PUBLIC_ALLOWED_CAMPAIGNS \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
