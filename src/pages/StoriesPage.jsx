import React, { useState } from "react";

const survivorStories = [
  {
    name: "Anonymous Survivor 1",
    age: 24,
    city: "Mumbai",
    story:
      "I was afraid to speak up, but when I did, I realized how many people stood by me. I now help other women share their stories too. Speaking up changed my life.",
    quote: "Your voice can be someone else's strength."
  },
  {
    name: "Anonymous Survivor 2",
    age: 31,
    city: "Delhi",
    story:
      "I was cyber harassed for months. I finally took a stand by filing an online complaint. Justice takes time, but healing began the day I stood for myself.",
    quote: "Healing starts with the courage to fight."
  },
  {
    name: "Anonymous Survivor 3",
    age: 28,
    city: "Pune",
    story:
      "I didn’t think anyone would believe me. But after reporting the harassment, I received help from an NGO and a counselor. Now, I work with them to support others.",
    quote: "You are not alone, and you never were."
  },
  {
    name: "Nirbhaya Case (Delhi, 2012)",
    age: 23,
    city: "Delhi",
    story:
      "On 16 December 2012, a 23-year-old physiotherapy intern was brutally gang-raped on a moving bus in Delhi. The case sparked national outrage, massive protests, and reforms in Indian rape laws. Known as the 'Nirbhaya' case, it led to the formation of fast-track courts and stricter punishment for sexual assault.",
    quote: "She was not just a victim; she became the voice of millions."
  },
  {
    name: "Monideepa Bandyopadhyay (Kolkata)",
    age: 27,
    city: "Kolkata",
    story:
      "Monideepa, a journalist from Kolkata, faced persistent workplace harassment by a senior editor. She stood up against the abuse by filing a formal complaint under the Sexual Harassment of Women at Workplace Act, 2013. Her courage inspired others in media to come forward during India’s #MeToo movement.",
    quote: "Silence is not strength. Speaking out brings change."
  },
  {
    name: "Anonymous Survivor 4",
    age: 35,
    city: "Hyderabad",
    story:
      "After experiencing years of emotional and physical abuse, I found the courage to walk away and start anew. I now conduct community workshops for women’s rights and safety.",
    quote: "Freedom begins the moment you stop being afraid."
  },
  {
    name: "Anonymous Survivor 5",
    age: 19,
    city: "Nagpur",
    story:
      "I was harassed by a college senior and kept it to myself. A support group helped me realize I wasn’t alone. Today, I run a blog where survivors can anonymously share their stories.",
    quote: "Your story matters, and so do you."
  }
];

export default function StoriesPage() {
  const [visibleIndex, setVisibleIndex] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 bg-gradient-to-b from-purple-50 to-white">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-purple-800">
        Survivor Stories & Testimonials
      </h1>

      <p className="text-lg text-center text-gray-700 max-w-4xl mx-auto mb-10">
        These brave voices have come forward to share their journey of survival,
        courage, and hope. Each story is a beacon of strength, breaking stigma,
        and inspiring society to stand up for justice.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {survivorStories.map((story, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-xl border-l-8 border-purple-600 hover:shadow-2xl transition-all"
          >
            <h2 className="text-2xl font-bold text-purple-800">
              {story.name}
              <span className="block text-sm font-medium text-gray-500">
                ({story.age}, {story.city})
              </span>
            </h2>
            <p className="mt-2 text-purple-700 italic">"{story.quote}"</p>
            <button
              onClick={() => setVisibleIndex(visibleIndex === index ? null : index)}
              className="mt-4 px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 font-medium"
            >
              {visibleIndex === index ? "Hide Story" : "Read Full Story"}
            </button>
            {visibleIndex === index && (
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                {story.story}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-purple-100 p-6 rounded-xl shadow-md text-center">
        <p className="text-lg text-purple-800 font-semibold">
          “Real stories have the power to heal, inspire, and transform society.”
        </p>
      </div>
    </section>
  );
}
