const { pipe, gotenberg, convert, html, please } = require('gotenberg-js-client');
const path = require('path');
const fs = require('fs');

const gen = async () => {
  try {
    const toPDF = pipe(
      gotenberg('http://localhost:4000/forms/chromium'),
      convert,
      html,
      please
    )

    const htmlFile = path.resolve(__dirname, 'public', 'index.html')
    console.log(htmlFile)
    const pdf = await toPDF(fs.createReadStream(htmlFile))

    pdf.pipe(fs.createWriteStream('index.pdf'))
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  genPdf: gen
}