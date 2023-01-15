<template>
  <v-container>
    <div v-for="(row, i) in cellsData" :key="i" class="d-flex">
      <div v-for="(cell, j) in row" :key="j">
        <div @click="openCell(i, j)" class="cell">{{ cell }}</div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Table',
  data: () => ({
    cellsData: [
      ['hidden', 'hidden', 'hidden'],
      ['hidden', 'hidden', 'hidden'],
      ['hidden', 'hidden', 'hidden']
    ],
    holes: [
      { x: 2, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 }
    ]
  }),
  methods: {
    openCell(cellX, cellY) {
      const isHole = this.$data.holes.some((hole) => hole.x === cellX && hole.y === cellY);
      if (isHole) {
        this.$data.cellsData[cellX][cellY] = 'H';
      } else {
        const count = this.countCloseHoles(cellX, cellY);
        this.$data.cellsData[cellX][cellY] = count;
      }
      this.$forceUpdate();
    },
    countCloseHoles(cellX, cellY) {
      const upperRow = [
        { x: cellX - 1, y: cellY - 1 },
        { x: cellX - 1, y: cellY },
        { x: cellX - 1, y: cellY + 1 }
      ];
      const sameRow = [
        { x: cellX, y: cellY - 1 },
        { x: cellX, y: cellY + 1 }
      ];
      const bottowRow = [
        { x: cellX + 1, y: cellY - 1 },
        { x: cellX + 1, y: cellY },
        { x: cellX + 1, y: cellY + 1 }
      ];
      const closeCellsData = [...upperRow, ...sameRow, ...bottowRow];
      let count = 0;
      closeCellsData.forEach((cell) => {
        const isHole = this.$data.holes.some((hole) => hole.x === cell.x && hole.y === cell.y);
        if (isHole) {
          count++;
        }
      });
      return count;
    }
  }
};
</script>

<style scoped>
.cell {
  width: 100px;
  height: 32px;
}
</style>
