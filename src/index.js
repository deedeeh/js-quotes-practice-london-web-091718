// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', event => {
  console.log('DOM fully loaded')

  const quotesList = document.querySelector('#quote-list')
  const quoteForm = document.querySelector('#new-quote-form')
  const quoteInput = document.querySelector('#new-quote')
  const authorInput = document.querySelector('#author')

  const state = {
    quotes: [],
    selectedQuote: undefined
  }


  const renderQuote = quote => {
    const listItem = document.createElement('li')
    listItem.classList.add('quote-card')
    listItem.dataset.quoteId = quote.id
    listItem.innerHTML =
    `<blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>`
    quotesList.appendChild(listItem)

    listItem.querySelector('.btn-danger').addEventListener('click', () => {
      const listItem = document.querySelector(`li[data-quote-id= "${quote.id}"]`)
      listItem.remove()
      deleteQuote(quote)
    })

    listItem.querySelector('.btn-success').addEventListener('click', () => {
      const listItem = document.querySelector(`li[data-quote-id= "${quote.id}"]`)
      const likesSpan = listItem.querySelector('span')
      likesSpan.innerHTML = ''
      likesSpan.innerHTML = `${quote.likes += 1}`
      updateLikes(quote)

    })
  }

  const renderQuotes = quotes => {
    quotes.forEach(quote => renderQuote(quote))
  }

  getQuotes()
    .then(quotes => {
      state.quotes = [...quotes]
      renderQuotes(state.quotes)
    })

  quoteForm.addEventListener('submit', event => {
    event.preventDefault();

    const quoteFormContent = {
      quote: quoteInput.value,
      likes: 0,
      author: authorInput.value
    }

    createQuote(quoteFormContent)
      .then(getQuotes)
      .then(quotes => {
        state.quotes = [...quotes]
        quotesList.innerHTML = ''
        renderQuotes(state.quotes)
        quoteForm.reset()
      })

  })

})
