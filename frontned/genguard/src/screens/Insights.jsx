import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import customers from '../data/customers'
import cardFeatures from '../data/cardFeatures'
import getRecommendation from '../utils/api'

export default function Insights() {
  const [account, setAccount] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRecommend = async () => {
    setLoading(true)
    setResult(null)
    const acctNum = Number(account)
    try {
      const data = await getRecommendation(acctNum)
      console.log(data)

      // If API returns an error shape, surface it
      if (!data) {
        setResult({ error: 'Empty response from recommendation API.' })
      } else if (data.error) {
        setResult({ error: data.error })
      } else {
        // Try to normalize to the same structure this component expects
        // If API already returns { record, cards } or { record, recommendedCards }, use it directly
        const cardsFromApi = data.cards || data.recommendedCards || data.Recommended_Cards || []
        const record = data.record || data.customer || null

        const cardsWithFeatures = cardsFromApi.map(name => ({
          name,
          features: cardFeatures[name] || [
            'Feature 1 (not available)',
            'Feature 2 (not available)',
            'Feature 3 (not available)'
          ]
        }))

        setResult({ record, cards: cardsWithFeatures })
      }
    } catch (err) {
      console.error(err)
      setResult({ error: err.message || 'Failed to fetch recommendations.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">AI Insights — Recommended Cards</h1>

        <div className="max-w-2xl mb-6">
          <label className="text-sm font-medium">Customer Account Number</label>
          <div className="flex gap-3 mt-2">
            <input
              value={account}
              onChange={e => setAccount(e.target.value)}
              placeholder="Enter account number (digits only)"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleRecommend}
              disabled={loading || !account}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Recommend'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Type an account number from the dataset and click Recommend.</p>
        </div>

        <section>
          {!result && (
            <p className="text-gray-600">No recommendation yet. Try an account like <strong>801266852126</strong>.</p>
          )}

          {result && result.error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{result.error}</div>
          )}

          {result && result.cards && result.cards.length === 0 && (
            <div className="p-4 bg-yellow-50 border rounded-lg text-yellow-700">No recommended cards for this customer.</div>
          )}

          {result && result.cards && result.cards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.cards.map((c, i) => (
                <div key={i} className="p-4 bg-white rounded-xl shadow">
                  <h3 className="font-semibold mb-2">{c.name}</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {c.features.map((f, idx) => (
                      <li key={idx}>• {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
