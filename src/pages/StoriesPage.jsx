
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StoriesPage() {
    const navigate = useNavigate();
  const initialStories = [
    {
      img: 'images/news_6.png',
      title: 'Breaking the Silence',
      desc: 'A survivor shares her journey from fear to empowerment, inspiring others to speak up.'
    },
    {
      img: 'images/news_7.png',
      title: 'Finding Support',
      desc: 'How community and legal support helped a survivor rebuild her life.'
    },
    {
      img: 'images/news_8.png',
      title: 'Courage to Report',
      desc: 'Reporting harassment was tough, but it led to justice and healing.'
    },
    {
      img: 'images/news_9.png',
      title: 'A New Beginning',
      desc: 'After years of struggle, a survivor found hope and a fresh start.'
    },
    {
      img: 'images/news_11.webp',
      title: 'Voices United',
      desc: 'Group support sessions helped many survivors regain confidence.'
    },
    {
      img: 'images/news_3.jpg',
      title: 'Strength in Numbers',
      desc: 'Together, survivors are changing the narrative and fighting for rights.'
    },
    {
      img: 'images/news_10.webp',
      title: 'Healing Journey',
      desc: 'Therapy and self-care played a key role in recovery.'
    },
    {
      img: 'images/news_4.jpeg',
      title: 'Empowered to Help',
      desc: 'A survivor now helps others find their voice and seek justice.'
    }

  ];
  const [stories, setStories] = useState(initialStories);
  const [form, setForm] = useState({ name: '', title: '', desc: '' });
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');


  const ReportHandler = () => {
    window.open('https://images.app.goo.gl/wj2Yxfn5UF39yLhB9', '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim() || !form.desc.trim()) {
      setSuccessMsg('Please fill in all fields.');
      return;
    }
    setStories([
      {
        img: 'images/news_3.jpg',
        title: form.title,
        desc: form.desc + `\n— ${form.name}`,
      },
      ...stories,
    ]);
    setForm({ name: '', title: '', desc: '' });
    setSuccessMsg('Thank you for sharing your story!');
    setShowForm(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };


  return (
    <>
      <section className='bg-gray-100 m-4 md:m-10 shadow-2xl rounded-2xl p-6 md:p-10'>
        <h1 className='text-center pt-6 md:pt-10 text-3xl md:text-5xl font-bold text-[#2E003E] mb-8 md:mb-10'>
          Survivor Stories
        </h1>
        {/* Removed top Share Your Story button */}
        {showForm && (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#6A0DAD] mb-2">Share Your Story (Anonymous allowed)</h2>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Your Name (or Anonymous)"
              className="border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
              maxLength={32}
            />
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="Story Title"
              className="border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
              maxLength={60}
              required
            />
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleInputChange}
              placeholder="Your Story (max 500 chars)"
              className="border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
              rows={4}
              maxLength={500}
              required
            />
            <button
              type="submit"
              className="bg-[#6A0DAD] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#5e0c9f] transition duration-300"
            >
              Submit Story
            </button>
            {successMsg && (
              <div className="text-center text-purple-700 font-medium mt-2">{successMsg}</div>
            )}
          </form>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {stories.map((story, idx) => (
            <button
              key={idx}
              className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 text-left focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] cursor-pointer'
              style={{ minHeight: '350px', cursor: 'pointer' }}
              onClick={() => navigate(`/story/${idx}`, { state: { story } })}
              aria-label={`Read more about ${story.title}`}
            >
              <img
                src={story.img}
                alt={story.title}
                className='w-full h-56 object-cover'
              />
              <div className='p-4 flex-1 flex flex-col justify-between'>
                <h2 className='text-xl font-semibold text-[#6A0DAD] mb-2'>{story.title}</h2>
                <p className='text-gray-700 text-base mb-4' style={{whiteSpace:'pre-line'}}>{story.desc}</p>
                <span className='text-[#6A0DAD] font-medium mt-auto underline underline-offset-2'>Read More</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      {/* Bottom Buttons */}
      <div className="flex justify-center mt-8 mb-10 gap-4">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-[#6A0DAD] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#5e0c9f] transition duration-300"
          aria-label="Share your story"
        >
          {showForm ? 'Cancel' : 'Share Your Story'}
        </button>
        <button
          onClick={ReportHandler}
          className="text-white px-8 py-3 md:px-10 md:py-4 bg-[#6A0DAD] rounded-full font-semibold shadow-lg hover:bg-[#5e0c9f] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]"
          id='reportHandler'
          aria-label="See more survivor reports"
        >
          More Reports <i className="fa-solid fa-arrow-right-long ml-2"></i>
        </button>
      </div>
      {successMsg && !showForm && (
        <div className="text-center text-purple-700 font-medium mb-6">{successMsg}</div>
      )}
    </>
  );
}
