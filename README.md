# electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## 其它知识点

### 进程

> 主进程 && 渲染进程

```
主进程：
	Main Process
	1、可以使用和系统对接的Electron API 创建菜单 上传文件
	2、创建 渲染进程 Renderer Process
	3、全面支持Node.js
	4、只有一个，作为整个程序的入口点
	
渲染进程:
	Renderer Process
	1、可以有多个，每个对应一个窗口
	2、每个都是一个单独的进程
	3、全面支持Node.js 和 Dom API
	4、可以使用一部分 Electron 提供的API

一个 electron 中有一个主进程 和 多个渲染进程
```

## API

> BrowserWindow 负责创建窗口

```js
const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true //可以使用node模块
        }
})
```

## 进程间通讯

>Electron使用 IPC(interporcess communication)在进程之间进行通讯，和Chromium保持一致【事件机制】
>
>参考：https://electronjs.org/docs/api/ipc-main   https://electronjs.org/docs/api/ipc-renderer

>renderder process ---> main process
```js
render procress
	const {ipcRenderer} = require('electron')
    window.addEventListener('DOMContentLoaded', () => {
        ipcRenderer.send('message','hello world from renderer')
    })

main process
	const {app,BrowserWindow,ipcMain} = require('electron')
    ipcMain.on('message',(event,args) => {
        console.log(args)
    })
```

> main process  ---> renderer process

```js
main process
	ipcMain.on('message',(event,args) => {
        console.log(args)

        event.sender.send('reply','hello from main')
        mainWindow.send('reply','hello from main 666')
    })

renderer process
    window.addEventListener('DOMContentLoaded', () => {
        // alert('greeting from the Dom Side')
        ipcRenderer.send('message','hello world from renderer')

        ipcRenderer.on('reply',(event,args) => {
            document.getElementById('messageId').innerHTML = args
        })
    })
```

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
