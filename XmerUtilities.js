// Name: Xmer Utilities [Advanced]
// ID: xmerutilities
// Description: A lot of Advanced Tools!
// By: XmerOriginals <https://scratch.mit.edu/users/XmerOriginals/>
// License: MPL-2.0
// Version: 1.0.0

(function (Scratch) {
class XmerUtilities {
	"use strict";
	
  constructor() {
    this.pressedKeys = {};
    this.setupEventListeners();
    this.hasInteracted = false;
    this.closeEnabled = false;
    this.handleCloseRequest = this.handleCloseRequest.bind(this);
    this.activeMessages = [];
    this.customTitle = "Xmer Extensions";
	this.playingSounds = new Map();
    this.currentSoundURL = '';
    this.isPlaying = false;
    this.errorStatus = '';
    this.waitingPromise = null;
    this.volume = 100;
    this.paused = false;
    this.pausedTime = 0;
	this.playingSounds = new Map();
    this.currentSoundURL = '';
    this.isPlaying = false;
    this.errorStatus = '';
    this.waitingPromise = null;
    this.volume = 100;
    this.paused = false;
    this.pausedTime = 0;
  }
  
  normalizeKey(key) {
    if (key === ' ') {
      return 'f12';
    }
    return key.toLowerCase();
  }
  
  getInfo() {
    return {
      id: 'xmerutilities',
	  "color1": "#e64141",
      "color2": "#d10000",
      "color3": "#990000",
	  menuIconURI: "https://i.ibb.co/x8N4th2/XUIcon.png",
	  name: 'Xmer Utilities',
      blocks: [
        {
          opcode: "__NOOPCODE",
          text: "System",
          blockType: Scratch.BlockType.LABEL,
        },
        {
          opcode: 'systemLanguage',
          blockType: Scratch.BlockType.REPORTER,
          text: 'System Language'
        },
		{
          opcode: 'isMobile',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Is Mobile?'
        },
		{
          opcode: 'isKeyPressed',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Key [key] pressed?',
          arguments: {
            key: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'altgraph'
            }
          }
        },
		{
          opcode: 'orientationl',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Is Rotation a Landscape?'
        },
		{
          opcode: 'orientationp',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Is Rotation a Portrait?'
        },
		{
          opcode: 'getOrientation',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Device Rotation'
        },
        {
          opcode: "__NOOPCODE",
          text: "Dialog",
          blockType: Scratch.BlockType.LABEL,
        },
        {
          opcode: 'alert',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Alert with text [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello!'
            }
          }
        },
        {
          opcode: 'prompt',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Prompt with Text [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Enter something:'
            }
          }
        },
        {
          opcode: 'confirm',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Confirm with Text [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Are you sure?'
            }
          }
        },
        {
          opcode: "__NOOPCODE",
          text: "Browser",
          blockType: Scratch.BlockType.LABEL,
        },
        {
          opcode: 'checkInteractionPermission',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Browser Clicked?'
        },
        {
          opcode: "__NOOPCODE",
          text: "Close Confirmation",
          blockType: Scratch.BlockType.LABEL,
        },
        {
          opcode: 'enableClose',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Enable Close Confirmation',
        },
        {
          opcode: 'disableClose',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Disable Close Confirmation',
        },
        {
          opcode: 'CloseControlEnabled',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Close Confirmation Enabled?',
        },
        {
          opcode: "__NOOPCODE",
          text: "Download Files from URL",
          blockType: Scratch.BlockType.LABEL,
        },
        {
          opcode: 'download',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Download file from URL [url] with filename [filename]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/dango.png'
            },
            filename: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'dango'
            }
          }
        },
        {
          opcode: 'isSafeURL',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'URL [url] is safe?',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/dango.png'
            }
          }
        },
        {
          opcode: 'isitdownloadable',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'URL [url] is it downloadable?',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/dango.png'
            }
          }
        },
		{
          opcode: "__NOOPCODE",
          text: "Notification",
          blockType: Scratch.BlockType.LABEL,
        },
		{
          opcode: 'showProjectNotification',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Show Image with Text [text] [url] for [second] seconds and color [color] text color [textcolor]',
          arguments: {
            text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello fellow Scratchers!'
            },
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/dango.png'
            },
            second: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 5
            },
            color: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: '#323232'
            },
            textcolor: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: '#ffffff'
            }
          }
        },
		{
          opcode: "__NOOPCODE",
          text: "System Notification",
          blockType: Scratch.BlockType.LABEL,
        },
		{
          opcode: "notificationPermissions",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "Notification Permissions",
        },
        {
          opcode: "sendNotificationPermission",
          blockType: Scratch.BlockType.COMMAND,
          text: "Send Notification Permission",
        },
	    {
          opcode: "setNotificationTitle",
          blockType: Scratch.BlockType.COMMAND,
          text: "Set Notification Title to [title]",
          arguments: {
            title: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "Xmer Extensions",
            },
          },
        },
        {
          opcode: "showNotification",
          blockType: Scratch.BlockType.COMMAND,
          text: "Send Notification, Text [text]",
          arguments: {
            text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "Hello fellow Scratchers!",
            },
          },
        },
		{
          opcode: "__NOOPCODE",
          text: "Play Sound URL or File",
          blockType: Scratch.BlockType.LABEL,
        },
		{
          opcode: 'playSound',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Play sound URL or File [url]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/meow.mp3',
            },
          },
        },
        {
          opcode: 'playSoundAndWait',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Play sound URL or File [url] and wait',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/meow.mp3',
            },
          },
        },
        {
          opcode: 'stopSound',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Stop Sound',
        },
        {
          opcode: 'seekSound',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Go to Time [time] Seconds in Sound',
          arguments: {
            time: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0,
            },
          },
        },
        {
          opcode: 'setVolume',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set Volume to [volume]',
          arguments: {
            volume: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 100,
            },
          },
        },
        {
          opcode: 'isPlayingSound',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Is Sound Playing?',
        },
        {
          opcode: 'openFile',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Open Sound File',
        },
        {
          opcode: 'currentSound',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Current Sound',
        },
        {
          opcode: 'soundTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Sound Time',
        },
        {
          opcode: 'soundCurrentTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Sound Current Time',
        },
        {
          opcode: 'getVolume',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get Volume',
        },
		{
          opcode: "__NOOPCODE",
          text: "Time&Date",
          blockType: Scratch.BlockType.LABEL,
        },
		{
		opcode: 'getCurrentTime',
		blockType: Scratch.BlockType.REPORTER,
		text: '24 Hour Time'
		},
		{
		opcode: 'get12HourTime',
		blockType: Scratch.BlockType.REPORTER,
		text: '12 Hour Time'
		},
        {
          opcode: 'getCurrentDate',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Date'
        },
        {
          opcode: 'getDayOfWeek',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Day of Week'
        },
      ]
    };
  }

  systemLanguage() {
    const language = navigator.language;
    if (language) {
      return language;
    } else {
      return "null";
    }	
  }
  
  isMobile() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
  }
  
  isKeyPressed(args) {
    const key = args.key;
    return !!this.pressedKeys[this.normalizeKey(key)];
  }

  setupEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    this.pressedKeys[this.normalizeKey(event.key)] = true;
  }

  handleKeyUp(event) {
    this.pressedKeys[this.normalizeKey(event.key)] = false;
  }
  
  isMobile() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
  }


  orientationl() {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  return isLandscape;
  }
  
  orientationp() {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  return isPortrait;
  }
  
  getOrientation() {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  return isPortrait ? "portrait" : "landscape";
  }
 
  alert(args) {
    alert(args.TEXT);
  }

  prompt(args) {
    return prompt(args.TEXT);
  }

  confirm(args) {
    return confirm(args.TEXT);
  }
  
  checkInteractionPermission() {
    return this.hasInteracted;
  }

  _handleInteraction() {
    this.hasInteracted = true;
    document.removeEventListener('click', this._handleInteraction);
    document.removeEventListener('keydown', this._handleInteraction);
    document.removeEventListener('touchstart', this._handleInteraction);
  }

  initInteractions() {
    document.addEventListener('click', this._handleInteraction.bind(this));
    document.addEventListener('keydown', this._handleInteraction.bind(this));
    document.addEventListener('touchstart', this._handleInteraction.bind(this));
  }
  
  enableClose() {
    this.closeEnabled = true;
  }

  disableClose() {
    this.closeEnabled = false;
  }

  CloseControlEnabled() {
    return this.closeEnabled;
  }
  
  handleCloseRequest(event) {
    if (this.closeEnabled) {
      event.preventDefault();
      const confirmation = confirm();
      if (confirmation) {
        window.close();
      }
    }
  }
  
  async isSafeURL(args) {
    const url = args.url;
    const isHTTPS = url.startsWith('https://');
    return isHTTPS;
  }

  async isitdownloadable(args) {
    const url = args.url;

    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async download(args) {
    const url = args.url;
    const filename = args.filename;

    try {
      const isSafe = await this.isSafeURL({ url });
      if (!isSafe) {
        return;
      }

      const response = await fetch(url);
      const blob = await response.blob();

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';

      const blobUrl = window.URL.createObjectURL(blob);

      a.href = blobUrl;
      a.download = filename;

      a.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Download error:', error);
    }
  }
  
  showProjectNotification(args) {
    const text = args.text;
    const url = args.url;
    const seconds = args.second * 1000;

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '50%';
    container.style.bottom = '-170px';
    container.style.transform = 'translate(-50%, 0)';
    container.style.borderRadius = '20px';
    container.style.padding = '10px';
    container.style.backgroundColor = args.color;
    container.style.overflow = 'hidden';
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.5s, bottom 0.5s';
    container.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    container.style.zIndex = '9999';

    const contentContainer = document.createElement('div');
    contentContainer.style.display = 'flex';
    contentContainer.style.alignItems = 'center';

    const imgContainer = document.createElement('div');
    imgContainer.style.width = '70px';
    imgContainer.style.height = '70px';
    imgContainer.style.marginRight = '10px';

    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.style.width = '70px';
    imgElement.style.height = '70px';
    imgElement.style.borderRadius = '10px';

    imgContainer.appendChild(imgElement);

    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.style.color = args.textcolor;
    textElement.style.flex = '1';

    contentContainer.appendChild(imgContainer);
    contentContainer.appendChild(textElement);

    container.appendChild(contentContainer);
    document.body.appendChild(container);

    this.activeMessages.push(container);

    if (this.activeMessages.length > 1) {
      const previousMessage = this.activeMessages.shift();
      previousMessage.style.opacity = '0';
      previousMessage.style.bottom = '-' + (container.clientHeight + 20) + 'px';
      setTimeout(function() {
        previousMessage.remove();
      }, 500);
    }

    setTimeout(function() {
      container.style.opacity = '1';
      container.style.bottom = '50px';
    }, 100);

    setTimeout(function() {
      container.style.opacity = '0';
      container.style.bottom = '-' + (container.clientHeight + 20) + 'px';
      setTimeout(function() {
        container.remove();
      }, 500);
    }, seconds + 100);
  }
  
  async notificationPermissions() {
    return Notification.permission === "granted";
  }

  async sendNotificationPermission() {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notifications.");
    } else if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission);
    }
  }

  showNotification(args) {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notifications.");
      } else if (Notification.permission === "granted") {
        const title = this.customTitle;
        const options = {
            body: args.text,
        };
        const notification = new Notification(title, options);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
         if (permission === "granted") {
           const title = this.customTitle;
           const options = {
             body: args.text,
           };
           const notification = new Notification(title, options);
        }
      });
    }
  }
	
  setNotificationTitle(args) {
    this.customTitle = args.title;
  }
  
  async playSound({ url }) {
    try {
      const existingAudio = this.playingSounds.get(url);
      if (existingAudio) {
        if (existingAudio.paused) {
          existingAudio.play();
          this.isPlaying = true;
          this.paused = false;
          return;
        }
      } else {
        this.stopSound();
      }

      const audio = new Audio(url);
      audio.volume = this.volume / 100;
      audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.currentSoundURL = '';
        if (this.waitingPromise) {
          this.waitingPromise.resolve();
          this.waitingPromise = null;
        }
      });
      audio.play();
      this.playingSounds.set(url, audio);
      this.currentSoundURL = url;
      this.isPlaying = true;
      this.errorStatus = '';
    } catch (error) {
      console.error('Error playing sound:', error);
      this.errorControl();
    }
  }

  async playSoundAndWait({ url }) {
    try {
      const existingAudio = this.playingSounds.get(url);
      if (existingAudio) {
        if (existingAudio.paused) {
          existingAudio.play();
          this.isPlaying = true;
          this.paused = false;
          return new Promise((resolve) => {
            existingAudio.addEventListener('ended', () => {
              this.isPlaying = false;
              this.currentSoundURL = '';
              resolve();
            });
            this.waitingPromise = { resolve };
          });
        }
      } else {
        this.stopSound();
      }

      const promise = new Promise((resolve) => {
        const audio = new Audio(url);
        audio.volume = this.volume / 100;
        audio.addEventListener('ended', () => {
          this.isPlaying = false;
          this.currentSoundURL = '';
          resolve();
        });
        audio.play();
        this.playingSounds.set(url, audio);
        this.currentSoundURL = url;
        this.isPlaying = true;
        this.errorStatus = '';
        this.waitingPromise = { resolve };
      });
      return promise;
    } catch (error) {
      console.error('Error playing sound:', error);
      this.errorControl();
    }
  }

  stopSound() {
    if (this.isPlaying) {
      this.playingSounds.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      this.playingSounds.clear();
      this.currentSoundURL = '';
      this.isPlaying = false;
      this.errorStatus = '';
      if (this.waitingPromise) {
        this.waitingPromise.resolve();
        this.waitingPromise = null;
      }
    }
  }

  currentSound() {
    return this.currentSoundURL;
  }

  soundTime() {
    if (this.playingSounds.has(this.currentSoundURL)) {
      return this.playingSounds.get(this.currentSoundURL).duration;
    }
    return 0;
  }

  soundCurrentTime() {
    if (this.playingSounds.has(this.currentSoundURL)) {
      if (this.isPlaying) {
        return this.playingSounds.get(this.currentSoundURL).currentTime;
      } else {
        return '-';
      }
    }
    return 0;
  }

  isPlayingSound() {
    return this.isPlaying && !this.paused && this.playingSounds.size > 0;
  }

  seekSound({ time }) {
    if (this.playingSounds.has(this.currentSoundURL)) {
      this.playingSounds.get(this.currentSoundURL).currentTime = time;
    }
  }

  setVolume({ volume }) {
    this.volume = Math.min(100, Math.max(0, volume));
    this.playingSounds.forEach((audio) => {
      audio.volume = this.volume / 100;
    });
  }

  getVolume() {
    return this.volume;
  }

  errorControl() {
    this.isPlaying = false;
    this.currentSoundURL = '';
    this.errorStatus = 'Error';
    if (this.waitingPromise) {
      this.waitingPromise.resolve();
      this.waitingPromise = null;
    }
  }

  async openFile() {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'audio/*';
      fileInput.click();

      return new Promise((resolve, reject) => {
        fileInput.addEventListener('change', (event) => {
          const file = event.target.files[0];
          if (!file) {
            reject('No file selected');
            return;
          }

          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target.result.split(',')[1];
            const mimeType = file.type;
            resolve(`data:${mimeType};base64,${base64}`);
          };
          reader.onerror = () => {
            reject('Error reading file');
          };

          reader.readAsDataURL(file);
        });

        fileInput.addEventListener('cancel', () => {
          reject('File selection canceled');
        });
      });
    } catch (error) {
      console.error('Error opening file:', error);
      throw new Error('Error opening file');
    }
  }
  
  getCurrentTime() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  getCurrentDate() {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `${now.getDate()} ${month} ${year}`;
  }

  getDayOfWeek() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[now.getDay()];
  }
  
  get12HourTime() {
  const now = new Date();
  let hour = now.getHours();
  const period = hour < 12 ? 'AM' : 'PM';
  hour = hour % 12 || 12;
  const minute = now.getMinutes().toString().padStart(2, '0');
  const hourFormatted = hour < 10 ? `0${hour}` : hour;
  return `${hourFormatted}:${minute} ${period}`;
  }
}

const xmerutilities = new XmerUtilities();
xmerutilities.initInteractions();
Scratch.extensions.register(xmerutilities);
window.addEventListener('beforeunload', xmerutilities.handleCloseRequest.bind(xmerutilities));
})(Scratch);
