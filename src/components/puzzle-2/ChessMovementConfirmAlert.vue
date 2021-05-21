<template>
  <div class="chess-movements-alert" data-test-id="movement-confirm-alert" >
    <p>¿Confirmar movimiento?</p>
    <input type="button" class="chess-movements-alert-button" data-test-id="movement-confirm-alert-btn-yes"
           value="Sí"/>
    <input type="button" class="chess-movements-alert-button" data-test-id="movement-confirm-alert-btn-no"
           value="No" @click="clickNo()"/>
  </div>
</template>
<style>
.chess-movements-alert {
  border: solid 1px #009900;
  border-radius: 1vw;
  margin: 3vw 3vw 3vw 0;
  text-align: center;
  padding: 2vw;
  box-shadow: 0 0 5px #5cf15c;
  background-color: #0099001f;
}

.chess-movements-alert p {
  white-space: nowrap;
  font-size: 2vw;
}

.chess-movements-alert-button {
  color: white;
  padding: 0.3rem 1.3rem;
  background: transparent;
  border: 1px solid #00990055;
  border-radius: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  font-size: 2vw;
}

.chess-movements-alert-button:hover {
  border-bottom: 1px solid #009900;
  box-shadow: 0 0 5px #5cf15c;
}
</style>
<script>
export default {
  name: 'ChessMovementConfirmAlert',
  emits: [ 'clicked-no' ],
  methods: {
    clickNo() {
      this.$emit('clicked-no');
    }
  }
}
</script>
