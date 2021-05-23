<template>
  <div v-if="!playersTurn" class="puzzle1-turn-overlay" data-test-id="turn-overlay" @click="clickOverlay()">
    <div class="terminal-text glitch" v-if="showOverlayMessage" :data-text="$t('global.not-your-turn')">
      {{ $t('global.not-your-turn') }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.puzzle1-turn-overlay {
  height: 95vh;
  position: fixed;
  width: 95vw;
  top: 12vh;
  z-index: 100;
  display:flex;
  justify-content: center;
  align-items: center;

}
.puzzle1-turn-overlay::before {
  content: "";
  background-image: url('./static-noise.gif');
  background-size: cover;
  opacity: 0.2;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@mixin textGlitch($name, $intensity, $textColor, $background, $highlightColor1, $highlightColor2, $width, $height) {

  color: $textColor;
  position: relative;
  $steps: $intensity;

  // Ensure the @keyframes are generated at the root level
  @at-root {
    // We need two different ones
    @for $i from 1 through 2 {
      @keyframes #{$name}-anim-#{$i} {
        @for $i from 0 through $steps {
          $top: random(100);
          $bottom: random(101 - $top);
          #{percentage($i*(1/$steps))} {
            clip-path: inset(#{$top}% 0 #{$bottom}% 0);
          }
        }
      }
    }
  }
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $background;
  }
  &::after {
    left: 2px;
    text-shadow: -1px 0 $highlightColor1;
    animation: #{$name}-anim-1 2s infinite linear alternate-reverse;
  }
  &::before {
    left: -2px;
    text-shadow: 2px 0 $highlightColor2;
    animation: #{$name}-anim-2 3s infinite linear alternate-reverse;
  }
}

.terminal-text {
  font-family: Consolas, sans-serif;
  font-weight: bold;
  text-align: center;
  width: 50vw;
  height:50vh;
  font-size: 5vw;
  background:transparent;
  align-self: center;
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
  @include textGlitch("terminal-test", 25, white, 'transparent', #990000, #009900, 400, 200);
}
</style>
<script>
import GetNumPlayer from '../../lib/get-num-player';
import firebaseUtil from '../../lib/firebase/firebase-util';

export default {
  name: 'overlay-turn',
  data() {
    return {
      globalStatus: {},
      showOverlayMessage: false,
    };
  },
  computed: {
    playersTurn() {
      return this.globalStatus.turn === GetNumPlayer.get()
    }
  },
  firestore() {
    return {
      globalStatus: firebaseUtil.doc('/')
    };
  },
  methods: {
    clickOverlay() {
      this.showOverlayMessage = true;
      setTimeout(() => {
        this.showOverlayMessage = false;
      }, 5000);
    }
  }
}
</script>
