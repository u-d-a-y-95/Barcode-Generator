const barcodeId = document.getElementById('barcode');

leftBinary = {
  0: '0001101',
  1: '0011001',
  2: '0010011',
  3: '0111101',
  4: '0100011',
  5: '0110001',
  6: '0101111',
  7: '0111011',
  8: '0110111',
  9: '0001011',
};
rightBinary = {
  0: '1110010',
  1: '1100110',
  2: '1101100',
  3: '1000010',
  4: '1011100',
  5: '1001110',
  6: '1010000',
  7: '1000100',
  8: '1001000',
  9: '1110100',
};
const getBinary = (number) => {
  numberString = String(number);
  console.log(numberString.length);
  binary = '101';
  for (let i = 0; i < numberString.length; i++) {
    if (i < 6) {
      binary += leftBinary[numberString[i]];
      if (i == 5) {
        binary += '01010';
      }
    } else {
      binary += rightBinary[numberString[i]];
    }
  }
  binary += '101';
  return binary;
};
const drawBarcode = (binaryString, numberString, height) => {
  for (let i = 0; i < binaryString.length; i++) {
    const svgns = 'http://www.w3.org/2000/svg';
    let line = document.createElementNS(svgns, 'line');
    line.setAttribute('x1', (i + 10) * 2);
    line.setAttribute('y1', '0');
    line.setAttribute('x2', (i + 10) * 2);

    if ([0, 1, 2, 46, 47, 48, 92, 93, 94].includes(i)) {
      line.setAttribute('y2', height + 20);
    } else {
      line.setAttribute('y2', height);
    }
    line.setAttribute('stroke', binaryString[i] == '0' ? 'white' : 'black');
    line.setAttribute('stroke-width', '2');
    barcodeId.appendChild(line);
  }
  for (let i = 0; i < numberString.length; i++) {
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    if (i == 0) {
      text.setAttribute('x', 5);
    } else if (i == 11) {
      text.setAttribute('x', 215);
    } else if (i > 0 && i < 6) {
      text.setAttribute('x', i * 15 + 20);
    } else {
      text.setAttribute('x', i * 15 + 35);
    }
    text.setAttribute('y', height + 20);
    text.setAttribute('fill', 'black');
    // text.setAttribute('font-size', '25');
    text.innerHTML = numberString[i];
    barcodeId.appendChild(text);
  }
};
const generateBarcode = (number) => {
  const binaryString = getBinary(number);
  // console.log(binaryString);
  drawBarcode(binaryString, number, 100);
};

generateBarcode('136000291459');
