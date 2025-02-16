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
          command = `C:\\Python39\\python.exe ${tempFile}`;
          break;
      case 'java':
          command = `C:\\Program Files\\Java\\jdk-17\\bin\\javac.exe ${tempFile} && java -cp ${__dirname} Temp${timestamp}`;
          break;
      case 'c':
          command = `"C:\\MinGW\\bin\\gcc.exe" ${tempFile} -o ${compiledFile} && ${compiledFile}`;
          break;
      case 'cpp':
          command = `"C:\\MinGW\\bin\\g++.exe" ${tempFile} -o ${compiledFile} && ${compiledFile}`;
          break;
      case 'csharp':
          command = `"C:\\Program Files\\Mono\\bin\\mcs.exe" -out:${compiledFile} ${tempFile} && mono ${compiledFile}`;
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
