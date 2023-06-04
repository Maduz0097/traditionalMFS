FROM node:17-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /host-app
# Copy app files
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# Build the app
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
