// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')
// Node API
// alert(process.versions.node)

// Dom API
window.addEventListener('DOMContentLoaded', () => {
    // alert('greeting from the Dom Side')
    ipcRenderer.send('message','hello world from renderer')

    ipcRenderer.on('reply',(event,args) => {
        document.getElementById('messageId').innerHTML = args
    })
})