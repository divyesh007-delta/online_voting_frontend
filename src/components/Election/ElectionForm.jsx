import React, { useState } from 'react';
// import { createElection } from '../../services/api';

const ElectionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    durationMinutes: 60,
    candidates: [''],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...formData.candidates];
    newCandidates[index] = value;
    setFormData({ ...formData, candidates: newCandidates });
  };

  const addCandidate = () => {
    setFormData({ ...formData, candidates: [...formData.candidates, ''] });
  };

  const removeCandidate = (index) => {
    if (formData.candidates.length > 1) {
      const newCandidates = formData.candidates.filter((_, i) => i !== index);
      setFormData({ ...formData, candidates: newCandidates });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createElection({
        ...formData,
        candidates: formData.candidates.filter((c) => c.trim() !== ''),
      });
      setSuccess('Election created successfully!');
      setFormData({ name: '', durationMinutes: 60, candidates: [''] });
      setError('');
    } catch (err) {
      setError('Failed to create election. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Election</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Election Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="durationMinutes" className="block text-gray-700 font-medium">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="durationMinutes"
            name="durationMinutes"
            value={formData.durationMinutes}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Candidates</label>
          {formData.candidates.map((candidate, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={candidate}
                onChange={(e) => handleCandidateChange(index, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Candidate ${index + 1}`}
                required
              />
              {formData.candidates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCandidate(index)}
                  className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCandidate}
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Add Candidate
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create Election
        </button>
      </form>
    </div>
  );
};

export default ElectionForm;