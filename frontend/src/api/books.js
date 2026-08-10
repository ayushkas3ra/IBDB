import api from './axios'

export async function getPopularBooks() {
  const response = await api.get('/books/')
  return response.data
}

export async function searchBooks(query) {
  const response = await api.get(`/books/search/?query=${query}`)
  return response.data
}

export async function getBook(isbn13) {
  const response = await api.get(`/books/${isbn13}/`)
  return response.data
}

export async function getSimilarBooks(isbn13) {
  const response = await api.get(`/books/${isbn13}/similar/`)
  return response.data
}

export async function askBook(isbn13, question) {
  const response = await api.post(`/books/${isbn13}/ask/`, {
    question,
  })
  return response.data
}
