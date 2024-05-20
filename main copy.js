const { app, BrowserWindow, screen, globalShortcut } = require('electron');
app.setName("寿县国动");
const path = require('path');
// this should be placed at top of main.js to handle setup events quickly
app.whenReady().then(() => {
  createWindows();
  // 注册快捷键，例如 'Esc'
  // globalShortcut.register('ESC', () => {
  //   app.quit(); // 退出应用
  // });
});
function createWindows() {
  const displays = screen.getAllDisplays();
  const urls = ['http://192.168.0.101:8085/dispatch/index.html#/cockpit'];
  // const urls = ['http://172.17.30.1:8085/dispatch/index.html#/cockpit'];

  displays.forEach((display, index) => {
    let win = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height,
      minWidth: 1920,
      minHeight: 1080,
      // fullscreen: true, // 设置全屏
          // 使用标准窗口边框
    //   minimizable: false,  // 允许最小化
      maximizable: false, // 禁止最大化
      closable: true,
      // icon: path.join(__dirname, 'images/icon.ico'),
    });
    win.setIcon(path.join(__dirname, 'images/icon.ico'));
    win.maximize();
    // 加载网址，如果有不足4个显示器或网址，则重复使用最后一个网址
    win.loadURL(urls[index] || urls[urls.length - 1]);

    // 隐藏窗口菜单栏
    win.setMenu(null);
  });
};
// app.on('will-quit', () => {
//   // 取消所有快捷键的注册
//   globalShortcut.unregisterAll();
// });
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  if (require('electron-squirrel-startup')) app.quit();
});
if (require('electron-squirrel-startup')) app.quit();
