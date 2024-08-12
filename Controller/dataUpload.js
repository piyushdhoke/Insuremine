const { Worker } = require('worker_threads');
const path = require('path');

const dataUpload = (req, res) => {
    const filePath = req.file.path;
    const collectionName = req.body.collectionName;

    const worker = new Worker(path.join(__dirname, '../Workers/csvWorker.js'), {
        workerData: { filePath, collectionName },
    });

    let responseSent = false; // Flag to track if the response has been sent

    worker.on('message', (message) => {
        if (!responseSent) {
            responseSent = true;
            if (message.status === 'done') {
                res.status(202).send({ message: 'File is being processed' });
            } else {
                res.status(500).send({ message: message.message });
            }
        }
    });

    worker.on('error', (error) => {
        if (!responseSent) {
            responseSent = true;
            res.status(500).send({ message: error.message });
        }
    });

    worker.on('exit', (code) => {
        if (!responseSent && code !== 0) {
            responseSent = true;
            res.status(500).send({ message: `Worker stopped with exit code ${code}` });
        }
    });
};

module.exports = { dataUpload };
