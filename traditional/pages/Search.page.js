const { By } = require("selenium-webdriver/lib/by");
const until = require("selenium-webdriver/lib/until");
const sleep = require("sleep");
const { ELEMENT_TIMEOUT } = require("../../config");

const MAIN_ELEMENTS = {
  FOOTER: { css: '[id*="FOOTER____"]' },
  FOOTER_ITEMS: { css: "footer .row li[id*='LI____']" },
  LOGO: { id: "logo" },
  SEARCH: { id: "DIV__customsear__41" },
  SEARCH_ICON: { id: "I__headericon__44" },
  HEADER_MENU: { id: "DIV__mainmenu__15" },
  PROFILE: { id: "A__accesslink__56" },
  WISH_LIST: { id: "A__wishlist__52" },
  CART: { id: "A__cartbt__49" },
  CART_BADGE: { id: "STRONG____50" },
  TOP_BANNER: { css: '[id*="DIV__topbanner__"]' },
  SORT: { css: '[id*="DIV__sortselect__"]' },
  GRID_VIEW: { css: '[id*="I__tiviewgrid__"]' },
  LIST_VIEW: { css: '[id*="I__tiviewlist__"]' },
  FILTER: { css: 'li > [id*="A__openfilter__"]' },
  FILTER_ICON: { id: "ti-filter" },
  FILTER_COL: { id: "filter_col" },
  PRODUCT_ITEM: { css: '[id*="DIV__colcolmd__"]' },
  FILTER_ITEM: { css: '[id*="LABEL__containerc__"]' },
  FILTER_GROUP: { css: '[id*="A__opened__"][class="opened"]' },
  FILTER_SUBMIT_BUTTON: { id: "filterBtn" },
  FILTER_RESET: { id: "resetBtn" },
  PRODUCT_RIBBON: { css: '[id*="SPAN__ribbonoff__"]' },
  PRODUCT_COUNTDOWN: { css: '[id*="DIV__countdown__"]' },
  PRODUCT_TYPE: { css: '.grid_item > [id*="A____"]' },
  PRODUCT_NEW_PRICE: { css: '[id*="SPAN__newprice__"]' },
  PRODUCT_OLD_PRICE: { css: '[id*="SPAN__oldprice__"]' },
  PRODUCT_WISH_BUTTON: { css: '[id*="I__tiheart__"]' },
  PRODUCT_COMPARE_BUTTON: { css: '[id*="I__ticontrols__"]' },
  PRODUCT_CART_BUTTON: { css: '[id*="I__tishopping__"]' },
};

class SearchPage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitFilterPanel() {
    const filtersSidePanel = await this.driver.findElement(By.css(".filter_col.show"));
    await this.driver.wait(until.elementIsVisible(filtersSidePanel));
    sleep.sleep(1);
  }

  async openFilterPanel() {
    await this.driver.findElement(By.css("li > .open_filters")).click();
    await this.waitFilterPanel();
  }

  async selectFilter(type, item) {
    await this.driver.wait(until.elementLocated(By.id(`${type}__${item}`)), ELEMENT_TIMEOUT);
    await this.driver.findElement(By.id(`${type}__${item}`)).click();
  }

  async submitFilter() {
    const submitBtn = await this.driver.findElement(By.id(MAIN_ELEMENTS.FILTER_SUBMIT_BUTTON.id));
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
    const eleId = "product_" + num;
    await this.driver.wait(until.elementLocated(By.id(eleId)), ELEMENT_TIMEOUT);
    await this.driver.findElement(By.id(eleId)).click();
    sleep.sleep(1);
  }

  async getNumberOfProducts() {
    const els = await this.driver.findElements(By.className("grid_item"));
    return els.length;
  }
}

module.exports = { SearchPage, MAIN_ELEMENTS };
