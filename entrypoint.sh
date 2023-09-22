#!/bin/sh

# Wait for the PostgreSQL container to become healthy
until nc -z -v -w30 postgres 5432
do
  echo "Waiting for PostgreSQL container to start..."
  sleep 1
done

# Run your database migrations
exec npm run migration:run

# Start the development server
exec npm run start:dev
