const {ipcRenderer} = require('electron')
const { $ } = require('./helper')

$('add-music-button').addEventListener('click',function() {
    ipcRenderer.send('add-music-window')
})