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
With a throwaway email (the one you put in your `.env.defaults`), go [here](https://www.google.com/settings/security/lesssecureapps) and toggle _on_ less secure apps.

<img width="1786" alt="Screen Shot 2022-01-22 at 7 27 06 PM" src="https://user-images.githubusercontent.com/29644031/150893088-66ee06bc-2fba-40b2-9bd0-a2b51dbffac0.png">


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
