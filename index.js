const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-cntGIqhOmOiqqivaT5HwpiIC",
    apiKey: "APIKEY",
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
    const { message } = req.body;
    console.log(message, "message");
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 20,
        temperature: 0.5,
      });
      res.json({
        message: response.data.choices[0].text,
      })
});


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

