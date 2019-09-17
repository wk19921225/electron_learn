const {ipcRenderer} = require('electron')
const {$} = require('./helper')
const path = require('path')
window.addEventListener('DOMContentLoaded', () => {
    $('selectMusic').addEventListener('click', () => {
        ipcRenderer.send('openDialogFile')
    });

    const renderHtmlList = (pathes) => {
        const listContainer = $('musicList');
        let html = '';
        pathes.map((music) => {
            html += `<li class="list-group-item">${path.basename(music)}</li>`;
        })
        listContainer.innerHTML=`<ul class="list-group">${html}</ul>`
    }

    ipcRenderer.on('injectMusicList', (event, pathes) => {
        if(Array.isArray(pathes)) {
           renderHtmlList(pathes)
        }
    })
})