<template>
  <v-container>
    <div class="d-flex justify-center align-end py-8">
      <div class="number-input"><v-text-field v-model="rows" type="number" hide-details /></div>
      <div class="px-4">rows</div>
      <div class="number-input"><v-text-field v-model="columns" type="number" hide-details /></div>
      <div class="px-4">columns</div>
      <div class="number-input"><v-text-field v-model="holes" type="number" hide-details /></div>
      <div class="px-4">holes</div>
      <v-btn class="primary" @click="generateTable">Generate table</v-btn>
    </div>
    <div v-for="(row, i) in cellsData" :key="i" class="d-flex justify-center">
      <div v-for="(cell, j) in row" :key="j">
        <div @click="openCell(i, j)" class="px-4 py-2">
          <div v-if="cell === null">
            <v-btn>
              <v-icon>mdi-help</v-icon>
            </v-btn>
          </div>
          <div v-else-if="typeof cell === 'number'">
            <v-btn color="success"> {{ cell }} </v-btn>
          </div>
          <div v-else-if="cell === 'H'">
            <v-btn color="error"> {{ cell }} </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Table',
  data: () => ({
    cellsData: [],
    holesCoordinates: [],
    rows: 3,
    columns: 3,
    holes: 3
  }),
  created() {
    this.generateTable();
  },
  methods: {
    openCell(cellX, cellY) {
      const isHole = this.$data.holesCoordinates.some((hole) => hole.x === cellX && hole.y === cellY);
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
        const isHole = this.$data.holesCoordinates.some((hole) => hole.x === cell.x && hole.y === cell.y);
        if (isHole) {
          count++;
        }
      });
      return count;
    },
    generateTable() {
      const rows = Number(this.$data.rows);
      const columns = Number(this.$data.columns);
      const value = null;
      const table = Array(rows);
      for (let i = 0; i < rows; i++) {
        table[i] = Array(columns).fill(value);
      }
      this.$data.cellsData = table;

      const holes = Number(this.$data.holes);
      const maxCellsCount = rows * columns;
      if (holes > maxCellsCount) {
        alert('More holes than cells, select lower count');
        return;
      }
      this.generateHolesCoordinates(holes, rows, columns);
    },
    generateHolesCoordinates(holes, rows, columns) {
      const allCoordinates = [];
      for (let i = 0; i < holes; i++) {
        const coordinates = this.generateSingleHoleCoordinate(rows, columns, allCoordinates);
        allCoordinates.push(coordinates);
      }
      this.$data.holesCoordinates = allCoordinates;
    },
    generateSingleHoleCoordinate(rows, columns, allCoordinates) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * columns);
      const isSameCoordinate = allCoordinates.some((hole) => hole.x === x && hole.y === y);
      if (isSameCoordinate) {
        // to make holes coordinates always unique and always needed count
        return this.generateSingleHoleCoordinate(rows, columns, allCoordinates);
      }
      return { x, y };
    }
  }
};
</script>

<style scoped>
.number-input {
  width: 48px;
}
</style>
