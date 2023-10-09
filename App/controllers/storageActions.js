const path = require('path');
const fs = require('fs');
const archiver = require('archiver'); // Import biblioteki archiver

// Ścieżka do folderu storage
const storageFolderPath = path.join(__dirname, '../../../storage');

// Middleware, który sprawdzi, czy folder storage istnieje
const checkStorageFolder = (req, res, next) => {
  if (!fs.existsSync(storageFolderPath)) {
    return res.status(404).json({ message: 'Folder storage nie istnieje.' });
  }
  next();
};

// Funkcja obsługująca żądanie pobierania folderu
const downloadStorageFolder = (req, res) => {
  // Utwórz archiwum ZIP
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Stopień kompresji
  });

  // Ustaw nagłówki HTTP dla odpowiedzi
  res.setHeader('Content-Disposition', `attachment; filename="storage.zip"`);
  res.setHeader('Content-Type', 'application/zip');

  // Połącz archiwum ZIP z odpowiedzią
  archive.pipe(res);

  // Dodaj folder storage do archiwum
  archive.directory(storageFolderPath, 'storage');

  // Obsłuż błędy archiwizacji
  archive.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  // Zakończ archiwum i wyślij je jako odpowiedź
  archive.finalize();
};

module.exports = { checkStorageFolder, downloadStorageFolder };
