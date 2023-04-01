FROM node:16
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]



# # build environment
# FROM node:16-alpine as build
# WORKDIR /app
# COPY . .
# RUN npm ci
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# # Copy .env file and shell script to container
# WORKDIR /usr/share/nginx/html
# COPY ./env.sh .
# COPY .env .


# CMD ["nginx", "-g", "daemon off;"]

