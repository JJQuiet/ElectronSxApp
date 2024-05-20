const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'images/icon')
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'shouxian-guodong',
        productName:"寿县国动",
        iconUrl: path.join(__dirname, 'images/icon.ico'),
        setupIcon: path.join(__dirname, 'images/icon.ico'),
        setupExe: '点我安装寿县国动.exe',
        // exe: '寿县国动.exe',
        noMsi: true,
        createDesktopShortcut: true, // 确保创建桌面快捷方式
        createStartMenuShortcut: true, // 确保创建开始菜单快捷方式
        shortcutName: '寿县国动', // 快捷方式的名称
        createDesktopShortcutAlways: true,
        loadingGif: path.join(__dirname, 'images/images.gif'),
        // loadingGif: path.join(__dirname, 'images/xiaoxin.gif'),
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
