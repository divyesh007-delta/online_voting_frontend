"use client"

import { useState, useEffect } from "react"

const VotingPage = () => {
  const [elections, setElections] = useState([])
  const [selectedElection, setSelectedElection] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState("")
  const [isVoted, setIsVoted] = useState(false)

  useEffect(() => {
    const savedElections = JSON.parse(localStorage.getItem("elections")) || []
    const activeElections = savedElections.filter(election => election.endTime > Date.now())
    setElections(activeElections)
  }, [])

  const handleVote = () => {
    if (!selectedElection) return alert("⚠️ Please select an election.")
    if (!selectedCandidate) return alert("⚠️ Please select a candidate before voting.")

    const updatedElections = elections.map(election => {
      if (election.id === selectedElection.id) {
        const updatedCandidates = election.candidates.map(candidate => 
          candidate.name === selectedCandidate ? { ...candidate, votes: candidate.votes + 1 } : candidate
        )
        return { ...election, candidates: updatedCandidates, totalVotes: election.totalVotes + 1 }
      }
      return election
    })

    setElections(updatedElections)
    localStorage.setItem("elections", JSON.stringify(updatedElections))
    setIsVoted(true)
    alert(`✅ You have successfully voted for ${selectedCandidate}!`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F3460] to-[#16213E] px-6">
      <div className="w-full max-w-3xl bg-gray-900 text-white p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-400">🗳️ Cast Your Vote</h2>

        {isVoted ? (
          <p className="text-center text-green-400 font-semibold text-lg">✅ Your vote has been recorded!</p>
        ) : (
          <>
            {/* Select Election */}
            <h3 className="text-xl font-semibold">Select an Election:</h3>
            <select
              className="w-full px-3 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
              onChange={(e) => {
                const selected = elections.find(election => election.id === parseInt(e.target.value))
                setSelectedElection(selected)
                setSelectedCandidate("")
              }}
            >
              <option value="">-- Choose Election --</option>
              {elections.map((election) => (
                <option key={election.id} value={election.id}>
                  {election.name} (⏳ {Math.floor((election.endTime - Date.now()) / 60000)} min left)
                </option>
              ))}
            </select>

            {/* Candidate List */}
            {selectedElection && (
              <>
                <h3 className="text-xl font-semibold mt-4">Select a Candidate:</h3>
                {selectedElection.candidates.map((candidate, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer mt-2 transition-all transform hover:scale-105 ${
                      selectedCandidate === candidate.name ? "border-blue-500 bg-blue-100" : "border-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCandidate(candidate.name)}
                  >
                    <input type="radio" name="candidate" className="hidden" />
                    <span className="text-lg font-medium cursor-pointer select-none">{candidate.name}</span>
                  </div>
                ))}
                <button
                  onClick={handleVote}
                  className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:bg-blue-600 shadow-md"
                >
                  ✅ Submit Vote
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default VotingPage
