const os = require('os')
const path = require('path')
const fs = require('fs')
const homeDir = os.homedir() // 用户根目录

// 设置主题
function setTheme() {
  const psProfilePath = 'Documents/PowerShell/Microsoft.PowerShell_profile.ps1'; // powershell配置文件
  const psProfile = fs.readFileSync(path.join(homeDir, psProfilePath), 'utf-8')
  const allThemes = fs.readdirSync(process.env.POSH_THEMES_PATH)

  const nextTheme = allThemes[Math.floor(Math.random() * allThemes.length)]
  const newPSProfile = psProfile.replace(/[^\\]*\.omp\.json/, nextTheme); // 替换主题后的profile文件

  fs.writeFileSync(path.join(homeDir, psProfilePath), newPSProfile, 'utf-8')
  console.log('设置成功');
}

setTheme()




