const os = require('os')
const path = require('path')
const fs = require('fs')

// console.log(os.homedir())
const homeDir = os.homedir() // 用户根目录

// 获取主题文件
function getThemes () {
  const ohMyPoshDir = path.join(homeDir, '/Documents/PowerShell/Modules/oh-my-posh') // on-my-posh目录
  const ohMyPoshVerDirs = fs.readdirSync(ohMyPoshDir) // oh-my-posh版本目录
  const ohMyPoshLatestVer = ohMyPoshVerDirs[ohMyPoshVerDirs.length - 1] // oh-my-posh最新版本
  const themeDir = path.join(ohMyPoshDir, ohMyPoshLatestVer, 'themes') // 主题所在目录
  const themes = fs.readdirSync(themeDir) // 所有主题文件

  return themes.map(cur => cur.replace('.omp.json', '')); // 去除主题文件后缀
}

// 设置主题
function setTheme() {
  const psProfilePath = 'Documents/PowerShell/Microsoft.PowerShell_profile.ps1'; // powershell配置文件
  const psProfile = fs.readFileSync(path.join(homeDir, psProfilePath), 'utf-8')
  const themeNameReg = /(Set-PoshPrompt\s-Theme\s)(.*)/ // 主题名匹配规则
  const curTheme = psProfile.match(themeNameReg)[2]
  const allThemes = getThemes()
  const nextThemeIndex = allThemes.indexOf(curTheme) + 1 >= allThemes.length ? 0 : allThemes.indexOf(curTheme) + 1
  const nextTheme = allThemes[nextThemeIndex]
  const newPSProfile = psProfile.replace(themeNameReg, "$1" + nextTheme) // 替换主题后的profile文件

  fs.writeFileSync(path.join(homeDir, psProfilePath), newPSProfile, 'utf-8')
  console.log('设置成功');
}

setTheme()




