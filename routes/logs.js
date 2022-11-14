var express = require('express');
const appRoot = require("app-root-path");
const admzip = require("adm-zip");
const fs = require("fs");
const tmp = require('tmp');

var router = express.Router();

router.get('/download', function(req, res, next) {
  let level = req.query.level;
  let file = `${appRoot}/logs/app.log`;

  if(level){
    level = level.toLowerCase();
    level = level.trim();
  }

  const fileName = `${level? level : 'all'}-${Date.now()}.app.log`;

  //Create a temp file
  const tmpLogFile = tmp.fileSync({name: fileName});

  //Read log file line by line and filter by level
  const allFileContents = fs.readFileSync(file, 'utf-8');
  allFileContents.split(/\r?\n/).forEach(line =>  {

    if (!line) {
      return;
    }

    if (level) {

      const logLine = JSON.parse(line);

      if (logLine.level === level) {
        fs.appendFileSync(tmpLogFile.name, line);
      }

      return;
    }

    fs.appendFileSync(tmpLogFile.name, line);
  });

  const compressedFileName = `${fileName}.zip`;
  const tmpCompressedFile = tmp.fileSync({name: compressedFileName});

  //Create compressed file
  const zip = new admzip();
  zip.addLocalFile(tmpLogFile.name);
  fs.writeFileSync(tmpCompressedFile.name, zip.toBuffer());

  res.download(tmpCompressedFile.name);
});

module.exports = router;
