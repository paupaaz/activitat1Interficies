export async function cercar(text) {
  const url = `https://www.omdbapi.com/?apikey=1d1198c0&s=${encodeURIComponent(text)}`

  const resposta = await fetch(url)
  const dades = await resposta.json()

  return dades.Response === 'True' ? (dades.Search || []) : []
}

export async function obtenir(id) {
  const url = `https://www.omdbapi.com/?apikey=1d1198c0&i=${id}`

  const resposta = await fetch(url)
  const dades = await resposta.json()

  return dades.Response === 'True' ? dades : null
}
