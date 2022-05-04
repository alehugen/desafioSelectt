const URL = 'https://jsonplaceholder.typicode.com/users'

export async function getData() {
  const request = await fetch(URL)
  const response = await request.json()
  return response
}
