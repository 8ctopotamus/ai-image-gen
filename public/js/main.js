const form = document.querySelector('form')
const promptInput = document.querySelector('#prompt')
const sizeInput = document.querySelector('#size')
const spinner = document.querySelector('.spinner')
const messageEl = document.querySelector('.msg')
const imageEl = document.querySelector('#image')

console.log(form, promptInput, sizeInput, spinner, messageEl)

const setSpinner = bool => bool 
  ? spinner.classList.add('show')
  : spinner.classList.remove('show')

const generateImageRequest = async (prompt, size) => {
  setSpinner(true)
  try {
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        size,
      })
    })
    if (!response.ok) {
      setSpinner(false)
      throw new Error('That image could not be generated')
    }
    const json = await response.json()
    const imageUrl = json.data
    imageEl.src = imageUrl
  } catch(err) {
    messageEl.textContent = err
  } finally {
    setSpinner(false)
  }
}

const onSubmit = e => {
  e.preventDefault()
  // reset ui
  messageEl.textContent = ''
  imageEl.src = ''
  // make request
  const prompt = promptInput.value
  const size = sizeInput.value
  if (!prompt) {
    alert('Please add some text')
    return
  }
  generateImageRequest(prompt, size)
}

form.addEventListener('submit', onSubmit)