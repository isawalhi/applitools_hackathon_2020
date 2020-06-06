const fs = require("fs");

class Reporter {
    constructor(fileName, browser, viewport, device) {
      this.fileName = fileName;
      this.viewport = viewport;
      this.browser = browser;
      this.device = device;
    }

/**
 * A Helper to print the test result in the following format:
 * Task: <Task Number>, Test Name: <Test Name>, DOM Id:: <id>, Browser: <Browser>, Viewport: <Width x Height>, Device<Device type>, Status: <Pass | Fail>
 *
 * Example: Task: 1, Test Name: Search field is displayed, DOM Id: DIV__customsear__41, Browser: Chrome, Viewport: 1200 x 700, Device: Laptop, Status: Pass
 *
 * @param task                    int - 1, 2 or 3
 * @param testName.               string - Something meaningful. E.g. 1.1 Search field is displayed
 * @param domId                   string - DOM ID of the element
 * @param comparisonResult        boolean - The result of comparing the "Expected" value and the "Actual" value.
 * @return                        boolean - returns the same comparison result back so that it can be used for further Assertions in the test code.
 */

 hackathonReporter(task, testName, domId, comparisonResult) {
    fs.appendFileSync(
      this.fileName,
      `"Task: ${task}, Test Name: ${testName}, DOM Id: ${domId}, Browser: ${this.browser}, Viewport: ${this.viewport}, Device: ${this.device}, Status: ${
        comparisonResult ? "Pass" : "Fail"
      }\n`,
    );
    return comparisonResult;
  }

}

module.exports = Reporter