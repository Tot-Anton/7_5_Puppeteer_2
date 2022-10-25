const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName, booking, success } = require("./lib/util.js");

let page;
let day = ".page-nav > a:nth-child(6)";
let time = "a.movie-seances__time";
let button = "button.acceptin-button";

afterEach(() => {
  page.close();
});

describe("Homework", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await page.setDefaultNavigationTimeout(0);
  });

  test("buy 1 ticket", async () => {
    await booking(page, day, time, button, 2, 5);
    await success(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("buy 2 ticket", async () => {
    await booking(page, day, time, button, 5, 1, 2);
    await success(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Repeat order", async () => {
    await booking(page, day, time, button, 8, 1);
    await success(
      page,
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await booking(page, day, time, button, 8, 1);
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
