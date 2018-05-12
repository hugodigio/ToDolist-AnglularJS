# Installation et configuration de l'application

## Base de données
Vous devez disposer d'une base de donnée MongoDB.

commande pour lancer un serveur MongoDB:
> Mongod


## Mise en place du serveur node

### Installation des modules nécéssaires 

Pour que le serveur node démarre correctement, vous devez installer des modules
complémentaires, à l'aide des commandes suivantes:

> npm install express

> npm install mongoose

> npm install uuid

> npm install path

> npm install body-parser

> npm install bcrypt



## Configuration (IP et Ports)

### Configurer port utilisé par le serveur

Modifiez la valeur du port dans le fichier  **./server/config-server.json**


### Configuer l'adresse IP du serveur MongoDB

Modifiez l'adresse ip du serveur MongoDB dans le fichier **./server/config-server.js**


### Application Mobile

Pour changer l'adresse IP du serveur node utilisé par l'application, modifiez l'adresse ip dans le fichier
**./MyApp/www/config.js**


## Ouvrir l'application

Vous pouvez accéder à l'application via votre navigateur web en entrant l'addresse du 
serveur Node ainsi que son port.

par défaut:
[http://localhost:8095/](http://localhost:8095/)
