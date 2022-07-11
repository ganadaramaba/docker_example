
FROM    node:14.19

# ARG     DEBIAN_FRONTEND=noninteractive
# RUN     apt-get update -y
# RUN     apt-get upgrade -y

WORKDIR /usr/scr/app

COPY    ./server .

EXPOSE  3000

RUN     npm install

CMD     ["npm", "start"]

