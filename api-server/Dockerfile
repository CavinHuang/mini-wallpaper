# use docker node latest
FROM node:latest
# create a directory to run docker
WORKDIR /app
# copy package.json into the new directory
COPY package.json /app
COPY pnpm-lock.yaml /app

# install pnpm
RUN npm install -g pnpm --registry https://registry.npmmirror.com/ && pnpm fetch --registry https://registry.npmmirror.com/

# install the dependencies
RUN pnpm install -r --offline
# copy all other files into the app directory
COPY . /app
VOLUME ["/app/node_modules/", "/projects/.pnpm-store/"]
# open port 5000(这个是服务器访问端口)
EXPOSE 2333
# run the server
CMD pnpm start