FROM public.ecr.aws/docker/library/python:3.10-slim-bullseye
ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /
RUN useradd --uid 1000 --create-home app && \
  apt-get update && \
  apt-get install --no-install-recommends --yes \
  libpcre3 \
  libpcre3-dev \
  build-essential \
  linux-libc-dev \
  libssl-dev \
  libffi-dev \
  && rm -rf /var/lib/apt/lists/* && \
  pip install pipenv==2023.2.18

RUN mkdir -p /var/www/app && mkdir /app

COPY Pipfile* /app
RUN cd /app && pipenv install --system --deploy

COPY . /app

CMD ["uwsgi", "--http", ":5000", "--master", "--enable-threads", "-s", "/var/www/app/app.sock", "--manage-script-name", "--mount", "/=app:app"]