FROM oven/bun:latest
WORKDIR /app

COPY . .

RUN bun install
RUN bun run build
RUN bun install --global serve

EXPOSE 3000
CMD ["serve", "dist"]
