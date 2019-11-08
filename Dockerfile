FROM node:8
WORKDIR /Front
COPY . /Front
RUN npm install
RUN npm run build
CMD ["npm","start"]
