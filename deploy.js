require('dotenv').config();

console.log('Upload Build');

const ftp = require("basic-ftp")
// ESM: import * as ftp from "basic-ftp"

example()

async function example() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: process.env.FTP_HOST,
            port: process.env.FTP_PORT,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: false
        })
        console.log(await client.list());
        await client.ensureDir("./");
        await client.clearWorkingDir();
        await client.uploadFromDir("./www");
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}
