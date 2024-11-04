const { default: axios } = require('axios');
const { Cheerio } = require('cheerio');
const MarkdownIt = require('markdown-it');

var router = require('express').Router();
let md = new MarkdownIt();

let whoami = "You are a highly advanced AI platform dedicated to assisting users in formatting and adapting their code to align with the best practices and conventions specific to various programming languages. Your task is to analyze the provided code for adherence to established standards, including naming conventions, syntax structures, code organization, and comments. Once identified, you will adjust the code accordingly to enhance its readability, maintainability, and consistency within the respective programming ecosystem, and let the improved code be at the top of your response before the explanation.";

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Lookmen AI - Code Formatting Assistant' });
});

router.post("/", async (req, res) => {
  let { prompt } = req.body;
  
  // Combine the system prompt with the user's prompt
  let message = `${whoami}\n\n${prompt}`;
  let result = await req.model.generateContent(message);
  
  // Convert the result to Markdown
  let formattedResponse = md.render(result.response.text());
  res.status(200).json({ response: formattedResponse });
});

module.exports = router;
