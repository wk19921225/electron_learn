const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const DataStore = require('./store');

const store = new DataStore({
    name: 'MusicData',
});

class AppWindow extends BrowserWindow {

    constructor(config, fileLocation) {
        const basicConfig = {
            width: 800,
            height: 600,
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        }
        const finalConfig = Object.assign(basicConfig, config);
        super(finalConfig);
        this.loadFile(fileLocation);
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}


app.on(
    'ready', () => {
        // 创建窗口
        const mainWindow = new AppWindow({}, 'renderer/index.html')

        ipcMain.on('addMusicWindow', (event) => {
            const secondWindow = new AppWindow({
                width: 500,
                height: 400,
                parent: mainWindow,
            }, 'renderer/addMusic.html')

        })


        ipcMain.on('openDialogFile', (event) => {
            dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'music', extensions: ['mp3'] },
                ]
            }, (files) => {
                event.sender.send('injectMusicList', files)
            })
        })

        ipcMain.on('addMusic', (event, tracks) => {
            // console.log(tracks) // 当前需要导入的音乐
            const updateTracks = store.addTracks(tracks).getTracks();
            console.log(updateTracks)
        })

    }
)
