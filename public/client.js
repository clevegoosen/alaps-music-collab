const socket = io();
const form = document.getElementById('uploadForm');
const list = document.getElementById('songList');
const player = document.getElementById('audioPlayer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (data.url) {
    addSong({ name: form.song.files[0].name, url: data.url });
  }
});

socket.on('new-song', (song) => {
  addSong(song);
});

function addSong(song) {
  const li = document.createElement('li');
  li.textContent = song.name;
  li.style.cursor = 'pointer';
  li.onclick = () => {
    player.src = song.url;
    player.play();
  };
  list.appendChild(li);
}

