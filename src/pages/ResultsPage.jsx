"use client"

import { useState, useEffect } from "react"

const ResultsPage = () => {
  const [elections, setElections] = useState([])
  const [selectedElection, setSelectedElection] = useState(null)
  const [winner, setWinner] = useState("")

  useEffect(() => {
    const savedElections = JSON.parse(localStorage.getItem("elections")) || []
    setElections(savedElections)
  }, [])

  // Determine the winner
  useEffect(() => {
    if (selectedElection && selectedElection.totalVotes > 0) {
      const maxVotes = Math.max(...selectedElection.candidates.map(c => c.votes))
      const winningCandidates = selectedElection.candidates.filter(c => c.votes === maxVotes)

      if (winningCandidates.length === 1) {
        setWinner(`🥇 ${winningCandidates[0].name} won this election!`)
      } else {
        setWinner("🤝 It's a tie between: " + winningCandidates.map(c => c.name).join(", "))
      }
    } else {
      setWinner("🛑 No votes were cast in this election.")
    }
  }, [selectedElection])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F3460] to-[#16213E] px-6">
      <div className="w-full max-w-3xl bg-gray-900 text-white p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-400">📊 Election Results</h2>

        {/* Select Election */}
        <h3 className="text-xl font-semibold">Select an Election:</h3>
        <select
          className="w-full px-3 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
          onChange={(e) => {
            const selected = elections.find(election => election.id === parseInt(e.target.value))
            setSelectedElection(selected)
          }}
        >
          <option value="">-- Choose Election --</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>
              {election.name} (Ended: {election.endTime < Date.now() ? "✅" : "⏳ Ongoing"})
            </option>
          ))}
        </select>

        {/* Show Results */}
        {selectedElection && (
          <>
            <h3 className="text-xl font-semibold mt-4">{selectedElection.name} Results</h3>
            <ul className="mt-3 space-y-2">
              {selectedElection.candidates.map((candidate, index) => (
                <li key={index} className={`text-lg mt-2 ${candidate.votes === Math.max(...selectedElection.candidates.map(c => c.votes)) ? "text-yellow-400 font-bold" : ""}`}>
                  {candidate.votes === Math.max(...selectedElection.candidates.map(c => c.votes)) ? "🥇" : "🗳"} {candidate.name} - <span className="font-bold">{candidate.votes}</span> votes
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-300 font-semibold">Total Votes: {selectedElection.totalVotes}</p>

            {/* Winner Announcement */}
            <p className="mt-6 text-2xl font-bold text-green-400">{winner}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ResultsPage
