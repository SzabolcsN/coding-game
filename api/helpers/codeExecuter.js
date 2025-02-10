const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeCode = async (code, language, input) => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    let tempFile, command, compiledFile;

    switch (language) {
      case 'javascript':
        tempFile = path.join(__dirname, `temp-${timestamp}.js`);
        fs.writeFileSync(tempFile, code);
        command = `node ${tempFile}`;
        break;
      case 'python':
        tempFile = path.join(__dirname, `temp-${timestamp}.py`);
        fs.writeFileSync(tempFile, code);
        command = `python3 ${tempFile}`;
        break;
      case 'java':
        tempFile = path.join(__dirname, `Temp${timestamp}.java`);
        fs.writeFileSync(tempFile, code);
        command = `javac ${tempFile} && java -cp ${__dirname} Temp${timestamp}`;
        break;
      case 'c':
        tempFile = path.join(__dirname, `temp-${timestamp}.c`);
        compiledFile = path.join(__dirname, `temp-${timestamp}.exe`);
        fs.writeFileSync(tempFile, code);
        command = `gcc ${tempFile} -o ${compiledFile} && ${compiledFile}`;
        break;
      case 'cpp':
        tempFile = path.join(__dirname, `temp-${timestamp}.cpp`);
        compiledFile = path.join(__dirname, `temp-${timestamp}.exe`);
        fs.writeFileSync(tempFile, code);
        command = `g++ ${tempFile} -o ${compiledFile} && ${compiledFile}`;
        break;
      case 'csharp':
        tempFile = path.join(__dirname, `Temp${timestamp}.cs`);
        compiledFile = path.join(__dirname, `Temp${timestamp}.exe`);
        fs.writeFileSync(tempFile, `using System; class Temp${timestamp} { static void Main() { ${code} } }`);
        command = `mcs -out:${compiledFile} ${tempFile} && ${compiledFile}`;
        break;
      default:
        return reject(new Error('Unsupported language'));
    }

    const child = exec(command, { timeout: 5000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      cleanupFiles([tempFile, compiledFile]);

      if (error) {
        reject(new Error(error.message || stderr));
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve({ output: stdout });
      }
    });

    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });
};

const cleanupFiles = (files) => {
  files.forEach((file) => {
    if (file && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
};

module.exports = { executeCode };
