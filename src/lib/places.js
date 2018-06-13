const { fetch } = window

export const getPlaces = async query => {
  const json = await fetch(`http://localhost:3000/cities/${query}`)
  const result = await json.json()
  console.log(result)
}
