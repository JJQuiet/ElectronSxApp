const { app, BrowserWindow, screen, globalShortcut } = require('electron');
app.setName("寿县国动");
const path = require('path');
// this should be placed at top of main.js to handle setup events quickly
app.whenReady().then(() => {
  createWindow();
});
function createWindow() {
  // 获取主显示器的信息
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // 创建一个新窗口
  let mainWindow = new BrowserWindow({
      width: width,
      height: height,
      minWidth: width,   // 最小宽度设置为当前宽度，禁止缩小
      minHeight: height,
      show: false, // 初始不显示窗口，待网页加载完成后显示
      frame: true, // 显示窗口边框和控制按钮
      // resizable: false, // 禁止改变窗口大小
      minimizable: true, // 允许最小化
      maximizable: true, // 允许最大化
      closable: true, // 允许关闭
      fullscreenable: false, // 禁止全屏
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true
      }
  });

  // 加载指定网址
  mainWindow.loadURL('http://172.17.30.1:8085/dispatch/index.html#/cockpit');

  // 设置窗口为最大化
  mainWindow.maximize();

  // 显示窗口和隐藏菜单栏
  mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      mainWindow.setMenu(null);
  });

  // 禁止窗口从最大化恢复到正常大小
  mainWindow.on('unmaximize', () => {
      mainWindow.maximize();
  });
  mainWindow.setIcon(path.join(__dirname, 'images/icon.ico'));
};
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
  }
});
if (require('electron-squirrel-startup')) app.quit();
