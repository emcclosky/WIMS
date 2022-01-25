# WIMS - Where's My Stuff Scraper
For when you're tired of checking if your Lululemon leggings are back in stock.

## Commands
### Database Setup
This assumes you have Postgres installed.
```
createdb <database_name>
```
### Env Setup
Having created the database, fill out `.env.defaults` and then `cp .env.defaults .env`. The email fields will be used to send email notifications when a product is in stock, which is described in the Gmail Setup.
### Seeding the Database
```
yarn db:bootstrap
```
### Gmail Setup

### Running the Scraper
```
yarn scrape
```
### Running the Server
```
yarn server
```
### Running the Frontend
```
yarn cient
```
### Line Count
```
yarn count-lines
```