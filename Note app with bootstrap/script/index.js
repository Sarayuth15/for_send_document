let quill;

$(document).ready(function () {
  // Auto dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');

  // Init Quill
  quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write your note here...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ header: [1, 2, 3, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean']
      ]
    }
  });

  // Load notes
  loadNotes();

  // Save note
  $('#saveNote').click(() => {
    const content = quill.root.innerHTML.trim();
    if (!content || content === '<p><br></p>') return alert('Note is empty!');

    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const timestamp = new Date().toLocaleString();

    notes.push({ content, timestamp });
    localStorage.setItem('notes', JSON.stringify(notes));
    quill.setContents([]);
    loadNotes();
  });

  // Clear all
  $('#clearAll').click(() => {
    if (confirm('Delete all notes?')) {
      localStorage.removeItem('notes');
      loadNotes();
    }
  });

  // Export
  $('#exportNotes').click(() => {
    const data = localStorage.getItem('notes') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'notes.json';
    a.click();
  });

  // Import
  $('#importNotes').change((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) throw new Error();

        const current = JSON.parse(localStorage.getItem('notes') || '[]');
        const merged = [...current, ...imported];
        localStorage.setItem('notes', JSON.stringify(merged));
        loadNotes();
      } catch {
        alert('Invalid file format!');
      }
    };
    reader.readAsText(file);
  });
});

// Load Notes
function loadNotes() {
  const container = $('#notesContainer');
  container.empty();
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');

  notes.forEach((note, i) => {
    const col = $(`
      <div class="col-md-6 note-card">
        <div class="card">
          <div class="card-body">
            <div class="mb-2" style="max-height: 150px; overflow-y: auto;">${note.content}</div>
            <small class="text-muted d-block mb-2">${note.timestamp}</small>
            <button class="btn btn-sm btn-danger delete-note" data-index="${i}">Delete</button>
          </div>
        </div>
      </div>
    `);
    container.append(col);
  });

  // Bind delete buttons
  $('.delete-note').click(function () {
    const index = $(this).data('index');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
  });
}