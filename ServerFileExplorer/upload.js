const fs = require('fs');

const multer = require('multer')

const uploadDirectory = './uploads';

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       
            cb(null, 'Files/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  // Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;