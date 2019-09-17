const {app, BrowserWindow, ipcMain} = require('electron');

app.on(
    'ready', () => {
        // 创建窗口
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        })
        mainWindow.loadFile('renderer/index.html')

        ipcMain.on('message', (event, arg) => {
            console.log(arg)
            // 返回消息
            event.sender.send('reply', 'hello from main')
        })

        // const secondWindow = new BrowserWindow({
        //     width: 400,
        //     height: 300,
        //     webPreferences: {
        //         nodeIntegration: true
        //     },
        //     parent: mainWindow,
        // })
        //
        // secondWindow.loadFile('secondIndex.html')
    }
)