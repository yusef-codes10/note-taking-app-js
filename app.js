// create a new array for notes
// each not will be saved as an object inside that array
let notes = [];

function saveNote(event) {
  event.preventDefault(); // stop form from refreshing the page

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  notes.unshift({
    // we use unshiift for adding a new eleemnt in the start
    id: generateId(),
    title: title,
    content: content,
  });
  saveNotes();
}

function generateId() {
  return Date.now().toString();
}

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes)); //store only notes
}

function openNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("titleInput");
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
  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});

const themeToggleBtn = document.getElementById("themeToggleBtn");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  console.log("dark theme btn");
});

// TODO next render everything to the page

// render notes to the pages
function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");

  if (notes.length === 0) {
    // check if notes is empty
    notesContainer.innerHTML = `  <div class="empty-state">
      <h2>No notes yet</h2>
      <p>Create your first note to get started</p>
      <button class="add-note-btn" onclick="openNoteDialog()">+ Add your first add-note-btn</button>
    </div>`;
    return; // to exist if there are notes
  }
  notesContainer.innerHTML = notes.map((note) => {
    `    <div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content"${note.content}</p>
    </div>
        `.join();  // join turns the new array returned by map to a single string
  });
}
