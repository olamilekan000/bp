# Shakespared

Allows a user to search for a text string in the complete works of Shakespeare.

## Features

- Search for a Shakespare word.

## Getting started

```sh
# Clone the project
git clone https://github.com/olamilekan000/shakespared.git
cd shakespared

# Install dependencies
npm install

```

Set Environment Variables

```sh
PORT=9001
```

Run with Docker

```sh
  # build
  docker build .

  # run
  docker run -e PORT=9001 -p 9001:9001 [image ID]
```

Then you can start the application:

```sh
npm run dev
```
