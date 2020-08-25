# Web Summarizer
<h1 align="center">
	<img width="70px" src="https://lh3.googleusercontent.com/TOC1ejGsTCnTZdy-oKAfHSm0lAsgvtH6Y0FYrLqjjp0OXgtOatVTdA9YecUApCPEyAiedtwe=w128-h128-e365-rj-sc0x00ffffff" alt="Web summarize chrome extension logo" />
</h1>

## Description
Web Summarizer is an extension to Google Chrome browser that provides a summary version of the content of web pages.

<h3>
  <a href="https://chrome.google.com/webstore/detail/web-summarizer/bjkoieegiicnkncndemgfnnflgdbheaj" rel="nofollow">Click here to install for free</a>
</h3>

## Technologies
The project was developed using: 
- Javascript (ES6);
- Webpack (bundler);
- Babel (transpiler)
- Jest (testing framework);
- ESLint (code pattern)

## Summarization Method
The main algorithm used to generate the summaries is called Bushy Path, presented by Salton *et al* (Automatic text structuring and summarization. Information Processing & Management, 1997). Statistical data is used to determine the most relevant paragraphs in the text, in addition to HTML tags that help identify the main subject of the page.
The algorithm works with better precision for some languages:
- English
- French
- German
- Italian
- Portuguese
- Spanish

Stopwords removal and Stemmer procedures were applied for these languages. However, it can be used for any language.

## External resources
- Snowball Stemmer javascript library (https://github.com/fortnightlabs/snowball-js)
- Stopword lists (https://www.ranks.nl, https://gist.github.com)

## Contributors
ALCANCE Lab - DCC - UFLA

## License
MIT License


