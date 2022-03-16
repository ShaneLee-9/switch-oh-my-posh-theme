const os = require('os')
const path = require('path')
const fs = require('fs')
const homeDir = os.homedir() // 用户根目录

// 获取主题文件
function getThemes () {
  const themeDir = path.join(homeDir, '/AppData/Local/oh-my-posh/themes') // 主题所在目录

  // 返回所有主题文件
  return fs.readdirSync(themeDir);
}

// 设置主题
function setTheme() {
  const psProfilePath = 'Documents/PowerShell/Microsoft.PowerShell_profile.ps1'; // powershell配置文件
  const psProfile = fs.readFileSync(path.join(homeDir, psProfilePath), 'utf-8')
  const themeNameReg = /(oh-my-posh\sprompt\sinit\spwsh\s--config\s"~\/AppData\/Local\/oh-my-posh\/themes\/)(.*?)("\s\|\sInvoke-Expression)/ // 主题名匹配规则
  const allThemes = getThemes()

  const nextTheme = allThemes[Math.floor(Math.random() * allThemes.length)]
  const newPSProfile = psProfile.replace(themeNameReg, "$1" + nextTheme + "$3"); // 替换主题后的profile文件

  fs.writeFileSync(path.join(homeDir, psProfilePath), newPSProfile, 'utf-8')
  console.log('设置成功');
}

setTheme()




