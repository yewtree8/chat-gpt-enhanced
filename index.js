const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-cntGIqhOmOiqqivaT5HwpiIC",
    //add api key here.
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
    const { message, currentModel } = req.body;
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 50,
        temperature: 0.5,
      });
      res.json({
        message: response.data.choices[0].text,
      })
});

app.get("/models", async (req, res) => {
    const response = await openai.listEngines();
    res.json({
      models: response.data
    })
})


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

