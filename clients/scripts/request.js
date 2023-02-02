async function postData(resourceURI = '', data = {}, method = 'POST') {
  const response = await fetch(`https://note-app-v2.onrender.com/api/${resourceURI}`, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  response.status === 401 && handleError('Phiên đăng nhập hết hạn');

  return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(resourceURI = '') {
  const response = await fetch(`https://note-app-v2.onrender.com/api/${resourceURI}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  
  response.status === 401 && handleError('Phiên đăng nhập hết hạn');

  return response.json(); // parses JSON response into native JavaScript objects
}

function handleError(msg) {
  localStorage.setItem('error', msg);
  localStorage.removeItem('accessToken');
  location.href = '/login.html';
}

function handleInvalidate(errors, prefixEle = '') {
  for (const error of errors) {
    const ele = document.getElementById(`${prefixEle}${error.param}`);

    if (ele.nextElementSibling.tagName !== 'SPAN') {
        ele.insertAdjacentHTML('afterend', `<span class="error">${error.msg}</span>`)
    }
}
}