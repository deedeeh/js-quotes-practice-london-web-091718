const quotesURL = 'http://localhost:3000/quotes'

const getQuotes = () =>
  fetch(quotesURL)
    .then(resp => resp.json())

const createQuote = quote =>
  fetch(quotesURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(quote)
  }).then(resp => resp.json())

const updateLikes = quote =>
  fetch(`${quotesURL}/${quote.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: quote.likes})
  }).then(resp => resp.json())

const deleteQuote = quote =>
  fetch(`${quotesURL}/${quote.id}`, {
    method: 'DELETE'
  })
