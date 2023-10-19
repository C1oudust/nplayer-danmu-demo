const express = require('express');
const app = express();
const xml2js = require('xml2js');
const fs = require('fs');
const cors = require('cors');
function decToHex(dec) {
  let hex = dec.toString(16).padStart(6, '0');
  return hex.length === 1 ? '0' + hex : hex;
}
app.use(cors());
app.get('/api/danmu', (req, res) => {
  const fileName = `danmaku/1.xml`;

  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) throw err;

    xml2js.parseString(data, (err, result) => {
      if (err) throw err;

      const danmus = result.i.d;
      const response = { code: 0, data: [] };

      danmus.forEach((danmu) => {
        const params = danmu['$']['p'].split(',');
        // <d p="{time},{type},{size},{color},{timestamp},{pool},{uid_crc32},{row_id}">
        const color = '#' + decToHex(parseInt(params[3]));
        const type = params[1] === '4' ? 'bottom' : params[1] === '1' ? 'top' : 'scroll';
        response.data.push({
          author: params[6],
          time: parseFloat(params[0]),
          text: danmu['_'],
          color,
          type,
        });
      });

      res.json(response);
    });
  });
});

app.listen(3000);
