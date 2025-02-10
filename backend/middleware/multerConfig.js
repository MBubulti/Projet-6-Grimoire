const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
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
      return res.status(400).json({error: 'Pas de fichier'});
    }

    const {buffer, originalname} = req.file;

    if (!MIME_TYPES[req.file.mimetype]) {
      return res.status(400).json({error: 'Fichier invalide'});
    }

    const hash = crypto
      .createHash('sha1')
      .update(crypto.randomBytes(12))
      .digest('hex');
    const ref = `${hash}.webp`;
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
