FROM alpine:3.18

LABEL maintainer="retorres"

WORKDIR /app

# Copy project files
COPY . /app

# Default command (open a shell); adjust as needed for your application
CMD ["/bin/sh"]
