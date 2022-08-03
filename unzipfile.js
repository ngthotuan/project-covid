const extract = require('extract-zip');
const fs = require('fs');

async function extractFile(source, target) {
    try {
        await extract(source, { dir: target });
        console.log('Extraction complete');
    } catch (err) {
        // handle any errors
        console.error(err)
        console.error('======ERROR');
    }
}

const zipFolder = '.';
(async () => {
    try {
        const files = fs.readdirSync(zipFolder);
        files.forEach((file) => {
            if (file.endsWith('.zip')) {
                extractFile(`${zipFolder}/${file}`, `${__dirname}/extract`);
            }
        });
    } catch (err) {
        console.log(err);
    }
})();
