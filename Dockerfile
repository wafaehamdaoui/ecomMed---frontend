FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:latest
COPY --from=build /app/dist/ecom-med/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
