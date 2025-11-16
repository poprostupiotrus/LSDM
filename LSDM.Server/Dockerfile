FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    libatomic1 \
    libunwind8 \
    libc6 \
    libgcc1 \
    libstdc++6 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /ragemp
COPY . .

ENTRYPOINT ["./ragemp-server"]