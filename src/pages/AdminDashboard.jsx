"use client"

import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";


export default function AdminDashboard() {
  const [elections, setElections] = useState([])
  const [newElectionName, setNewElectionName] = useState("")  
  const [duration, setDuration] = useState("60")
  const [newCandidates, setNewCandidates] = useState(["", ""])

  const createElection = () => {
    if (
      !newElectionName.trim() ||
      !duration ||
      isNaN(parseInt(duration)) || parseInt(duration) <= 0 ||
      newCandidates.some((c) => !c.trim())
    ) {
      return alert("⚠️ Election name, duration (in minutes), and all candidate names must be filled!")
    }

    const newElection = {
      id: elections.length + 1,
      name: newElectionName.trim(),
      duration: parseInt(duration),
      candidates: newCandidates
        .filter(name => name.trim())
        .map((name) => ({ name: name.trim(), votes: 0 })),
      status: "Upcoming",
    }

    setElections([...elections, newElection])
    setNewElectionName("")
    setDuration("60")
    setNewCandidates(["", ""])
  }

  const handleCandidateChange = (index, value) => {
    const updatedCandidates = [...newCandidates]
    updatedCandidates[index] = value
    setNewCandidates(updatedCandidates)
  }

  const addCandidateInput = () => {
    setNewCandidates([...newCandidates, ""])
  }

  const removeCandidate = (index) => {
    const updatedCandidates = [...newCandidates]
    updatedCandidates.splice(index, 1)
    setNewCandidates(updatedCandidates)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">🗳️ Admin Dashboard</h1>

      {/* Create Election Form */}
      <Card className="max-w-2xl mx-auto mb-10">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Election</h2>

          <div className="mb-4">
            <label className="block font-medium mb-1">Election Name</label>
            <Input
              value={newElectionName}
              onChange={(e) => setNewElectionName(e.target.value)}
              placeholder="e.g. Class Representative"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Duration (in minutes)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 60"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Candidates</label>
            {newCandidates.map((candidate, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  className="flex-1"
                  value={candidate}
                  onChange={(e) => handleCandidateChange(index, e.target.value)}
                  placeholder={`Candidate ${index + 1}`}
                />
                {newCandidates.length > 1 && (
                  <Button
                    variant="destructive"
                    className="ml-2"
                    onClick={() => removeCandidate(index)}
                  >
                    ❌
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={addCandidateInput}
              className="mt-2"
              variant="outline"
            >
              ➕ Add Candidate
            </Button>
          </div>

          <Button onClick={createElection} className="mt-4 w-full">
            ✅ Create Election
          </Button>
        </CardContent>
      </Card>

      {/* Elections List */}
      <div className="max-w-4xl mx-auto grid gap-6">
        {elections.map((election) => (
          <Card key={election.id}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{election.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Duration: {election.duration} min | Status: {election.status}
              </p>
              <ul className="list-disc pl-5">
                {election.candidates.map((c, i) => (
                  <li key={i}>
                    {c.name} - {c.votes} votes
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
