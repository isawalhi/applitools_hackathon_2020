const { By } = require("selenium-webdriver/lib/by");

class Common {
  constructor(driver) {
    this.driver = driver;
  }

  getSelector(id, className, css) {
    let selector;
    if (id) {
      selector = By.id(id);
    } else if (className) {
      selector = By.className(className);
    } else {
      selector = By.css(css);
    }
    return selector;
  }

  async getDisplayedElements({ className, id, css }) {
    const selector = this.getSelector(id, className, css);
    let length = 0;
    try {
      const els = await this.driver.findElements(selector);
      for (let i = 0; i < els.length; i++) {
        if (els[i].isDisplayed()) {
          length++;
        }
      }
      return length;
    } catch (e) {
      return 0;
    }
  }

  async isElementDisplayed({ className, id, css }) {
    const selector = this.getSelector(id, className, css);

    try {
      return await this.driver.findElement(selector).isDisplayed();
    } catch (e) {
      return false;
    }
  }

  async getElementInnerText({ className, id, css }) {
    const selector = this.getSelector(id, className, css);

    try {
      return await this.driver.findElement(selector).getText();
    } catch (e) {
      return undefined;
    }
  }

  async getElementStyleProp({ className, id, css }, cssTarget) {
    const selector = this.getSelector(id, className, css);
    
    try {
      return await this.driver.findElement(selector).getCssValue(cssTarget);
    } catch (e) {
      return undefined;
    }
  }
}

module.exports = Common;
