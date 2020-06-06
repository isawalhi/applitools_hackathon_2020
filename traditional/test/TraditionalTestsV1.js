"use strict";

const { Builder, By } = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let firefox = require("selenium-webdriver/firefox");
let edge = require("selenium-webdriver/edge");

const { startUrl } = require("../../config");
var assert = require("assert");

const Reporter = require("../Reporter");

const { SearchPage, MAIN_ELEMENTS } = require("../pages/Search.page");
const { PRODUCT_ELEMENTS } = require("../pages/Product.page");
const CommonActions = require("../pages/Common");

describe("Applitools Hackathon", function () {
  let driver, commonActions, reporter;

  const REPORT_NAME = "Traditional-V1-TestResults.txt";

  /** Tests are grouped based on the test viewport */
  describe("viewport: 768x700", async () => {
    const width = 786;
    const height = 700;
    describe("Chrome", async () => {
      before(async () => {
        driver = await new Builder()
          .forBrowser("chrome")
          .setChromeOptions(new chrome.Options().windowSize({ width, height }))
          .build();
        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Chrome", `${width}x${height}`, "Laptop");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    describe("Firefox", async () => {
      before(async () => {
        driver = await new Builder()
          .forBrowser("firefox")
          .setFirefoxOptions(new firefox.Options().windowSize({ width, height }))
          .build();

        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Firefox", `${width}x${height}`, "Laptop");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    describe("Edge Chromium", async () => {
      before(async () => {
        let options = new edge.Options();
        options.setEdgeChromium(true);
        options.windowSize({ width, height });

        driver = await new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(options).build();

        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Edge Chromium", `${width}x${height}`, "Laptop");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    function executeTask1Tests(task) {
      describe("Task1: Search page tests", () => {
        assertElementDisplayed(task, "displays logo", MAIN_ELEMENTS.LOGO);
        assertElementDisplayed(task, "displays search input", MAIN_ELEMENTS.SEARCH);
        assertElementDisplayed(task, "displays search icon", MAIN_ELEMENTS.SEARCH_ICON);
        assertElementDisplayed(task, "displays profile dropdown", MAIN_ELEMENTS.PROFILE);
        assertElementDisplayed(task, "displays cart dropdown", MAIN_ELEMENTS.CART);
        assertElementDisplayed(task, "displays cart badge", MAIN_ELEMENTS.CART_BADGE);

        assertElementDisplayed(task, "displays top banner", MAIN_ELEMENTS.TOP_BANNER);
        assertElementDisplayed(task, "displays sort input", MAIN_ELEMENTS.SORT);

        assertElementDisplayed(task, "displays filter button", MAIN_ELEMENTS.FILTER);
        assertElementDisplayed(task, "displays sort icon", MAIN_ELEMENTS.SORT);

        assertElementDisplayed(task, "displays the footer", MAIN_ELEMENTS.FOOTER);

        assertElementIsNotDisplayed(
          task,
          "shouldn't display filter submit button",
          MAIN_ELEMENTS.FILTER_SUBMIT_BUTTON,
        );
        assertElementIsNotDisplayed(
          task,
          "shouldn't display filter reset button",
          MAIN_ELEMENTS.FILTER_RESET,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display grid view button",
          MAIN_ELEMENTS.GRID_VIEW,
        );
        assertElementIsNotDisplayed(
          task,
          "shouldn't display list view button",
          MAIN_ELEMENTS.LIST_VIEW,
        );
        assertElementIsNotDisplayed(
          task,
          "shouldn't display wishlist button",
          MAIN_ELEMENTS.WISH_LIST,
        );
        assertElementIsNotDisplayed(
          task,
          "shouldn't display header menu",
          MAIN_ELEMENTS.HEADER_MENU,
        );
        assertElementIsNotDisplayed(
          task,
          "shouldn't display filter sidebar",
          MAIN_ELEMENTS.FILTER_COL,
        );

        assertElementsAreDisplayed(task, "should return 9 products", MAIN_ELEMENTS.PRODUCT_ITEM, 9);

        assertElementsAreDisplayed(
          task,
          "should return 9 product wish buttons",
          MAIN_ELEMENTS.PRODUCT_WISH_BUTTON,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product cart buttons",
          MAIN_ELEMENTS.PRODUCT_CART_BUTTON,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product compare buttons",
          MAIN_ELEMENTS.PRODUCT_COMPARE_BUTTON,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 13 itmes in the footor",
          MAIN_ELEMENTS.FOOTER_ITEMS,
          13,
        );

        assertElementsAreDisplayed(
          task,
          "should return 3 ribbons on all the products",
          MAIN_ELEMENTS.PRODUCT_RIBBON,
          3,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product types on all the products",
          MAIN_ELEMENTS.PRODUCT_TYPE,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product prices on all the products",
          MAIN_ELEMENTS.PRODUCT_NEW_PRICE,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 3 product old prices on all the products",
          MAIN_ELEMENTS.PRODUCT_OLD_PRICE,
          3,
        );

        assertElementsAreDisplayed(
          task,
          "should return 18 filter items",
          MAIN_ELEMENTS.FILTER_ITEM,
          18,
        );

        assertElementsAreDisplayed(
          task,
          "should return 4 filter types",
          MAIN_ELEMENTS.FILTER_GROUP,
          4,
        );
      });
    }

    function executeTask2Tests(task) {
      describe("Task2: Filtered products tests", () => {
        it("Filters the results", async () => {
          const searchPage = new SearchPage(driver);
          await searchPage.applyFilter("colors", "Black");
        });

        assertElementDisplayed(task, "displays filter button", MAIN_ELEMENTS.FILTER);
        assertElementDisplayed(task, "displays sort icon", MAIN_ELEMENTS.SORT);

        assertElementsAreDisplayed(task, "should return 2 products", MAIN_ELEMENTS.PRODUCT_ITEM, 2);

        assertElementsAreDisplayed(
          task,
          "should return 1 ribbon on all the products",
          MAIN_ELEMENTS.PRODUCT_RIBBON,
          1,
        );

        assertElementsAreDisplayed(
          task,
          "should return 2 product types on all the products",
          MAIN_ELEMENTS.PRODUCT_TYPE,
          2,
        );

        assertElementsAreDisplayed(
          task,
          "should return 2 product prices on all the products",
          MAIN_ELEMENTS.PRODUCT_NEW_PRICE,
          2,
        );

        assertElementsAreDisplayed(
          task,
          "should return 1 product old prices on all the products",
          MAIN_ELEMENTS.PRODUCT_OLD_PRICE,
          1,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display grid view button",
          MAIN_ELEMENTS.GRID_VIEW,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display list view button",
          MAIN_ELEMENTS.LIST_VIEW,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display wishlist button",
          MAIN_ELEMENTS.WISH_LIST,
        );
      });
    }

    function executesTask3Tests(task) {
      describe("Task3: Product page tests", () => {
        it("Selects the first product", async () => {
          const searchPage = new SearchPage(driver);
          await searchPage.selectProduct(1);
        });

        assertElementDisplayed(task, "displays logo", MAIN_ELEMENTS.LOGO);
        assertElementDisplayed(task, "displays search input", MAIN_ELEMENTS.SEARCH);
        assertElementDisplayed(task, "displays search icon", MAIN_ELEMENTS.SEARCH_ICON);
        assertElementDisplayed(task, "displays profile dropdown", MAIN_ELEMENTS.PROFILE);
        assertElementDisplayed(task, "displays cart dropdown", MAIN_ELEMENTS.CART);
        assertElementDisplayed(task, "displays cart badge", MAIN_ELEMENTS.CART_BADGE);
        assertElementDisplayed(task, "display shoe name", PRODUCT_ELEMENTS.SHOE_NAME);
        assertElementDisplayed(task, "display shoe image", PRODUCT_ELEMENTS.SHOE_IMG);
        assertElementDisplayed(
          task,
          "display number of reviews",
          PRODUCT_ELEMENTS.NUMBER_OF_REVIEWS,
        );
        assertElementDisplayed(task, "display reviewer's name", PRODUCT_ELEMENTS.REVIEWER_NAME);
        assertElementDisplayed(
          task,
          "display reviewer's comment",
          PRODUCT_ELEMENTS.REVIEWER_COMMENT,
        );
        assertElementDisplayed(
          task,
          "display quinity input field",
          PRODUCT_ELEMENTS.QUANTITY_INPUT,
        );
        assertElementDisplayed(task, "display size select field", PRODUCT_ELEMENTS.SIZE_SELECT);
        assertElementDisplayed(task, "display add to cart button", PRODUCT_ELEMENTS.ADD_TO_CART);
        assertElementDisplayed(task, "display new price", PRODUCT_ELEMENTS.NEW_PRICE);
        assertElementDisplayed(task, "display old price", PRODUCT_ELEMENTS.OLD_PRICE);
        assertElementDisplayed(task, "display discount", PRODUCT_ELEMENTS.DISCOUNT);

        assertElementIsNotDisplayed(
          task,
          "shouldn't display header menu",
          MAIN_ELEMENTS.HEADER_MENU,
        );

        assertElementContainText(
          task,
          "Selected size should be Small (S)",
          PRODUCT_ELEMENTS.SELECTED_SIZE,
          "Small (S)",
        );

        assertElementHasStyle(
          task,
          "Displays reviewer name in black color",
          PRODUCT_ELEMENTS.REVIEWER_NAME,
          "color",
          "68, 68, 68",
        );
      });
    }
  });

  describe("viewport: 1200x700", async () => {
    const width = 1200;
    const height = 700;
    describe("Chrome", async () => {
      before(async () => {
        driver = await new Builder()
          .forBrowser("chrome")
          .setChromeOptions(new chrome.Options().windowSize({ width, height }))
          .build();
        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Chrome", `${width}x${height}`, "Laptop");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    describe("Firefox", async () => {
      before(async () => {
        driver = await new Builder()
          .forBrowser("firefox")
          .setFirefoxOptions(new firefox.Options().windowSize({ width, height }))
          .build();

        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Firefox", `${width}x${height}`, "Laptop");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    describe("Edge Chromium", async () => {
      before(async () => {
        let options = new edge.Options();
        options.setEdgeChromium(true);
        options.windowSize({ width, height });

        driver = await new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(options).build();

        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Edge Chromium", `${width}x${height}`, "Laptop");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products tests
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    function executeTask1Tests(task) {
      describe("Task1: Search page tests", () => {
        assertElementDisplayed(task, "displays logo", MAIN_ELEMENTS.LOGO);
        assertElementDisplayed(task, "displays search input", MAIN_ELEMENTS.SEARCH);
        assertElementDisplayed(task, "displays search icon", MAIN_ELEMENTS.SEARCH_ICON);
        assertElementDisplayed(task, "displays profile dropdown", MAIN_ELEMENTS.PROFILE);
        assertElementDisplayed(task, "displays cart dropdown", MAIN_ELEMENTS.CART);
        assertElementDisplayed(task, "displays cart badge", MAIN_ELEMENTS.CART_BADGE);
        assertElementDisplayed(task, "displays top banner", MAIN_ELEMENTS.TOP_BANNER);
        assertElementDisplayed(task, "displays sort input", MAIN_ELEMENTS.SORT);
        assertElementDisplayed(task, "displays sort icon", MAIN_ELEMENTS.SORT);
        assertElementDisplayed(task, "displays the footer", MAIN_ELEMENTS.FOOTER);

        assertElementDisplayed(
          task,
          "displays filter submit button",
          MAIN_ELEMENTS.FILTER_SUBMIT_BUTTON,
        );
        assertElementDisplayed(task, "displays filter reset button", MAIN_ELEMENTS.FILTER_RESET);
        assertElementDisplayed(task, "displays grid view input", MAIN_ELEMENTS.GRID_VIEW);
        assertElementDisplayed(task, "displays list view input", MAIN_ELEMENTS.LIST_VIEW);
        assertElementDisplayed(task, "displays wishlist dropdown", MAIN_ELEMENTS.WISH_LIST);
        assertElementDisplayed(task, "displays header menu", MAIN_ELEMENTS.HEADER_MENU);
        assertElementDisplayed(task, "displays filter sidebar", MAIN_ELEMENTS.FILTER_COL);

        assertElementsAreDisplayed(task, "should return 9 products", MAIN_ELEMENTS.PRODUCT_ITEM, 9);

        assertElementsAreDisplayed(
          task,
          "should return 9 product wish buttons",
          MAIN_ELEMENTS.PRODUCT_WISH_BUTTON,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product cart buttons",
          MAIN_ELEMENTS.PRODUCT_CART_BUTTON,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 13 itmes in the footor",
          MAIN_ELEMENTS.FOOTER_ITEMS,
          13,
        );

        assertElementsAreDisplayed(
          task,
          "should return 3 ribbons on all the products",
          MAIN_ELEMENTS.PRODUCT_RIBBON,
          3,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product types on all the products",
          MAIN_ELEMENTS.PRODUCT_TYPE,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product prices on all the products",
          MAIN_ELEMENTS.PRODUCT_NEW_PRICE,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 3 product old prices on all the products",
          MAIN_ELEMENTS.PRODUCT_OLD_PRICE,
          3,
        );

        assertElementsAreDisplayed(
          task,
          "should return 18 filter items",
          MAIN_ELEMENTS.FILTER_ITEM,
          18,
        );

        assertElementsAreDisplayed(
          task,
          "should return 4 filter types",
          MAIN_ELEMENTS.FILTER_GROUP,
          4,
        );

        assertElementIsNotDisplayed(task, "shouldn't display filter button", MAIN_ELEMENTS.FILTER);
      });
    }

    function executeTask2Tests(task) {
      describe("Task2: Filtered products tests", () => {
        it("Filters the results", async () => {
          const searchPage = new SearchPage(driver);
          await searchPage.selectFilter("colors", "Black");
          await searchPage.submitFilter();
        });

        assertElementDisplayed(task, "displays sort icon", MAIN_ELEMENTS.SORT);

        assertElementsAreDisplayed(task, "should return 2 products", MAIN_ELEMENTS.PRODUCT_ITEM, 2);

        assertElementsAreDisplayed(
          task,
          "should return 1 ribbon on all the products",
          MAIN_ELEMENTS.PRODUCT_RIBBON,
          1,
        );

        assertElementsAreDisplayed(
          task,
          "should return 2 product types on all the products",
          MAIN_ELEMENTS.PRODUCT_TYPE,
          2,
        );

        assertElementsAreDisplayed(
          task,
          "should return 2 product prices on all the products",
          MAIN_ELEMENTS.PRODUCT_NEW_PRICE,
          2,
        );

        assertElementsAreDisplayed(
          task,
          "should return 1 product old prices on all the products",
          MAIN_ELEMENTS.PRODUCT_OLD_PRICE,
          1,
        );

        assertElementDisplayed(task, "display grid view input", MAIN_ELEMENTS.GRID_VIEW);

        assertElementDisplayed(task, "display list view input", MAIN_ELEMENTS.LIST_VIEW);

        assertElementDisplayed(task, "display wishlist dropdown", MAIN_ELEMENTS.WISH_LIST);

        assertElementIsNotDisplayed(task, "shouldn't display filter button", MAIN_ELEMENTS.FILTER);
      });
    }

    function executesTask3Tests(task) {
      describe("Task3: Product details tests", () => {
        it("Selects the first product", async () => {
          const searchPage = new SearchPage(driver);
          await searchPage.selectProduct(1);
        });

        assertElementDisplayed(task, "displays logo", MAIN_ELEMENTS.LOGO);
        assertElementDisplayed(task, "displays search input", MAIN_ELEMENTS.SEARCH);
        assertElementDisplayed(task, "displays search icon", MAIN_ELEMENTS.SEARCH_ICON);
        assertElementDisplayed(task, "displays profile dropdown", MAIN_ELEMENTS.PROFILE);
        assertElementDisplayed(task, "displays cart dropdown", MAIN_ELEMENTS.CART);
        assertElementDisplayed(task, "displays cart badge", MAIN_ELEMENTS.CART_BADGE);

        assertElementDisplayed(task, "displays header menu", MAIN_ELEMENTS.HEADER_MENU);

        assertElementDisplayed(task, "display shoe name", PRODUCT_ELEMENTS.SHOE_NAME);
        assertElementDisplayed(task, "display shoe image", PRODUCT_ELEMENTS.SHOE_IMG);
        assertElementDisplayed(
          task,
          "display number of reviews",
          PRODUCT_ELEMENTS.NUMBER_OF_REVIEWS,
        );
        assertElementDisplayed(task, "display reviewer's name", PRODUCT_ELEMENTS.REVIEWER_NAME);
        assertElementDisplayed(
          task,
          "display reviewer's comment",
          PRODUCT_ELEMENTS.REVIEWER_COMMENT,
        );
        assertElementDisplayed(
          task,
          "display quinity input field",
          PRODUCT_ELEMENTS.QUANTITY_INPUT,
        );
        assertElementDisplayed(task, "display size select field", PRODUCT_ELEMENTS.SIZE_SELECT);
        assertElementDisplayed(task, "display add to cart button", PRODUCT_ELEMENTS.ADD_TO_CART);
        assertElementDisplayed(task, "display new price", PRODUCT_ELEMENTS.NEW_PRICE);
        assertElementDisplayed(task, "display old price", PRODUCT_ELEMENTS.OLD_PRICE);
        assertElementDisplayed(task, "display discount", PRODUCT_ELEMENTS.DISCOUNT);

        assertElementContainText(
          task,
          "Selected size should be Small (S)",
          PRODUCT_ELEMENTS.SELECTED_SIZE,
          "Small (S)",
        );

        assertElementHasStyle(
          task,
          "Displays reviewer name in black color",
          PRODUCT_ELEMENTS.REVIEWER_NAME,
          "color",
          "68, 68, 68",
        );
      });
    }
  });

  describe("Mobile: 375x800", async () => {
    const width = 375;
    const height = 800;
    describe("Chrome", async () => {
      before(async () => {
        driver = await new Builder()
          .forBrowser("chrome")
          .setChromeOptions(new chrome.Options().windowSize({ width, height }))
          .build();
        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Chrome", `${width}x${height}`, "Mobile");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products tests
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    describe("Firefox", async () => {
      before(async () => {
        driver = await new Builder()
          .forBrowser("firefox")
          .setFirefoxOptions(new firefox.Options().windowSize({ width, height }))
          .build();

        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Firefox", `${width}x${height}`, "Mobile");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products tests
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    describe("Edge Chromium", async () => {
      before(async () => {
        let options = new edge.Options();
        options.setEdgeChromium(true);
        options.windowSize({ width, height });

        driver = await new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(options).build();

        commonActions = new CommonActions(driver);

        reporter = new Reporter(REPORT_NAME, "Edge Chromium", `${width}x${height}`, "Mobile");

        await driver.get(startUrl);
      });

      // Search page tests
      executeTask1Tests(1);
      // Filtered products tests
      executeTask2Tests(2);
      // Product details tests
      executesTask3Tests(3);

      after(async () => {
        await driver.quit();
      });
    });

    function executeTask1Tests(task) {
      describe("Task1: Search page tests", () => {
        assertElementDisplayed(task, "displays logo", MAIN_ELEMENTS.LOGO);
        assertElementDisplayed(task, "displays profile dropdown", MAIN_ELEMENTS.PROFILE);
        assertElementDisplayed(task, "displays cart dropdown", MAIN_ELEMENTS.CART);
        assertElementDisplayed(task, "displays top banner", MAIN_ELEMENTS.TOP_BANNER);
        assertElementDisplayed(task, "displays sort input", MAIN_ELEMENTS.SORT);
        assertElementDisplayed(task, "displays filter button", MAIN_ELEMENTS.FILTER);
        assertElementDisplayed(task, "displays sort icon", MAIN_ELEMENTS.SORT);
        assertElementDisplayed(task, "displays the footer", MAIN_ELEMENTS.FOOTER);
        assertElementsAreDisplayed(task, "should return 9 products", MAIN_ELEMENTS.PRODUCT_ITEM, 9);

        assertElementsAreDisplayed(task, "should return 9 products", MAIN_ELEMENTS.PRODUCT_ITEM, 9);

        assertElementsAreDisplayed(
          task,
          "should return 9 product wish buttons",
          MAIN_ELEMENTS.PRODUCT_WISH_BUTTON,
          9,
        );

        assertElementsAreDisplayed(
          task,
          "should return 9 product cart buttons",
          MAIN_ELEMENTS.PRODUCT_CART_BUTTON,
          9,
        );
        assertElementsAreDisplayed(
          task,
          "should return 13 itmes in the footor",
          MAIN_ELEMENTS.FOOTER_ITEMS,
          13,
        );
        assertElementsAreDisplayed(
          task,
          "should return 3 ribbons on all the products",
          MAIN_ELEMENTS.PRODUCT_RIBBON,
          3,
        );
        assertElementsAreDisplayed(
          task,
          "should return 9 product types on all the products",
          MAIN_ELEMENTS.PRODUCT_TYPE,
          9,
        );
        assertElementsAreDisplayed(
          task,
          "should return 9 product prices on all the products",
          MAIN_ELEMENTS.PRODUCT_NEW_PRICE,
          9,
        );
        assertElementsAreDisplayed(
          task,
          "should return 3 product old prices on all the products",
          MAIN_ELEMENTS.PRODUCT_OLD_PRICE,
          3,
        );
        assertElementsAreDisplayed(
          task,
          "should return 18 filter items",
          MAIN_ELEMENTS.FILTER_ITEM,
          18,
        );
        assertElementsAreDisplayed(
          task,
          "should return 4 filter types",
          MAIN_ELEMENTS.FILTER_GROUP,
          4,
        );

        assertElementIsNotDisplayed(task, "should not display search input", MAIN_ELEMENTS.SEARCH);
        assertElementIsNotDisplayed(
          task,
          "should not display search icon",
          MAIN_ELEMENTS.SEARCH_ICON,
        );
        assertElementIsNotDisplayed(
          task,
          "should not display cart badge",
          MAIN_ELEMENTS.CART_BADGE,
        );

        assertElementIsNotDisplayed(
          task,
          "should not display filter submit button",
          MAIN_ELEMENTS.FILTER_SUBMIT_BUTTON,
        );
        assertElementIsNotDisplayed(
          task,
          "should not display filter reset button",
          MAIN_ELEMENTS.FILTER_RESET,
        );

        assertElementIsNotDisplayed(
          task,
          "should not display grid view input",
          MAIN_ELEMENTS.GRID_VIEW,
        );
        assertElementIsNotDisplayed(
          task,
          "should not display list view input",
          MAIN_ELEMENTS.LIST_VIEW,
        );
        assertElementIsNotDisplayed(
          task,
          "should not display wishlist dropdown",
          MAIN_ELEMENTS.WISH_LIST,
        );
        assertElementIsNotDisplayed(
          task,
          "should not display header menu",
          MAIN_ELEMENTS.HEADER_MENU,
        );
        assertElementIsNotDisplayed(
          task,
          "should not display filter sidebar",
          MAIN_ELEMENTS.FILTER_COL,
        );
      });
    }

    function executeTask2Tests(task) {
      describe("Task2: Filtered products tests", () => {
        it("Filters the results", async () => {
          const searchPage = new SearchPage(driver);
          await searchPage.applyFilter("colors", "Black");
        });

        assertElementDisplayed(task, "displays filter button", MAIN_ELEMENTS.FILTER);
        assertElementDisplayed(task, "displays sort icon", MAIN_ELEMENTS.SORT);

        assertElementsAreDisplayed(task, "should return 2 products", MAIN_ELEMENTS.PRODUCT_ITEM, 2);

        assertElementsAreDisplayed(
          task,
          "should return 1 ribbon on all the products",
          MAIN_ELEMENTS.PRODUCT_RIBBON,
          1,
        );

        assertElementsAreDisplayed(
          task,
          "should return 2 product types on all the products",
          MAIN_ELEMENTS.PRODUCT_TYPE,
          2,
        );

        assertElementsAreDisplayed(
          task,
          "should return 2 product prices on all the products",
          MAIN_ELEMENTS.PRODUCT_NEW_PRICE,
          2,
        );

        assertElementsAreDisplayed(
          task,
          "should return 1 product old prices on all the products",
          MAIN_ELEMENTS.PRODUCT_OLD_PRICE,
          1,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display grid view button",
          MAIN_ELEMENTS.GRID_VIEW,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display list view button",
          MAIN_ELEMENTS.LIST_VIEW,
        );

        assertElementIsNotDisplayed(
          task,
          "shouldn't display wishlist button",
          MAIN_ELEMENTS.WISH_LIST,
        );
      });
    }

    function executesTask3Tests(task) {
      describe("Task3: Product details tests", () => {
        it("Selects the first product", async () => {
          const searchPage = new SearchPage(driver);
          await searchPage.selectProduct(1);
        });

        assertElementDisplayed(task, "displays logo", MAIN_ELEMENTS.LOGO);
        assertElementDisplayed(task, "displays profile dropdown", MAIN_ELEMENTS.PROFILE);
        assertElementDisplayed(task, "displays cart dropdown", MAIN_ELEMENTS.CART);
        assertElementDisplayed(task, "displays cart badge", MAIN_ELEMENTS.CART_BADGE);
        assertElementDisplayed(task, "display shoe name", PRODUCT_ELEMENTS.SHOE_NAME);
        assertElementDisplayed(task, "display shoe image", PRODUCT_ELEMENTS.SHOE_IMG);
        assertElementDisplayed(
          task,
          "display number of reviews",
          PRODUCT_ELEMENTS.NUMBER_OF_REVIEWS,
        );
        assertElementDisplayed(task, "display reviewer's name", PRODUCT_ELEMENTS.REVIEWER_NAME);
        assertElementDisplayed(
          task,
          "display reviewer's comment",
          PRODUCT_ELEMENTS.REVIEWER_COMMENT,
        );
        assertElementDisplayed(
          task,
          "display quinity input field",
          PRODUCT_ELEMENTS.QUANTITY_INPUT,
        );
        assertElementDisplayed(task, "display size select field", PRODUCT_ELEMENTS.SIZE_SELECT);
        assertElementDisplayed(task, "display add to cart button", PRODUCT_ELEMENTS.ADD_TO_CART);
        assertElementDisplayed(task, "display new price", PRODUCT_ELEMENTS.NEW_PRICE);
        assertElementDisplayed(task, "display old price", PRODUCT_ELEMENTS.OLD_PRICE);
        assertElementDisplayed(task, "display discount", PRODUCT_ELEMENTS.DISCOUNT);

        assertElementIsNotDisplayed(task, "shouldn't display search input", MAIN_ELEMENTS.SEARCH);
        assertElementIsNotDisplayed(
          task,
          "shouldn't display search icon",
          MAIN_ELEMENTS.SEARCH_ICON,
        );
        assertElementIsNotDisplayed(
          task,
          "shouldn't display header menu",
          MAIN_ELEMENTS.HEADER_MENU,
        );

        assertElementContainText(
          task,
          "Selected size should be Small (S)",
          PRODUCT_ELEMENTS.SELECTED_SIZE,
          "Small (S)",
        );

        assertElementHasStyle(
          task,
          "Displays reviewer name in black color",
          PRODUCT_ELEMENTS.REVIEWER_NAME,
          "color",
          "68, 68, 68",
        );
      });
    }
  });

  /**
   * Check if elements are displayed
   * Add the results to the report
   * @param {*} task
   * @param {*} desc
   * @param {*} selector
   * @param {*} expected
   */
  async function assertElementsAreDisplayed(task, desc, selector, expected) {
    it(desc, async () => {
      const actual = await commonActions.getDisplayedElements(selector);
      reporter.hackathonReporter(
        task,
        desc,
        selector[Object.keys(selector)[0]],
        expected === actual,
      );
      assert.equal(actual, expected);
    });
  }

  /**
   * Check if element contains {expectedText}
   * Add the results to the report
   * @param {*} task
   * @param {*} desc
   * @param {*} selector
   * @param {*} expectedText
   */
  async function assertElementContainText(task, desc, selector, expectedText) {
    it(desc, async () => {
      const actualText = await commonActions.getElementInnerText(selector);
      reporter.hackathonReporter(
        task,
        desc,
        selector[Object.keys(selector)[0]],
        expectedText === actualText,
      );
      assert.equal(actualText, expectedText);
    });
  }

  /**
   * Check if element has style with value
   * Add the results to the report
   * @param {*} task
   * @param {*} desc
   * @param {*} selector
   * @param {*} styleName
   * @param {*} expectedText
   */
  async function assertElementHasStyle(task, desc, selector, styleName, expectedText) {
    it(desc, async () => {
      const actual = await commonActions.getElementStyleProp(selector, styleName);
      const result = actual.includes(expectedText);
      reporter.hackathonReporter(task, desc, PRODUCT_ELEMENTS.REVIEWER_NAME.id, result);
      assert(result, `actual: ${actual}, expected: ${expectedText}`);
    });
  }

  /**
   * Check if element is displayed
   * Add the results to the report
   * @param {*} task
   * @param {*} desc
   * @param {*} selector
   */
  async function assertElementDisplayed(task, desc, selector) {
    it(desc, async () => {
      const isDisplayed = await commonActions.isElementDisplayed(selector);

      reporter.hackathonReporter(task, desc, selector[Object.keys(selector)[0]], isDisplayed);
      assert(isDisplayed);
    });
  }

  /**
   * Check if element is not displayed
   * Add the results to the report
   * @param {*} task
   * @param {*} desc
   * @param {*} selector
   */
  async function assertElementIsNotDisplayed(task, desc, selector) {
    it(desc, async () => {
      const isNotDisplayed = !(await commonActions.isElementDisplayed(selector));
      reporter.hackathonReporter(task, desc, selector[Object.keys(selector)[0]], isNotDisplayed);
      assert(isNotDisplayed);
    });
  }
});
