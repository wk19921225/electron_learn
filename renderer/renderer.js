const {ipcRenderer} = require('electron');
const {$} = require('./helper')

let audio = new Audio();
let currentMusic = '';
let allTracks = []

const renderHTML = (tracks) => {
    const container = $('tracks-container');
    let html = ''
    tracks.map((value) => {
        html += `<div
class="btn-outline-primary" 
data-value="${value.id}"
data-path="${value.path}"
data-filename="${value.filename}"
>${value.filename}</div>`
    })
    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('message', 'hello from renderer')

    document.getElementById('addMusic').addEventListener('click', () => {
        ipcRenderer.send('addMusicWindow')
    })

    ipcRenderer.on('addMusic', (event, tracks) => {
        allTracks = tracks;
        renderHTML(tracks)
    })

    $('tracks-container').addEventListener('click', (event) => {
        event.preventDefault();
        const {dataset} = event.target;
        console.log(dataset)
        if (dataset && dataset.filename) {
            if (dataset.filename == currentMusic) {
                // 音乐与当前相同
            } else {
                // 播放新音乐
                currentMusic = dataset.filename;
                audio.src = dataset.path;
                audio.play()
            }
        }
    })

    $('tracks-container').addEventListener('dblclick', (event) => {
        event.preventDefault();
        const {dataset} = event.target;
        if (dataset && dataset.fileName) {
            if (dataset.fileName == currentMusic) {
                // 音乐与当前相同 执行暂停或者播放
                
            } else {
                // 播放新音乐
            }
        }
    })
})
