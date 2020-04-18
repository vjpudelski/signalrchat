document.querySelector('#lock').addEventListener('click', lock);
var moveme = document.getElementById('moveme');
moveme.addEventListener('mousedown', mouseDown);
var posX = 0, posY = 0;

function lock(e) {
  console.log('in click');
  let elem = e.currentTarget;
  let icon = e.currentTarget.querySelector('i');
  elem.classList.toggle('locked');

  if (elem.classList.contains('locked')) {
    moveme.removeEventListener('mousedown', mouseDown);
    moveme.setAttribute('draggable', false);

    icon.classList.remove('fa-lock-open');
    icon.classList.add('fa-lock');
  }
  else {
    moveme.addEventListener('mousedown', mouseDown);
    moveme.setAttribute('draggable', true);

    icon.classList.add('fa-lock-open');
    icon.classList.remove('fa-lock');
  }
}

function mouseUp()
{
  window.removeEventListener('mousemove', divMove);
  window.removeEventListener('mouseup', mouseUp);
}

function mouseDown(e){
  posX = e.clientX - moveme.offsetLeft;
  posY = e.clientY - moveme.offsetTop;

  console.log (posX + " " + posY);
  window.addEventListener('mousemove', divMove);
  window.addEventListener('mouseup', mouseUp);
  e.preventDefault();
}

function divMove(e){
  console.log (posX + " " + posY);
  moveme.style.left = (e.clientX - posX) + 'px';
  moveme.style.top = (e.clientY - posY) + 'px';
  e.preventDefault();
}
