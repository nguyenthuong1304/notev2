const toast = document.getElementById('toast');

function showToast(msg = '', type = 'success') {
  toast.querySelector('.toast-body').innerHTML = msg;
  toast.classList.add('visible');
  toast.classList.add(type);

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000)
}

(function () {
  const msg = localStorage.getItem('error');

  if (msg && msg.length) {
    showToast(msg, 'error');
    localStorage.removeItem('error');
  }
})()