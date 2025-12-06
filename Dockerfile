FROM node:20-slim

# タイムゾーンと Node 環境
ENV TZ=Asia/Tokyo
ENV NODE_ENV=production

# Python とビルドツールをインストール（oniguruma 対策）
RUN apt-get update && apt-get install -y \
  curl \
  git \
  python3 \
  make \
  g++ \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev  # 本番環境なら devDependency は省く（Shiki が必要なら omitしない）

COPY . .


# 環境変数の build-arg → env
ARG GA_ID
ARG NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY
ARG RECAPCHA_SECRET_KEY
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_SERVICE_DOMAIN

ENV GA_ID=$GA_ID
ENV NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=$NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY
ENV RECAPCHA_SECRET_KEY=$RECAPCHA_SECRET_KEY
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_SERVICE_DOMAIN=$NEXT_PUBLIC_SERVICE_DOMAIN

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
