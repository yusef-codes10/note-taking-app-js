// create a new array for notes
// each not will be saved as an object inside that array
let notes = [];
let editingNoteId = null

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

function deleteNote(noteID) {   // noteID as an arg
  notes = notes.filter( note => note.id != noteID);
  saveNotes();
  renderNotes();
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
      <div class="note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
          </svg>
        </button>
      </div>

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

function openNoteDialog(noteId = null) { // ! by default it's null
  const dialog = document.getElementById('noteDialog');
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');

  if(noteId) {
    // Edit Mode
    const noteToEdit = notes.find(note => note.id === noteId)
    editingNoteId = noteId
    document.getElementById('dialogTitle').textContent = 'Edit Note'
    titleInput.value = noteToEdit.title
    contentInput.value = noteToEdit.content
  }
  else {
    // Add Mode
    editingNoteId = null
    document.getElementById('dialogTitle').textContent = 'Add New Note'
    titleInput.value = ''
    contentInput.value = ''
  }

  dialog.showModal()
  titleInput.focus()

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
