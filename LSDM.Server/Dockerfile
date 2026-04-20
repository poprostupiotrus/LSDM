FROM ubuntu:22.04

RUN sed -i 's|http://archive.ubuntu.com|http://ftp.icm.edu.pl/pub/Linux/ubuntu/|g' /etc/apt/sources.list

RUN apt-get update && apt-get install -y \
    libatomic1 \
    libunwind8 \
    libgcc-s1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN adduser \
    --system \
    --group \
    --no-create-home \
    --shell /usr/sbin/nologin \
    ragemp

WORKDIR /opt/ragemp

COPY --chown=ragemp:ragemp . .

USER ragemp

ENTRYPOINT ["./ragemp-server"]
EXPOSE 22005
