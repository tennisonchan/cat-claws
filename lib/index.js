"use strict";

const cheerio = require('cheerio');
const rp = require('request-promise');

function claws (url, options) {
  return rp({
    uri: url,
    transform2xxOnly: true,
    transform: function (html) {
      let $ = cheerio.load(html);

      return scrape($(html), options);
    }
  });
}

function scrape ($parent, selectors) {
  if (typeof selectors === 'string' || selectors instanceof String) {
    return $parent.find(selectors).text().trim();
  } else if (selectors instanceof Array) {
    let itemSelector = selectors[0];
    let itemAttr = selectors[1];
    let arr = [];

    $parent.find(itemSelector).each(function (index, el) {
      arr.push(scrape($parent.find(el), itemAttr));
    });

    return arr;
  } else if (selectors instanceof Function) {
    return selectors($parent);
  } else if (selectors instanceof Object) {
    let object = {};
    for(let attr in selectors) {
      let selector = selectors[attr];
      object[attr] = scrape($parent, selector);
    }

    return object;
  }
}

claws.scrape = function (html, options) {
  let $ = cheerio.load(html);

  return scrape($(html), options);
};

exports = module.exports = claws;