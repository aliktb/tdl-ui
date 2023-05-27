FROM node:18
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]
