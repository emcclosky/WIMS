# WIMS - Where's My Stuff Scraper
A web scraper for checking product availability for supported sites. It's meant to be run as a cron job. I added a client UI just for demo purposes.

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

<img width="664" alt="Screen Shot 2022-01-22 at 7 27 15 PM" src="https://user-images.githubusercontent.com/29644031/150893524-c0e7a126-0192-402d-97e1-70efd1224ddd.png">


### Running the Scraper Once
To test changes to the scraper you can do one-off runs using:
```
yarn scrape
```
### Running the Scraper as a Cron Job
Use crontab (`crontab -e`) to run the scraper daily at noon (or run it at whatever interval) with the below:
```
0 12 * * * /path/to/node/bin /path/to/wims/dist/index.js
```
### Running the Server
```
yarn server
```
### Running the Frontend

After starting the backend server, run:
```
yarn client
```
### Line Count
```
yarn count-lines
```

# Caveats
This is just for personal use and comes from an interview project, so I add products straight to the database. For example, you can run the below snippet after replacing the values.

``` sql
  INSERT into products (name, url, image, keyword)
  VALUES (<product_name>, <product_url>, <product_image_url>, <some_keyword>);
```


# Examples

## Mobile
<img width="394" alt="Screen Shot 2022-01-24 at 7 59 26 PM" src="https://user-images.githubusercontent.com/29644031/150893682-98967fbc-d3cc-42fa-9352-abae3371d545.png">


## Desktop
<img width="1540" alt="Screen Shot 2022-01-24 at 1 15 45 PM" src="https://user-images.githubusercontent.com/29644031/150893666-be3d9eef-9ec9-4f27-a6c6-56d2b8b6aa26.png">



