const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body
  try {
    const response = await openai.createImage({
      prompt: 'octopus hippotamus',
      n: 1,
      size: '512x512'
    })
    const imageUrl = response.data.data[0].url
    res.status(200).json({ 
      success: true, 
      data: imageUrl
    })
  } catch(err) {
    if (err.response) {
      console.log(err.response.status)
      console.log(err.response.data)
    } else {
      console.log(err.message)
    }
    res.status(500).json({ 
      success: false, 
      error: 'The image could not be generated'
    })
  }
  res.end()
}

module.exports = { generateImage }