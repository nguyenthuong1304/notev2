const addBox = document.querySelector('.add-box'),
  popupBox = document.querySelector('.popup-box'),
  popupTitle = popupBox.querySelector('header p'),
  closeIcon = popupBox.querySelector('header i'),
  titleTag = popupBox.querySelector('input'),
  descTag = popupBox.querySelector('textarea'),
  addBtn = popupBox.querySelector('button');

function showMenu(elem) {
  elem.parentElement.classList.add('show');

  document.addEventListener('click', e => {
    if (e.target.tagName != 'I' || e.target != elem) {
      elem.parentElement.classList.remove('show');
    }
  });
}

function deleteNote(noteId, elem) {
  let confirmDel = confirm('Are you sure you want to delete this note?');
  if (!confirmDel) return;

  postData(`notes/${noteId}/delete`)
    .then(({ message }) => {
      elem.closest('.note').remove()
      showToast(message)
    })
    .catch(err => console.log(err));
}

async function editNote(noteId) {
  const addBox = document.querySelector('.add-box');
  getData(`notes/${noteId}`)
    .then(data => {
      addBox.click();
      popupTitle.innerText = 'Cập nhật một ghi chú';
      addBtn.innerText = 'Cập nhật';
      addBtn.classList.add('is-edit');
      addBtn.setAttribute('note-id', noteId);

      titleTag.value = data.note.title;
      descTag.value = data.note.content;
    })
    .catch(err => showToast(err.message, 'error'));

}

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken')
  const notes = [];

  let isUpdate = false;

  if (accessToken) {
    getData('notes')
      .then(data => {
        notes.push(...data.notes)
        showNotes();
      })
      .catch(err => console.log(err))
  } else {
    location.href = '/login.html';
  }

  addBox.addEventListener('click', () => {
    popupTitle.innerText = 'Tạo mới ghi chú';
    addBtn.innerText = 'Xác nhận';
    popupBox.classList.add('show');
    document.querySelector('body').style.overflow = 'hidden';

    if (window.innerWidth > 660) titleTag.focus();
  });

  closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleTag.value = descTag.value = '';
    popupBox.classList.remove('show');
    document.querySelector('body').style.overflow = 'auto';
  });

  function showNotes() {
    if (!notes) return;
    document.querySelectorAll('.note').forEach(li => li.remove());
    notes.forEach((note, id) => {
      let filterDesc = note.content.replaceAll('\n', '<br/>');
      let liTag = `<li class='note'>
          <div class='details'>
            <p>${note.title}</p>
            <span>${filterDesc}</span>
          </div>
          <div class='bottom-content'>
            <span>${formatDate(new Date(note.createdAt))}</span>
            <div class='settings'>
                <i onClick="showMenu(this)" class='uil uil-ellipsis-h show-menu'></i>
                <ul class='menu'>
                  <li onclick='editNote("${note._id}")'><i class='uil uil-pen'></i>Edit</li>
                  <li onclick='deleteNote("${note._id}", this)'><i class='uil uil-trash'></i>Delete</li>
                </ul>
            </div>
          </div>
      </li>`;
      addBox.insertAdjacentHTML('afterend', liTag);
    });
  }

  addBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = titleTag.value.trim(),
      content = descTag.value.trim();

    if (addBtn.classList.contains('is-edit')) {
      const noteId = addBtn.getAttribute('note-id');

      postData(`notes/${noteId}`, { title, content }, 'PUT')
        .then(({ note }) => {
          const index = notes.findIndex(n => n._id === note._id)
          notes[index] = { ...note }
          showNotes();
          closeIcon.click();
        }).catch(err => showToast(err.message, 'error'))
    } else {
      postData('notes', { title, content })
        .then(({ note, message }) => {
          showToast(message);
          notes.push(note);
          showNotes();
          closeIcon.click();
        })
        .catch(err => showToast(err.message, 'error'))
    }
  });
});
