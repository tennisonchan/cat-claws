const tester = require('tester');
const Lien = require('lien');
const claws = require('../lib/index');

const PORT = 9000;
const HOST = 'http://localhost';
const URL = `${HOST}:${PORT}`;

tester.describe('claws', function (test) {

  test.it('start server', fn => {
    new Lien({
      port: PORT,
      public: `${__dirname}/fixtures`
    }).on('load', fn);
  });

  test.it('scrape page', function (fn) {
    claws(URL, {
      title: '.test1 .title',
    }).then(function (json) {
      test.expect(json).toEqual({
        title: 'Title'
      });

      fn();
    });
  });

  test.it('scrape lists', function (fn) {
    claws(URL, {
      items: ['.test3 .target-list .item', {
        url: function ($el) {
          return $el.find('a').attr('href');
        },
        title: 'a'
      }]
    }).then(function (json) {
      test.expect(json).toEqual({
        items: [
          { url: 'link1', title: 'Item 1' },
          { url: 'link2', title: 'Item 2' },
          { url: 'link3', title: 'Item 3' }
        ]
      });

      fn();
    });
  });

  test.it('use function', function (fn) {
    claws(URL, {
      numberOfItems: function ($parent) {
        return $parent.find('.test2 li').length;
      }
    }).then(function (json) {
      test.expect(json).toEqual({
        numberOfItems: 6
      });

      fn();
    });
  });

  test.it('use objects', function (fn) {
    claws(URL, {
      profile: {
        name: '.name',
        contacts: {
          email: '.email',
          mobile: '.mobile'
        }
      }
    }).then((page) => {
      test.expect(page).toEqual({
        profile: {
          name: 'Foo',
          contacts: {
            email: 'Bar',
            mobile: 'Baz'
          }
        }
      });

      fn();
    });
  });

  test.it('end', function () {
    process.exit();
  });
});