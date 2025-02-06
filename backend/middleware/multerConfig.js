const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.memoryStorage();
const upload = multer({storage});

const imagesDir = path.join(__dirname, '..', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, {recursive: true});
}

const uploadImg = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded'});
    }

    const {buffer, originalname} = req.file;

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const ref = `${timestamp}-${originalname.split('.')[0]}.webp`;
    const filePath = path.join(imagesDir, ref);

    await sharp(buffer).webp({quality: 20}).toFile(filePath);
    req.file.filename = ref;
    req.file.path = `/images/${ref}`;
    req.file.url = `${req.protocol}://${req.get('host')}/images/${ref}`;

    next();
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = {upload, uploadImg};
