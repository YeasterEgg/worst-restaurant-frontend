const { fetch } = window
const URL = 'https://worst-restaurant.herokuapp.com'
// const URL = 'http://localhost:3000'

export const getPlaces = async ({ lat, lng }, stream) => {
  const readable = await fetch(`${URL}/places?lat=${lat}&lng=${lng}`)
  readable.body.pipeTo(stream)
}

export const getCoords = async location => {
  const json = await fetch(`${URL}/coords/${location}`)
  const result = await json.json()
  return result
}
