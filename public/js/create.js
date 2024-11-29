const socket = io();

// Display the bingo grid after page load and fill it with empty textareas
document.addEventListener('DOMContentLoaded', function fillPlayfield() {
  let playfield = document.querySelector(".playfield");
  let cellid = 0;
  for (let i = 0; i < 5; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    row.dataset.row = i;
    for (let j = 0; j < 5; j++) {
      let cell;
      if (cellid == 12) {
        cell = `<div class="cell" id="${cellid}">
                      <textarea type="text" class="celltext">Free space!!!</textarea>
                  </div>`;
      } else {
        cell = `<div class="cell" id="${cellid}">
                      <textarea type="text" class="celltext"></textarea>
                  </div>`;
      }
      row.innerHTML += cell;
      cellid++;
    }
    playfield.appendChild(row);
  }
}, false);


// This code executes after pressing the "create" button
async function createCard() {
  let cardid;
  let values = [];

  try {
    const response = await fetch('/get-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    cardid = data.id;
  } catch (error) {
    console.error('Error creating id for bingo card:', error);
    return;
  }

  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    let cellTextarea = cells[i].querySelector(".celltext");
    if (cellTextarea.value === "") {
      alert("Please fill out all cells.");
      return;
    }
    values.push(cellTextarea.value);
  }
  console.log(values);

  socket.emit("create-card", { values, cardid });

  socket.on(`card-created ${cardid}`, () => {
    window.location.replace(`./play?cardid=${cardid}`);
  });
}