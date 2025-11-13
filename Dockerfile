FROM node:25.2.0-alpine

ENV PNPM_HOME="$HOME/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including dev dependencies for tsx)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

ENTRYPOINT ["pnpm", "start"]
