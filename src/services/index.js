const URL = 'https://jsonplaceholder.typicode.com/users'

export default async function getAPI() {
  const request = await fetch(URL)
  const response = await request.json()
  return response
}
