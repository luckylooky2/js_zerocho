FROM node:16
WORKDIR /app/frontend
COPY . .

EXPOSE 3000

CMD ["bash", "setup.sh"]
