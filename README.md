# Escape From the Blackout

A turn-based escape room experience.

A sudden blackout has left the world in darkness.
You are the only hope of humanity, as you have access
to a remote server. Soon you realize that you are not alone.
Can you both turn the power back on, and save the world?

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Tests
```
npm run test
npm run tdd
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### NEXT TODO (sesión con guille)

x - si prop block-handles = COL, entonces no puedes mover los cols.
x - si prop block-handles = ROW, entonces no puedes mover las rows.
x - al cumplir el 2o stage, abrir el 3er stage.
x - si eres el jugador 1, no puedes mover COLS
x - si eres el jugador 2, no puedes mover ROWS.
x - en el stage 1 y 2, el estado no es persistido.
x - el el stage 3, el estado es persistido (el jugador 1 y 2 ven lo mismo)
- cuando el estado es "persistido", solo puede tocar el jugador que tiene el turno: cuando no es tu turno, todo está bloqueado. si es tu turno, puedes mover o COLS / ROWS.
- al cumplir el stage 3, se desbloquea el chat, y el puzle 2.


