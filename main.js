const {app,BrowserWindow,ipcMain,dialog} = require('electron')

// 抽取公共的窗口类
class AppWindow extends BrowserWindow{
    constructor(config,fileLocation){
        const basicConfig = {
            width:800,
            height:600,
            webPreferences:{
                nodeIntegration:true //可以使用node模块
            }
        }

        const finalConfig = {...basicConfig,...config}
        super(finalConfig)
        
        this.loadFile(fileLocation)
        this.once('ready-to-show',() => {
            this.show()
        })
    }
}

app.on('ready',() => {
    const mainWindow = new AppWindow(null,'./renderer/index.html')

    ipcMain.on('add-music-window',() => {
        new AppWindow({width:500,height:400,parentWindow:mainWindow},'./renderer/add.html')
    })

    ipcMain.on('open-music-file',() => {
        // 文档地址:https://electronjs.org/docs/api/dialog
        dialog.showOpenDialog({
            properties:['openFile','multiSelections'],
            filters:[{name:'Music',extensions:['mp3']}]
        },(files) => {
            console.log(files)
        })
    })
})

/**
app.on('ready',() => {
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true //可以使用node模块
        }
    })
    
    // mainWindow.loadFile('index.html')
    mainWindow.loadFile('./renderer/index.html')

    // const secondWindow = new BrowserWindow({
    //     width:400,
    //     height:300,
    //     webPreferences:{
    //         nodeIntegration:true //可以使用node模块
    //     },
    //     parent:mainWindow // mainWindow关闭的时候，子窗口也一并关闭了
    // })
    
    // secondWindow.loadFile('second.html')

    // ipcMain.on('message',(event,args) => {
    //     console.log(args)

    //     // event.sender.send('reply','hello from main')
    //     mainWindow.send('reply','hello from main 666')
    // })

    ipcMain.on('add-music-window',() => {
        const addWindow = new BrowserWindow({
            width:500,
            height:400,
            webPreferences:{
                nodeIntegration:true //可以使用node模块
            },
            parent:mainWindow // mainWindow关闭的时候，子窗口也一并关闭了
        })

        addWindow.loadFile('./renderer/add.html')
    })
})
 */