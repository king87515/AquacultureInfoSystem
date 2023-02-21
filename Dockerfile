FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"] 
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 80
CMD npm start