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

const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', 
    () => {
        document.body.classList.toggle('dark-theme');
        console.log('dark theme btn');
    }
)