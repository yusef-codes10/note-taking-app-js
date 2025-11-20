// create a new array for notes
// each not will be saved as an object inside that array
let notes = [];

function saveNote(event) {
    event.preventDefault();  // stop form from refreshing the page

    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    notes.unshift({         // we use unshiift for adding a new eleemnt in the start
        id: generateId(),
        title: title,
        content: content
    })
    saveNotes();
}

function generateId() {
    return Date.now().toString();
}

function saveNotes() {
    localStorage.setItem('quickNotes', JSON.stringify(notes)); //store only notes
}

function openNoteDialog() {
    const dialog = document.getElementById('noteDialog');
    const titleInput = document.getElementById('titleInput');
    const contentInput = document.getElementById('contentInput');
    // this opens the dialog
    dialog.showModal();
    titleInput.focus();
}

function closeNoteDialog() {
    const dialog = document.getElementById('noteDialog');
    dialog.close();
}

// every time the website loads, it's gonna call this
// we have to use the function keyword, this refers to the document
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('noteForm').addEventListener('submit',saveNote);
    document.getElementById('noteDialog').addEventListener('click',function (event) {
        if (event.target === this) {
            closeNoteDialog();
        }
    })
})

const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', 
    () => {
        document.body.classList.toggle('dark-theme');
        console.log('dark theme btn');
    }
)

// TODO next render everything to the page

// ! creating an input event when the user types
const titleInput1 = document.querySelector('#noteTitle');
const dialogTitle1 = document.querySelector('#dialogTitle');

titleInput1.addEventListener('input', function(jake) {
    // e.target.value gives the current value of the input
    dialogTitle1.textContent = jake.target.value;
});
