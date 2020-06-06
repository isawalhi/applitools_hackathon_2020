const { By } = require("selenium-webdriver/lib/by");
const until = require("selenium-webdriver/lib/until");
const sleep = require("sleep");

const { ELEMENT_TIMEOUT } = require("../../config");

const MAIN_ELEMENTS = {
  FILTER_SIDE_ID: "sidebar_filters",
  PRODUCT_GRID_ID: "product_grid",
  PRODUCT_PREFX: "product_"
};

class SearchPage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitFilterPanel() {
    const filtersSidePanel = await this.driver.findElement(By.css(".filter_col.show"));
    await this.driver.wait(until.elementIsVisible(filtersSidePanel));
  }

  async openFilterPanel() {
    await this.driver.findElement(By.css("li > .open_filters")).click();
    await this.waitFilterPanel();
    sleep.sleep(1);
  }

  async selectFilter(type, item) {
    await this.driver.wait(until.elementLocated(By.id(`${type}__${item}`)), ELEMENT_TIMEOUT);
    await this.driver.findElement(By.id(`${type}__${item}`)).click();
  }

  async collapseFilterType(num) {
    await this.driver
      .findElement(
        By.css(`#${MAIN_ELEMENTS.FILTER_SIDE_ID} .filter_type:nth-of-type(${num}) .opened`),
      )
      .click();
  }

  async openFilterType(num) {
    await this.driver
      .findElement(
        By.css(`#${MAIN_ELEMENTS.FILTER_SIDE_ID} .filter_type:nth-of-type(${num}) .closed`),
      )
      .click();
  }

  async submitFilter() {
    const submitBtn = await this.driver.findElement(By.id("filterBtn"));
    await this.driver.wait(until.elementIsEnabled(submitBtn));
    await submitBtn.click();
    sleep.sleep(1);
  }

  async applyFilter(type, item) {
    await this.openFilterPanel();

    await this.selectFilter(type, item);

    await this.submitFilter();
  }

  async selectProduct(num) {
    const eleId = MAIN_ELEMENTS.PRODUCT_PREFX + num;
    await this.driver.wait(until.elementLocated(By.id(eleId)), ELEMENT_TIMEOUT);
    await this.driver.findElement(By.id(eleId)).click();
  }

  async hoverOnProduct(num) {
    
    const eleId = MAIN_ELEMENTS.PRODUCT_PREFX + num;
    await this.driver.wait(until.elementLocated(By.id(eleId)), ELEMENT_TIMEOUT);
    await this.driver.executeScript(`$('#${eleId}').hover();`);
  }
}

module.exports = { SearchPage, MAIN_ELEMENTS };
