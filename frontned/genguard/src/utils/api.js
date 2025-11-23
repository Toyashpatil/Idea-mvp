export async function getRecommendation(accountNumber) {
  const response = await fetch(`http://localhost:5050/recommendation/${accountNumber}`)
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`Recommendation API error ${response.status}: ${text}`)
  }
  const data = await response.json()
  return data
}

export default getRecommendation
