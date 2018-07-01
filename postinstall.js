const fs = require('fs');
const path = require('path');
const localDir = process.cwd().split('node_modules').shift();



const copyDefaultToWorkingDir = (filename) => {
    console.log(`Checking for ${filename}...`);
    const destFile = path.resolve(localDir, filename);
    if (!fs.existsSync(destFile)) {
        fs.copyFileSync('./templates/' + filename, destFile);
        console.log('Copying a default file');
    } else {
        console.log('Already exists');
    }
};

if (localDir !== __dirname) {
    fs.readdirSync('./templates').forEach(copyDefaultToWorkingDir);
} else {
    console.log('Local folder, not copying script')
}