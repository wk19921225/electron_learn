const {ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('message', 'hello from renderer')

    document.getElementById('addMusic').addEventListener('click', () => {
       ipcRenderer.send('addMusicWindow')
    })
})