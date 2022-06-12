FROM        ubuntu:20.04

ENV         TZ Asia/Seoul
ARG         DEBIAN_FRONTEND=noninteractive

RUN         apt-get -y update \
            && apt-get -y upgrade \
            && apt-get -y install curl wget vim git redis-server

# puppeteer 전처리
RUN         apt-get -y install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
            libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
            libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
            libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
            libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 \
            lsb-release xdg-utils wget libgbm1

# nvm, node.js 설치
RUN         apt-get install -y -q --no-install-recommends \
            apt-transport-https \
            build-essential \
            ca-certificates \
            libssl-dev \
            && rm -rf /var/lib/apt/lists/*

ENV         NVM_DIR /root/.nvm
ENV         NODE_VERSION 14.19.0

RUN         wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
            && . $NVM_DIR/nvm.sh \
            && nvm install $NODE_VERSION \
            && nvm alias default $NODE_VERSION \
            && nvm use default 

ENV         NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV         PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# git clone
WORKDIR     /root
RUN         git clone -b practice --single-branch https://github.com/Stageus/scroll_integrated.git
WORKDIR     /root/node.js_docker-for-practice
RUN         npm install

# RUN         mkdir -p /root/project

CMD         node server.js
