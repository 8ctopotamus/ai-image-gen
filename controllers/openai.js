const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { 
    prompt, 
    size = 'small' 
  } = req.body
  if (!prompt) {
    return res.status(400).json({ 
      success: false,
      error: 'Missing a prompt'
    })
  }
  const imageSize = size === 'small' 
    ? '256x256' 
    : size === 'medium'
      ? '512x512'
      : '1024x1024'
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
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