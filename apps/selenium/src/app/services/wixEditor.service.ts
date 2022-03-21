import webdriver, { By, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import chromedriver from 'chromedriver';
import { cookies } from '../constants/cookies';
import { sleep } from './timer-helpers.service';
import wixComponent from '../interfaces/data-contracts/wixComponent';

class WixEditorService {
  constructor() {
    chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

    this.driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();
  }

  driver: WebDriver

  openWixEditor = async (url: string) => {
    let isOpenWixEditor = false

    try {
      await this.driver.get('https://www.wix.com/');
      cookies.forEach(async (cookie) => {
        if ('.wix.com' === cookie.domain) await this.driver.manage().addCookie(cookie);
      })
      await this.driver.navigate().refresh();
      await this.driver.get(url);
      await sleep(10000)
      isOpenWixEditor = true

    }
    catch (err) {
      isOpenWixEditor = false
    }

    return { success: isOpenWixEditor };
  };

  addComponent = async (wixComponent: wixComponent) => {
    let isAddComponentSuccess = false
    try {

      const iframe = await this.driver.findElement(By.css('iframe#preview'));
      await this.driver.switchTo().frame(iframe)
      await this.driver.executeScript(() => {
        documentServices.components.add(
          { id: "tuckg", type: 'DESKTOP' },
          wixComponent
        )
      })
      isAddComponentSuccess = true
    }
    catch (err) {
      isAddComponentSuccess = false
    }

    return { success: isAddComponentSuccess };
  };
}

const wixEditorService = new WixEditorService();
export { wixEditorService };
