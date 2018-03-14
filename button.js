const GPIO = require('onoff').Gpio;

class Button {

  constructor(handleButtonPressed) {
    this.handleButtonPressed = handleButtonPressed;
    this.ledGpio = new GPIO(17, 'out');
    this.pushGpio = new GPIO(2, 'in', 'falling');
    this.active = false;
    this.blinkInterval;
  }

  setupButton() {
    this.startBlink();
    this.pushGpio.watch((err) => {
      if (err)
        console.log(err);

      if (!this.active)
        return;

      this.active = false;

      setTimeout(() => {
        this.handleButtonPressed();
      }, 100);

      this.resetBlinkTimer();
    });
  }

  setBlinkTimer() {
    setTimeout(() => {
      this.startBlink();
    }, 20000);
  };

  resetBlinkTimer() {
    clearInterval(this.blinkInterval);
    this.active = false;
    this.ledGpio.writeSync(0);
    this.setBlinkTimer();
  };

  startBlink() {
    this.active = true;
    let count = 0;
    this.blinkInterval = setInterval(() => {
      if (count <= 10) {
        this.ledGpio.writeSync(count % 2);
        count++;
      }
      else {
        this.resetBlinkTimer();
      }
    }, 500);
  };

}

module.exports = Button;