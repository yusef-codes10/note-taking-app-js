// create a new array for notes
// each not will be saved as an object inside that array
let notes = [];

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