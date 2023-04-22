# AnonyChat

AnonyChat est une application de chat anonyme qui utilise Express et Socket.io pour permettre aux utilisateurs de discuter sans révéler leur identité. 

## Comment lancer l'application

Pour lancer AnonyChat, ouvrez une invite de commande et naviguez vers le répertoire de l'application. Une fois dans le répertoire, tapez la commande suivante 
```
node index.js
```

L'application sera lancée sur le port 80, vous pouvez y accéder en ouvrant un navigateur et en tapant l'URL suivante : http://localhost.

## Fonctionnalités

AnonyChat permet aux utilisateurs de se connecter au chat en entrant simplement leur pseudo. Ils peuvent ensuite discuter avec d'autres utilisateurs sans avoir à révéler leur identité.

Les messages sont affichés en temps réel !!

## Comment ça marche

AnonyChat utilise Express pour gérer les requêtes HTTP et Socket.io pour la communication en temps réel entre les utilisateurs.

Lorsqu'un utilisateur se connecte, un événement `join` est émis par le client et reçu par le serveur. Le serveur ajoute alors l'utilisateur à une liste de connectés et émet un événement `user connected` à tous les autres utilisateurs pour les informer de la connexion.

Lorsqu'un utilisateur envoie un message, un événement `chat message` est émis par le client et reçu par le serveur. Le serveur diffuse ensuite le message à tous les utilisateurs connectés en émettant un événement `chat message` à tous les clients.

Lorsqu'un utilisateur se déconnecte, un événement `disconnect` est émis par le client et reçu par le serveur. Le serveur supprime alors l'utilisateur de la liste des connectés et émet un événement `user disconnected` à tous les autres utilisateurs pour les informer de la déconnexion.

## Conclusion

AnonyChat est une application de chat anonyme simple mais efficace qui permet aux utilisateurs de discuter sans révéler leur identité. Grâce à Socket.io, les messages sont affichés en temps réel et les utilisateurs peuvent voir quand d'autres utilisateurs se connectent ou se déconnectent. Essayez-le dès maintenant en lançant la commande `node index.js` !
