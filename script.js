const fs = require('fs');

const users = [
    {name: 'Mike', age: 25},
    {name: 'Bob', age: 32},
    {name: 'Nikola', age: 17},
];

const data = JSON.stringify(users, null, 2);

// fs.writeFile('data.json', data, (err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Data written to file');
//     }
// });


const os = require('os');
const path = require('path');


const homeDir = os.homedir();
const dataFolder = path.join(homeDir, 'data.json');

fs.writeFile(dataFolder, data, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Data write to file:', dataFolder);
    }
});

const { promises: fsPromises } = require('fs');

async function isExist(filePath) {
    try {
        await fsPromises.stat(filePath);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};

async function updateDataJsonFile(filePath, newData) {
    try {
        const fileExists = await isExist(filePath);
        if (!fileExists) {
            console.error('The data.json file does not exist.');
            return;
        }
        
        const fileContent = await fsPromises.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const updatedData = [...data, ...newData];
        const updatedDataJson = JSON.stringify(updatedData, null, 2);

        await fsPromises.writeFile(filePath, updatedDataJson);

        console.log('data.json updated');
    } catch (err) {
        console.error(err);
    }
};

const newData = [
    {name: 'Anna', age: 24},
    {name: 'Tom', age: 52},
];

updateDataJsonFile(dataFolder, newData);