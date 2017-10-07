# Cat Claws
A cat's tool to scrape any furnitures

![cat-claws-logo](https://user-images.githubusercontent.com/719938/31305473-1b4ba902-ab6d-11e7-9a78-318ceee2a1a0.png)

### Installation
```
npm install --save cat-claws
```

### Examples
```
const claws = require('cat-claws');

claws('https://www.nytimes.com/', {
  stories: ['.story.theme-summary',
    {
      storyHeading: '.story-heading a',
      url: function ($el) {
        return $el.find('[href]').attr('href');
      },
      summary: '.summary'
    }
  ]
}).then(json => {
  console.log(json);
  // {
  //   stories: [{
  //     storyHeading: 'The Breaking Cat News!',
  //     url: 'https://www.huffingtonpost.com/topic/funny-cats',
  //     summary: 'I smelled something funny when I was getting ready for work one day. I followed the smell to the kitchen, where I found that my cat had turned...'
  //   }, {
  //     ...
  //   }]
  // }
});

```
