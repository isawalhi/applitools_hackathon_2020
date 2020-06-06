## Applitools Hackathon 2020

Used Selenium JavaScript with Mocha.

## Prerequisites

- Node version 10 or above
- Npm version 6.14.x or above
- Applitools API Key to be set as environment variable using following commands:
  - Mac / linux / Windows OS ( with Git bash terminal) : `export APPLITOOLS_API_KEY='YOUR_API_KEY'`
  - Windows(Powershell/ command prompt): `set APPLITOOLS_API_KEY='YOUR_API_KEY'`
- [Chrome driver](https://chromedriver.storage.googleapis.com/index.html?path=83.0.4103.39/)
- [Firefox driver](https://github.com/mozilla/geckodriver/releases/tag/v0.26.0)
- [Edge driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
    - Include the drivers location in your PATH environment variable

### Tools
* [Selenium JavaScript](https://webdriver.io/)
* [chai](https://www.chaijs.com/)
* [Mocha](https://mochajs.org/)
* [Applitools](https://applitools.com/)

## Getting Started

1. Clone the repository - `git clone https://github.com/isawalhi/applitools_hackathon_2020.git`
2. Install the dependencies: `npm install`

### Run tests:

#### To run traditional tests against APP V1: `npm run test:TraditionalV1`

#### To run traditional tests against APP V2: `npm run test:TraditionalV2`

#### To run visual AI tests against APP V1: `npm run test:ModernV1`

#### To run visual AI tests against APP V2:`npm run test:ModernV2`

### Applitools Dashboard - click [Hackathon Dashboard](https://eyes.applitools.com/app/test-results/00000251810847363153/?accountId=85K1X826bUC0YWbMLeUHnw~~)
