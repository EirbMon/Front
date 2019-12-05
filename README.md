# Front

#install node modules : npm install

#build project : npm run build

#start the server : npm run dev

#print syntaxe errors : npm run lint

#correct syntaxe erros : npm run lint:fix

#To link the front to the blockchain you need to execute 

truffle migrate --reset
copy the files in the build/contracts of the blockchain directory to your Front/src/build/contracts to be able to use them in your code.


# CHANGE :

Changement sur les fonctions SUR MONGODB UNIQUEMENT :

1) UpdateEirbmon permet d'update un Eirbmon en fonction de son idInBlockchain (champ obligatoire):  1 paramètre > {idInBlockchain: eirbmon_id, owner_id: owner_id, ...},

2) GetOwnerEirbmon permet de récupérer un nombre NUMBER de Eirbmon d'un user : deux paramètres > OWNER_ID et NUMBER. avec NUMBER le nombre de eirbmon que l'on souhaite récupéré. Mettre 0 permet de récupérer ALL.

3) GetEirbmon permet de récupérer un unique Eirbmon en fonction de son idInBlockchain : un paramètre > idInBlockchain 


