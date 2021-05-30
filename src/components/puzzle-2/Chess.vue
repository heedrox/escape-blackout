<template>
  <div class="chess">
    <overlay-turn/>
    <div class="chess-left">
      <chess-board :pieces-location="piecesLocation"
                   :cell-origin="cellOrigin"
                   :cell-target="cellTarget"
                   @clicked-cell="clickCell"/>
    </div>
    <div class="chess-movements">
      <chess-movement-list :movements="movements" />
      <chess-movement-confirm-alert v-if="showConfirmMovement" @clicked-no="clickConfirmMovementNo()" @clicked-yes="clickConfirmMovementYes()"/>
    </div>
  </div>
</template>
<style>
.chess {
  display: flex;
}

.chess-left {
  text-align: center;
  width: 65vw;
}



.piece-ab::before {
  background-image: url('./pieces/ab.png');
}

.piece-tb::before {
  background-image: url('./pieces/tb.png');
}

.piece-tn::before {
  background-image: url('./pieces/tn.png');
}

.piece-dn::before {
  background-image: url('./pieces/dn.png');
}

.piece-rn::before {
  background-image: url('./pieces/rn.png');
}

.piece-an::before {
  background-image: url('./pieces/an.png');
}

.piece-pn::before {
  background-image: url('./pieces/pn.png');
}

.piece-pb::before {
  background-image: url('./pieces/pb.png');
}

.piece-tb::before {
  background-image: url('./pieces/tb.png');
}

.piece-ab::before {
  background-image: url('./pieces/ab.png');
}

.piece-rb::before {
  background-image: url('./pieces/rb.png');
}

.piece-cb::before {
  background-image: url('./pieces/cb.png');
}

.chess-movements {
  width: 35vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (orientation: portrait) {
  .chess {
    flex-direction: column-reverse;
  }
}
</style>
<script>
import { INITIAL_PIECES_BUILDER, POSSIBLE_MOVEMENTS } from './chess-constants';
import GetPlayerNumber from '../../lib/get-num-player';
import OverlayTurn from '../overlay-turn/OverlayTurn';
import ChessMovementConfirmAlert from './ChessMovementConfirmAlert';
import ChessMovementList from './ChessMovementList';
import ChessBoard from './ChessBoard';
import firebaseUtil from '../../lib/firebase/firebase-util';

const isWhitePiece = (row) => row >= 4;
const isBlackPiece = (row) => row < 4;

const toBoolean = x => !!x;
const canMove = (origin, target) => {
  const possibleMovements = POSSIBLE_MOVEMENTS[`${origin.clickedRow}-${origin.clickedCol}`];
  return possibleMovements ?
      toBoolean(possibleMovements.find(m => m.row === target.clickedRow && m.col === target.clickedCol)) :
      false;
};

const canIMove = (clickedRow) =>
    ((GetPlayerNumber.get() === 1 && isWhitePiece(clickedRow)) ||
        (GetPlayerNumber.get() === 2) && isBlackPiece(clickedRow));

export default {
  name: 'Chess',
  components: { OverlayTurn, ChessBoard, ChessMovementConfirmAlert, ChessMovementList },
  data() {
    return {
      piecesLocation: {},
      cellOrigin: null,
      cellTarget: null,
      globalStatus: { loaded: false },
      showConfirmMovement: false,
      movements: []
    }
  },
  firestore() {
    return {
      piecesLocation: firebaseUtil.doc('/puzzle-status/puzzle-2/pieces-location/current'),
    }
  },
  mounted() {
    //Temporary hack
    if (window.location.href.indexOf('?RESETCHESS')>=0) {
      this.$firestoreRefs.piecesLocation.set(INITIAL_PIECES_BUILDER.build());
    }
  },
  beforeDestroy() {
    this.clickConfirmMovementNo();
  },
  methods: {
    clickCell({ clickedRow, clickedCol }) {
      if (this.cellOrigin && canMove(this.cellOrigin, { clickedRow, clickedCol })) {
        this.movements.push({
          piece: this.getPiece(this.cellOrigin.clickedRow, this.cellOrigin.clickedCol),
          cellOrigin: { row: this.cellOrigin.clickedRow, col: this.cellOrigin.clickedCol } ,
          cellTarget: { row: clickedRow, col: clickedCol }});
        this.movePiece(this.cellOrigin.clickedRow, this.cellOrigin.clickedCol, clickedRow, clickedCol);
        this.showConfirmMovement = true;
        this.cellTarget = { clickedRow, clickedCol };
      } else if (this.existsPiece(clickedRow, clickedCol) && canIMove(clickedRow)) {
        this.cellOrigin = { clickedRow, clickedCol };
      }
    },
    clickConfirmMovementNo() {
      if (this.cellTarget && this.cellOrigin) {
        this.movePiece(this.cellTarget.clickedRow, this.cellTarget.clickedCol, this.cellOrigin.clickedRow, this.cellOrigin.clickedCol);
      }
      this.resetMovement();
      this.movements.pop();
    },
    clickConfirmMovementYes() {
      this.resetMovement();
    },
    resetMovement() {
      this.showConfirmMovement = false;
      this.cellOrigin = null;
      this.cellTarget = null;
    },
    movePiece(rowOrigin, colOrigin, rowTarget, colTarget) {
      const movedPiece = this.piecesLocation[`${rowOrigin}-${colOrigin}`];
      this.$firestoreRefs.piecesLocation.update({
        [`${rowOrigin}-${colOrigin}`]: null,
        [`${rowTarget}-${colTarget}`]: movedPiece
      })
    },
    existsPiece(clickedRow, clickedCol) {
      return this.piecesLocation[`${clickedRow}-${clickedCol}`] !== undefined;
    },
    getPiece(row, col) {
      return this.piecesLocation[`${row}-${col}`];
    }
  }
}

</script>
