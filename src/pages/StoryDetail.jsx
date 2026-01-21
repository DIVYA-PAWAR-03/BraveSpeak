import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function StoryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const story = location.state?.story;

  if (!story) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Story not found</h2>
        <button onClick={() => navigate(-1)} className="bg-[#6A0DAD] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#5e0c9f] transition duration-300">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <img src={story.img} alt={story.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold text-[#6A0DAD] mb-4">{story.title}</h1>
      <p className="text-gray-700 text-lg mb-6" style={{whiteSpace:'pre-line'}}>{story.desc}</p>
      <button onClick={() => navigate(-1)} className="bg-[#6A0DAD] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#5e0c9f] transition duration-300">Back to Stories</button>
    </div>
  );
}
