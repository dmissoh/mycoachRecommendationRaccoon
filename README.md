# MyCoach recipe recommendation based on Raccoon

This demo is built on top of the recommendationRaccoon engine. It comes with a sample located in the csv file **sampleContent/recipies.csv**.

## Dependencies (see the package.json file for more details)

* Async
* CSV
* Express
* Node
* Raccoon
* Redis
* Cors

## recommendationRaccoon Engine Repo

* <a href="https://github.com/guymorita/recommendationRaccoon" target="_blank">https://github.com/guymorita/recommendationRaccoon</a>

## How to install locally

#### Install Redis on Mac

Source: [http://jasdeep.ca/2012/05/installing-redis-on-mac-os-x/](http://)

This chapter explains how you can install Redis on your Mac OS X system. The instructions will stay pretty much same for any Linux/Unix based system.

Grab the latest copy of Redis from this link [http://redis.io/download](http://). At the time of this writing the latest stable release is 2.8.5. Follow the instructions below now.

Download Redis. I downloaded redis to my Downloads folder on Mac.
First execute the `make test` command to make sure Redis can complete a clean install on your computer.
If no problems were found, continue by executing `make` on your terminal

``` $ cd ~/Downloads/redis-2.8.5 ```

```	$ make test ```

``` $ make ```

Next, move these 2 directories into your /usr/bin directory. You’ll need to do this as the sudo user.

```$ sudo mv src/redis-server /usr/bin```

```$ sudo mv src/redis-cli /usr/bin```

Now, make a hidden redis directory in your home folder and add a config file called redis.conf into this folder. You can consult the Redis Documentation on what options/parameters you can configure using this conf file.

```$ mkdir ~/.redis```

```$ touch ~/.redis/redis.conf```

Start up the redis server using:

```$ redis-server```

#### Clone the repo

Clone the project from: [git@github.com:dmissoh/mycoachRecommendationRaccoon.git](http://)

#### Navigate to the folder

```$ cd raccoon-recommendation```

#### Install ALL dependencies

```$ npm install```

#### Racoon configuration
Make sure that the configuration file **raccoon-recommendation/node_modules/raccoon/lib/config.js** has the following parameters set:

**className: 'recipies'** (used as a prefix for the Redis database)

**localSetup: true** (important to make Raccoon take the right port number)

#### Boot up servers in separate terminal windows

```$ redis-server```

```$ node node-server.js```

#### Import recipies
* Go to [http://localhost:3000/importRecipies](http://)

#### It's ready! Try the following requests
Since all request are HTTP-GET, test these request by simply using the adress bar of your browser.

A nice alternative is the **Postman REST Client** [https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en](http://)

* [http://localhost:3000/importRecipies](http://) (to import some data from CSV for the demo)

* [http://localhost:3000/recommendFor?userId=ana](http://) (to retrieve the recommendation for the user with the id 'ana')

* [http://localhost:3000/recipiesLikes?recipe[id]=recipe1](http://) (get the ids of the users that likes the recipe with the id 'recipe1')

* [http://localhost:3000/newRating?userId=dima&recipe[id]=recipe3&recipe[like]=liked](http://) (add a new rating for the recipe with the id 'recipe3' done by the user with the 'dima')

* [http://localhost:3000/](http://) (shows a static page served by Node.js)
