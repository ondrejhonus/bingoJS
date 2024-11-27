import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { customAlphabet } from 'nanoid';
import session from 'express-session';

const PORT = 3000;
const app = express();
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 5); // Generate IDs with a length of 5

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session({ secret: 'bingo-secret', resave: false, saveUninitialized: true }));

const server = createServer(app);
const io = new Server(server);

let existingIDs = new Set();
let bingoCards = {}; // Object to store bingo cards

function generateUniqueID() {
  let id;
  do {
    id = nanoid();
  } while (existingIDs.has(id));
  return id;
}

app.post('/get-id', (req, res) => {
  const newID = generateUniqueID();
  req.session.tempID = newID; // Associate the ID with the session
  existingIDs.add(newID);
  res.json({ id: newID });
});

io.on('connection', (socket) => {
  socket.on('create-card', ({ values, cardid }) => {
    // Save the card with the values and cardid to the in-memory storage
    bingoCards[cardid] = values;
    console.log(`Card created with ID: ${cardid}`, values);

    // Emit an event indicating the card was created
    socket.emit(`card-created ${cardid}`);
  });
});

app.get('/', (req, res) => {
  res.render("menu");
});

app.get('/create', (req, res) => {
  res.render("create");
});

app.get('/play', (req, res) => {
  const cardid = req.query.cardid;
  const card = bingoCards[cardid];
  if (card) {
    res.render("play", { cardid, card });
  } else {
    res.status(404).send('Card not found');
  }
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
