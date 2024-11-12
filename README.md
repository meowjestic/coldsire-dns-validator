
## Getting Started
run ``npm install`` to install all dependencies

## PRISMA
this project uses PRISMA as a database, you can find the schema in the `prisma/schema.prisma`
make sure to change the connection in the `env` first
then you can run `prisma migrate deploy` to apply all pending migrations

then you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## CRON
to run the cron please use ``/api/v1/cron`` , it will running each of 30 minutes.

## ENDPOINTS
``/api/v1/dns`` with `method` `POST` to upload list of domains in csv format with field ``file``
``/api/v1/validate`` with `method` `GET` to get all list of inputted list of domains
``/api/v1/validate`` with `method` `POST` to check single string domain, it requires form data with field ``domain``