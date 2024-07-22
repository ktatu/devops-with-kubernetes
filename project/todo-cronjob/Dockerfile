FROM postgres

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl

COPY . .

RUN chmod +x todo.sh

CMD ./todo.sh