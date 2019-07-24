const {app,BrowserWindow,ipcMain} = require('electron')

app.on('ready',() => {
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true //可以使用node模块
        }
    })
    
    mainWindow.loadFile('index.html')

    // const secondWindow = new BrowserWindow({
    //     width:400,
    //     height:300,
    //     webPreferences:{
    //         nodeIntegration:true //可以使用node模块
    //     },
    //     parent:mainWindow // mainWindow关闭的时候，子窗口也一并关闭了
    // })
    
    // secondWindow.loadFile('second.html')

    ipcMain.on('message',(event,args) => {
        console.log(args)

        // event.sender.send('reply','hello from main')
        mainWindow.send('reply','hello from main 666')
    })
})