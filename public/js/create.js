function fillPlayfield() {
    let playfield = document.querySelector(".playfield");
    var cellid = 0
    for (let i = 0; i < 5; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.dataset.row = i;
      for (let j = 0; j < 5; j++) {
        let cell = `<div class="cell" id="${cellid}">
                        <textarea type="text" class="celltext"></textarea>
                    </div>`;
        row.innerHTML += cell;
        cellid++;
      }
      playfield.appendChild(row);
    }
  }
  fillPlayfield();