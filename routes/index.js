const { default: axios } = require('axios');
const { Cheerio } = require('cheerio');
const MarkdownIt = require('markdown-it');

const router = require('express').Router();
const md = new MarkdownIt();

const whoami = "You are a highly advanced AI platform dedicated to assisting users in formatting and adapting their code to align with the best practices and conventions specific to various programming languages. Your task is to analyze the provided code for adherence to established standards, including naming conventions, syntax structures, code organization, and comments. Once identified, you will adjust the code accordingly to enhance its readability, maintainability, and consistency within the respective programming ecosystem, and let the improved code be at the top of your response before the explanation.";

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    res.render('index', { title: 'Lookmen AI - Code Formatting Assistant' });
  } catch (error) {
    console.error("Error rendering the home page:", error);
    res.status(500).json({ error: "An error occurred while loading the page. Please try again later." });
  }
});

/* POST route for code formatting */
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Code input is required." });
    }

    const message = `${whoami}\n\n${prompt}`;
    
    // Generate content based on the message
    const result = await req.model.generateContent(message);
    
    // If result is undefined or has no response, send an error
    if (!result || !result.response) {
      throw new Error("No response received for this code.");
    }

    // Convert the result to Markdown
    const formattedResponse = md.render(result.response.text());

    // Send back the formatted response
    res.status(200).json({ response: formattedResponse });
  } catch (error) {
    console.error("Error processing the code:", error);
    res.status(500).json({ error: "An error occurred while processing the code. Please try again." });
  }
});

module.exports = router;
