'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It's an object constructor which is why it is capitalized. It is used to create instances of an object. This in this context refers to the object that owns the method. 'rawDataObj' is a parameter for the object constructor.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.rawDataObj = rawDataObj;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning will create a deep copy of the element which duplicates all the descendent elements and text codes. It is a convenient way to duplicate elements.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.find('h1').text(this.rawDataObj.title);
  $newArticle.find('address a').attr('href', this.rawDataObj.authorUrl);
  $newArticle.find('a.text').text(this.rawDataObj.author);
  $newArticle.find('.article-body').html(this.rawDataObj.body);
  $newArticle.find('time').attr('datetime', this.rawDataObj.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  $newArticle.removeClass('template');
  return $newArticle;
};


rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

// for(let i = 0; i < rawData.length; i++) {
//   articles.push(new Article(rawData[i]));
// }

rawData.forEach((el) => {
  articles.push(new Article(el));
});

// for(let i = 0; i < articles.length; i++) {
//   $('#articles').append(articles[i].toHtml());
// }

articles.forEach((el) => {
  $('#articles').append(el.toHtml());
})
