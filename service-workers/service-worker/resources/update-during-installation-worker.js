'use strict';

const installEventFired = new Promise(resolve => {
  self.fireInstallEvent = resolve;
});

const installFinished = new Promise(resolve => {
  self.finishInstall = resolve;
});

addEventListener('install', event => {
  fireInstallEvent();
  event.waitUntil(installFinished);
});

addEventListener('message', event => {
  const port = event.data;
  port.onmessage = (event) => {
    switch (event.data) {
      case 'awaitInstallEvent':
        installEventFired.then(() => {
            port.postMessage('installEventFired');
        });
        break;

      case 'finishInstall':
        installFinished.then(() => {
            port.postMessage('installFinished');
        });
        finishInstall();
        break;

      case 'callUpdate':
        registration.update().then(() => {
            port.postMessage({
                success: true,
            });
        }).catch((exception) => {
            port.postMessage({
                success: false,
                exception: exception.name,
            });
        });
        break;

      default:
        port.postMessage('Unexpected command ' + event.data);
        break;
    }
  }
});
