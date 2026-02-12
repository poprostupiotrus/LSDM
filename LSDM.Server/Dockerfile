FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    libatomic1 \
    libunwind8 \
    libc6 \
    libgcc1 \
    libstdc++6 \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN adduser \
    --system \
    --group \
    --no-create-home \
    --shell /usr/sbin/nologin \
    ragemp

RUN mkdir -p /opt/ragemp

WORKDIR /opt/ragemp

COPY . .

RUN chown -R ragemp:ragemp /opt/ragemp

USER ragemp

ENTRYPOINT ["./ragemp-server"]
EXPOSE 22005
