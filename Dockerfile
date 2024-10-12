FROM node:18-alpine
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm ci
COPY . .
RUN npm run build
CMD npm run start