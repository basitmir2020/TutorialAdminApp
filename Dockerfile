FROM node:18-alpine3.19 AS build

WORKDIR /src/app

RUN npm cache clean --force

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build  /src/app/dist/tutorial-web-app/browser/ /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
