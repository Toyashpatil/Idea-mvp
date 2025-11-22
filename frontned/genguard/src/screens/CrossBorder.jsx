import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Côte d'Ivoire","Cabo Verde",
  "Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
  "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
  "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Republic of the Congo","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
  "Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
]

export default function CrossBorder() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null)

  const validateCountry = (c) => COUNTRIES.includes(c)

  const handleCheck = () => {
    setError('')
    if (!validateCountry(from)) {
      setError('From country is invalid. Please pick from the list.')
      return
    }
    if (!validateCountry(to)) {
      setError('To country is invalid. Please pick from the list.')
      return
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Enter a valid amount greater than 0.')
      return
    }

    // generate random risk score 0-100
    const score = Math.floor(Math.random() * 101)
    let level = 'Low'
    let color = 'green'
    let msg = 'Low risk — transactions appear normal.'
    if (score >= 34 && score <= 66) {
      level = 'Medium'
      color = 'yellow'
      msg = 'Medium risk — exercise caution and review additional controls.'
    } else if (score >= 67) {
      level = 'High'
      color = 'red'
      msg = 'High risk — review immediately and apply stronger controls.'
    }

    setModal({ score, level, color, msg })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Cross-Border Check</h1>

        <div className="max-w-2xl bg-white p-6 rounded-xl shadow space-y-4">
          <div>
            <label className="text-sm font-medium">From Country</label>
            <input list="countries" value={from} onChange={e=>setFrom(e.target.value)} className="w-full mt-2 p-2 border rounded" placeholder="Type or choose a country" />
          </div>

          <div>
            <label className="text-sm font-medium">To Country</label>
            <input list="countries" value={to} onChange={e=>setTo(e.target.value)} className="w-full mt-2 p-2 border rounded" placeholder="Type or choose a country" />
          </div>

          <div>
            <label className="text-sm font-medium">Amount</label>
            <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" className="w-full mt-2 p-2 border rounded" placeholder="Amount in USD" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleCheck} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Check</button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>

          <datalist id="countries">
            {COUNTRIES.map((c, i) => <option key={i} value={c} />)}
          </datalist>
        </div>

        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={()=>setModal(null)} />

            <div className="relative max-w-md w-full">
              <div className={`rounded-lg p-6 shadow-lg border-t-4 ${modal.color === 'green' ? 'border-green-500' : modal.color === 'yellow' ? 'border-yellow-400' : 'border-red-500'} bg-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Risk Score: {modal.score}</h2>
                    <p className="text-sm text-gray-600">Level: <span className={`${modal.color === 'green' ? 'text-green-600' : modal.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>{modal.level}</span></p>
                  </div>
                  <button onClick={()=>setModal(null)} className="text-gray-500">✕</button>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">{modal.msg}</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>From:</strong> {from}</p>
                    <p><strong>To:</strong> {to}</p>
                    <p><strong>Amount:</strong> {amount}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button onClick={()=>setModal(null)} className="px-4 py-2 bg-gray-100 rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
