"use strict";

const { Builder, By } = require("selenium-webdriver");
const { startUrl } = require("../../config");
const {
  Eyes,
  VisualGridRunner,
  Target,
  RectangleSize,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation,
} = require("@applitools/eyes-selenium");
const { SearchPage, MAIN_ELEMENTS } = require("../pages/Search.page");

describe("Applitools Hackathon", function () {
  let runner, eyes, driver;

  before(async () => {
    // Create a new chrome web driver
    driver = await new Builder().forBrowser("chrome").build();

    // Create a runner with concurrency of 10
    runner = new VisualGridRunner(10);

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
    eyes = new Eyes(runner);

    // Initialize the eyes configuration.
    let conf = new Configuration();

    // create a new batch info instance and set it to the configuration
    conf.setBatch(new BatchInfo("UFG Hackathon"));

    // Add browsers with different viewports
    conf.addBrowser(1200, 700, BrowserType.CHROME);
    conf.addBrowser(1200, 700, BrowserType.FIREFOX);
    conf.addBrowser(1200, 700, BrowserType.EDGE_CHROMIUM);
    conf.addBrowser(768, 700, BrowserType.CHROME);
    conf.addBrowser(768, 700, BrowserType.FIREFOX);
    conf.addBrowser(768, 700, BrowserType.EDGE_CHROMIUM);

    // Add mobile emulation devices in Portrait mode
    conf.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);

    // set the configuration to eyes
    eyes.setConfiguration(conf);
  });

  describe("Search page", async () => {
    it("renders search page correctly", async () => {
      // Call Open on eyes to initialize a test session
      await eyes.open(driver, "AppliFashion", "Task 1", new RectangleSize(800, 600));

      await driver.get(startUrl);

      await eyes.check("Cross-Device Elements Test", Target.window().fully(true));

      await eyes.closeAsync();
    });
  });

  describe("Filtered products tests", async () => {
    it("filters work as expected", async () => {
      // Call Open on eyes to initialize a test session
      await eyes.open(driver, "AppliFashion", "Task 2", new RectangleSize(800, 600));

      await driver.get(startUrl);

      const searchPage = new SearchPage(driver);

      await searchPage.openFilterPanel();

      // Collapse third filter
      await searchPage.collapseFilterType(3);

      await eyes.checkRegion(By.id(MAIN_ELEMENTS.FILTER_SIDE_ID), "Filters Sidebar");

      // UnCollapse third filter
      await searchPage.openFilterType(3);

      await searchPage.selectFilter("colors", "Black");

      await eyes.check("Filter Results - Open Filter", Target.window().fully(true));

      await searchPage.submitFilter();

      await eyes.checkRegion(By.id(MAIN_ELEMENTS.PRODUCT_GRID_ID), "Filter Results");

      const productNumber = 1;
      await searchPage.hoverOnProduct(productNumber);

      await eyes.checkRegion(
        By.css(`#${MAIN_ELEMENTS.PRODUCT_GRID_ID} > div:nth-child(${productNumber})`),
        "Product Item",
      );

      await eyes.closeAsync();
    });
  });

  describe("Product details tests", async () => {
    it("renders product details correctly", async () => {
      // Call Open on eyes to initialize a test session
      await eyes.open(driver, "AppliFashion", "Task 3", new RectangleSize(800, 600));

      await driver.get(startUrl);

      const searchPage = new SearchPage(driver);

      await searchPage.applyFilter("colors", "Black");

      await searchPage.selectProduct(1);

      await eyes.check("Product Details test", Target.window().fully(true));

      await eyes.closeAsync();
    });
  });

  after(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();

    // we pass false to this method to suppress the exception that is thrown if we
    // find visual differences
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
});
