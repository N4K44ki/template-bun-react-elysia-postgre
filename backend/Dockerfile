FROM oven/bun:1
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install

COPY . .

CMD ["bun", "--watch", "src/index.ts"]
