const { $ } = require('./helper')
const { ipcRenderer } = require('electron')

$('select-music').addEventListener('click',() => {
    ipcRenderer.send('open-music-file')
})