1. Download the Code from Github
2. Run npm install
3. Run npm start
4. Open liveserver (in VSC: click "Go Live")

Notes on C++ Code: 
1. To avoid potential conflict with Node.js, the .ino files used for the Arduino-Sketches where saved as .txt files. All files can be found in the "Arduino Sketches" folder. The four different Peripheral-Sketches are almost the same, the only difference is the ID they return to the Controller (Master), which are 1, 2, 3 and 4, respectively.

2. In "index.js" the port is set to "COM7" for Windows 10. If using the code along with the arduino hardware on a different OS, change it to the respective port. Otherwise the hardware won't be found.