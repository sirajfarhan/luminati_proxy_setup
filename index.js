const { Builder, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const delay = require('delay');
const request = require('request-promise');

const { IDENTIFIER, PASSWORD, URL } = process.env;

const options = new Options()
    .headless()
    .windowSize({
        width: 1024,
        height: 768
    });

async function main() {
    let driver = null;

    while (true) {
        try {
            const { value: { ready } } = await request({
                uri: 'http://selenium:4444/wd/hub/status',
                json: true,
            });
            if(ready) break;
        } catch (e) {

        }
        await delay(5000);
    }


    console.log('CONNECTING SELENIUM SERVER');

    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer('http://selenium:4444/wd/hub')
        .setChromeOptions(options)
        .build();

    console.log('CONNECTED');

    await driver.get(URL);

    const googleButton = await driver.findElement(By.className('btn_google'));

    await googleButton.click();
    await delay(5000);

    const username = await driver.findElement(By.name('identifier'));
    const usernameNext = await driver.findElement(By.id('identifierNext'));
    await username.sendKeys(IDENTIFIER);
    await usernameNext.click();
    await delay(2000);

    const password = await driver.findElement(By.name('password'));
    const passwordNext = await driver.findElement(By.id('passwordNext'));
    await password.sendKeys(PASSWORD);
    await passwordNext.click();
    await delay(5000);

    const loginConfirmation = await driver.findElement(By.css('[type="button"]'));
    await loginConfirmation.click();
    await delay(10000);

    const startButton = await getElementWithText(driver, 'button', 'start');
    await startButton.click();

    await delay(1000);

    const saveButton = await getElementWithText(driver, 'button', 'save');
    await saveButton.click();

    await delay(1000);

    const okButton = await getElementWithText(driver, '.footer > button', 'ok');
    await okButton.click();

    await driver.quit();
}

async function getElementWithText(driver, element, text) {
    return driver.executeScript(`
        return Array.prototype.slice.call(document.querySelectorAll('${element}'))
            .filter(function (el) {
                return el.textContent ? el.textContent.toLowerCase().includes('${text}') : false
        })[0];
    `);
}

main();
