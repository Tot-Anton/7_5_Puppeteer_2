const { clickElement, getText } = require("./commands.js");

module.exports = {
  booking: async function (page, day, time, button, row, ...chair) {
    await clickElement(page, day);
    await clickElement(page, time);
    for (let i = 0; i < chair.length; i++) {
      await clickElement(
        page,
        `div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${chair[i]})`
      );
    }
    await clickElement(page, button);
    await clickElement(page, button);
  },

  success: async function (page, text) {
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(text);
  },
};
