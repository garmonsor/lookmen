var router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");



/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Lookmen AI - Proof Check Contet Online' });
});

router.post("/", async (req,res)=> {
  let {prompt} = req.body
  let result = await req.model.generateContent(prompt)
  res.status(200).json({response: result.response.text()})
})


module.exports = router;
