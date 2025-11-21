// create a new array for notes
// each not will be saved as an object inside that array
let notes = [];

function saveNote(event) {
  event.preventDefault(); // stop form from refreshing the page

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  notes.push({  // push to put in the end
    // we use unshiift for adding a new eleemnt in the start
    id: generateId(),
    title: title,
    content: content,
  });
  saveNotes();
  renderNotes();  // ! re-render the notes so you don't have to update browser
}

// TODO next render everything to the page

// render notes to the pages
function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");

  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add your first note</button>
      </div>`;
    return; // exit if there are notes
  }

  notesContainer.innerHTML = notes
    .map(                 // TODO have to understand this too 
      (note) => `
      <div class="note-card">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-content">${note.content}</p>
      </div>
    `
    )
    .join(''); // join all strings into one big HTML
}

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes"); // use the ecact same key 'quickNotes'
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function generateId() {
  return Date.now().toString();
}

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes)); //store only notes
}

function openNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("contentInput");
  // this opens the dialog
  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  dialog.close();
}

// every time the website loads, it's gonna call this
// we have to use the function keyword, this refers to the document
document.addEventListener("DOMContentLoaded", () => {
  // call the renderNotes() function each time the DOM updates
  notes = loadNotes(); // return the notes from local storage
  console.log(
    document.getElementById("noteForm")
  );
  renderNotes();
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {  // TODO have to understand Event Bubbling
        closeNoteDialog();
      }
        console.log(this);
        console.log(event.target);
    });
});

const themeToggleBtn = document.getElementById("themeToggleBtn");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  console.log("dark theme btn");
});
