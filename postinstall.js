const fs = require('fs');
const path = require('path');

const copyDefaultToWorkingDir = (filename) => {
    console.log(`Checking for ${filename}...`);
    const destFile = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(destFile)) {
        fs.copyFileSync(`./${filename}.default`, destFile);
        console.log('Copying a default file');
    } else {
        console.log('Already exists');
    }
};

if (process.cwd() !== __dirname) {
    copyDefaultToWorkingDir('.browserlistrc');
    copyDefaultToWorkingDir('postcss.config.js');
    copyDefaultToWorkingDir('webpack.config.js');
    copyDefaultToWorkingDir('dev-server.js');
    copyDefaultToWorkingDir('template.html');
} else {
    console.log('Local folder, not copying script')
}