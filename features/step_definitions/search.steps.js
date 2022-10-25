const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText } = require("../../lib/commands.js");
const { booking } = require("../../lib/util.js");

const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(60 * 1000);

let day = ".page-nav > a:nth-child(2)";
let time = "a.movie-seances__time";
let button = "button.acceptin-button";

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("Пользователь находится на странице {string}", async function (string) {
  return await this.page.goto(`${string}`);
});

When(
  "Пользователь бронирует билет в зале на {int} ряду место {int}",
  async function (int, int2) {
    await booking(this.page, day, time, button, `${int}`, `${int2}`);
  }
);

When(
  "Пользователь бронирует билеты в зале на {int} ряду места {int} и {int}",
  async function (int, int2, int3) {
    await booking(this.page, day, time, button, `${int}`, `${int2}`, `${int3}`);
  }
);

When(
  "Пользователь бронирует билет в зале на {int} ряду место {int}, и затем бронирует его повторно.",
  async function (int, int2) {
    await booking(this.page, day, time, button, `${int}`, `${int2}`);
    await this.page.goto("http://qamid.tmweb.ru/client/index.php");
    await booking(this.page, day, time, button, `${int}`, `${int2}`);
  }
);

Then("Пользователь получил qr", async function () {
  const actual = await getText(this.page, "p.ticket__hint");
  expect(actual).contain(
    "Покажите QR-код нашему контроллеру для подтверждения бронирования."
  );
});

Then(
  "Пользователь не может забронировать уже забронированное место",
  async function () {
    expect(
      String(
        await this.page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).contain("true");
  }
);
