import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import customers from '../data/customers'
import cardFeatures from '../data/cardFeatures'

export default function Insights() {
  const [account, setAccount] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRecommend = async () => {
    setLoading(true)
    setResult(null)

    // Simulate fetch: search in local customers dataset by Account Number
    const acctNum = Number(account)
    const record = customers.find(c => c['Account Number'] === acctNum)

    await new Promise(r => setTimeout(r, 400)) // small UX delay

    if (!record) {
      setResult({ error: 'No customer found for this account number.' })
      setLoading(false)
      return
    }

    const cards = record['Recommended_Cards'] || []

    // Build card details using static cardFeatures map
    const cardsWithFeatures = cards.map(name => ({
      name,
      features: cardFeatures[name] || [
        'Feature 1 (not available)',
        'Feature 2 (not available)',
        'Feature 3 (not available)'
      ]
    }))

    setResult({ record, cards: cardsWithFeatures })
    setLoading(false)
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
