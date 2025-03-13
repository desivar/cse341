const { exec } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const filePath = path.join(__dirname, 'contacts.json');
const dbName = 'project1';
const collectionName = 'contacts'; // Use 'contacts' as the collection name

const command = `mongoimport --uri ${process.env.MONGO_URL} --db ${dbName} --collection ${collectionName} --file ${filePath} --jsonArray`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error importing data: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});