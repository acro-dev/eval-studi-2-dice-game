# eval-studi-2-dice-game
Jeu de dé pour 2 joueurs en Javascript.

## Déscription du déroulement d'une partie.

### 1. Une nouvelle partie commence.
> Le joueur qui commence est deteriminé aléatoirement.

### 2. Le premier joueur lance le dé.

#### - Si la valeur du dé est supérieur à 1 :
- La valeur du dé est stockée dans une valeur temporaire (round).
- Le joueur peut relancer le dé ou bien garder ses points.
- **Si le joueur décide de garder ses points :**
  - Les points stockés dans une valeur temporaire (round) sont stockés dans une valeur finale (global).
  - La manche du joueur est terminé. Le second joueur peux lancé le dé à son tour.
      
#### - Si la valeur du dé est égale à 1.
- Le joueur perd les points accumulés dans la valeur temporaire (round).
- La manche du joueur est terminé. Le second joueur peux lancé le dé à son tour.
    
### 3. Si un des joueurs à 100 points à la fin de sa manche, il remporte la partie. 
> Il ne sera plus possible de lancer le dé, il faudra relancer une nouvelle partie.
