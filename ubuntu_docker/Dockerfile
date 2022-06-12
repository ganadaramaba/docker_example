
# FROM        ubuntu:20.04
FROM        temp

ENV         TZ Asia/Seoul
ARG         DEBIAN_FRONTEND=noninteractive

# RUN         apt-get update -y
# RUN         apt-get upgrade -y
# RUN         apt-get -y install curl wget vim git unzip s3fs fuse lsb-release gnupg -y

# # postgresql 12.10 설치
# RUN         sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
# RUN         wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
# RUN         apt-get -y update
# RUN         apt-get -y install postgresql-12
# RUN         apt-get -y install postgresql-contrib-12

# # 소유자가 postgres인 파일, 디렉토리 전부 정해진 uid, gid로 바꿈
# ENV         POSTDBUID 113
# ENV         POSTDBGID 120
# RUN         find / -user postgres | xargs chown $POSTDBUID:$POSTDBGID 
# RUN         usermod -u $POSTDBUID postgres
# RUN         groupmod -g $POSTDBGID postgres

# # data_directory 경로 바꾼 파일 넣기
# COPY        ./postgresql.conf /etc/postgresql/12/main/postgresql.conf

# # 마운트
# WORKDIR     /root
# ADD         https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip /root
# RUN         unzip awscli-exe-linux-x86_64.zip
# RUN         rm awscli-exe-linux-x86_64.zip
# RUN         ./aws/install
# COPY        ./.s3fs-creds /root
# RUN         chmod 600 ./.s3fs-creds
# RUN         mkdir /data

# CMD         s3fs backendpractice /data -o passwd_file=/root/.s3fs-creds -o allow_other \
#             && service postgresql start

# -----------

# docker run
# -it
# --name postgres
# -v /home/ubuntu/dockerTest/data/mnt/postgresData/main:/data/postgresData/main test_postgres
# --device /dev/fuse --cap-add SYS_ADMIN --security-opt apparmor:unconfined
# -p 1234:5432

# docker run -it --name postgres --device /dev/fuse --cap-add SYS_ADMIN --security-opt apparmor:unconfined -p 1234:5432 <image_id/name>

# 권한 문제로 마운트 안됨
# RUN         s3fs backendpractice /data -o passwd_file=/root/.s3fs-creds -o allow_other
# 마운트 돼야 실행 가능
# RUN         service postgresql start

# docker에 권한 주며 실행하는 법
# docker run -d --rm \
# --device /dev/fuse \
# --cap-add SYS_ADMIN \
# --security-opt apparmor:unconfined \
# <image_id/name>

# 내부 postgres id 바꾸기
# postgres find / -user postgres | xargs chown $POSTDBUID:$POSTDBGID

# postgres id 변경 실패한 것들
# RUN         find / -user postgres -exec chown $POSTDBUID:$POSTDBGID {} \\;
# RUN         find / -group postgres | xargs chgrp 120 {}\;
# RUN         find / -group postgres -exec chgrp 120 {}\;

# 컨테이너 내부에서 psql 들어가는 법
# su postgres로 사용자 변경
# psql -U postgres