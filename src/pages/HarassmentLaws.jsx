import React, { useState } from "react";

const HarassmentLaws = () => {
  const [expanded, setExpanded] = useState(null);

  const data = [
    {
      title: "1. Sexual Harassment",
      description:
        "Unwanted sexual behavior like touching, staring, or inappropriate comments.",
      laws: [
        "IPC Section 354A",
        "Sexual Harassment of Women at Workplace Act, 2013",
      ],
      punishment: "Up to 3 years imprisonment and/or fine",
      more:
        "Sexual harassment includes any unwelcome sexually determined behavior. This includes physical contact, advances, demands for sexual favors, showing pornography, and making sexually colored remarks.",
    },
    {
      title: "2. Verbal Harassment",
      description:
        "Abusive or sexually explicit language to intimidate or humiliate someone.",
      laws: ["IPC Section 294", "IPC Section 509"],
      punishment: "Up to 3 years imprisonment or fine",
      more:
        "Verbal harassment can occur in public, workplace, or online. It includes threats, insults, and vulgar remarks, which can severely affect the victim’s mental well-being.",
    },
    {
      title: "3. Physical Harassment",
      description: "Unwanted physical contact like hitting, pushing, or grabbing.",
      laws: ["IPC Section 354"],
      punishment: "1 to 5 years imprisonment and fine",
      more:
        "Physical harassment involves any unwelcome physical force or contact. It violates personal boundaries and often escalates from seemingly minor actions to severe assaults.",
    },
    {
      title: "4. Cyber Harassment",
      description: "Using digital platforms to stalk, threaten, or harass someone.",
      laws: ["IT Act Section 67, 66E", "IPC Section 354D"],
      punishment: "Up to 3 years imprisonment and/or fine",
      more:
        "Cyber harassment includes sending obscene messages, online stalking, impersonation, leaking personal content, and constant online threats or bullying.",
    },
    {
      title: "5. Psychological/Emotional Harassment",
      description: "Mental abuse like gaslighting, isolation, or threats.",
      laws: ["IPC Section 498A", "Domestic Violence Act, 2005"],
      punishment: "Varies depending on case",
      more:
        "Emotional harassment breaks down a person’s self-worth. This includes manipulation, isolation from loved ones, and constant criticism or humiliation.",
    },
    {
      title: "6. Workplace Harassment",
      description:
        "Unwanted behavior in the workplace like jokes, touching, or discrimination.",
      laws: ["Sexual Harassment of Women at Workplace Act, 2013"],
      punishment: "Disciplinary/legal action",
      more:
        "Workplace harassment may also include retaliation for complaints, biased performance reviews, and inappropriate comments by colleagues or superiors.",
    },
    {
      title: "7. Stalking",
      description:
        "Repeated following, messaging, or watching someone against their will.",
      laws: ["IPC Section 354D"],
      punishment: "3 to 5 years imprisonment and fine",
      more:
        "Stalking includes both physical following and digital surveillance. Victims often feel unsafe and mentally stressed due to this ongoing behavior.",
    },
    {
      title: "8. Caste-based or Gender-based Harassment",
      description:
        "Targeting someone because of their caste, gender identity, or sexual orientation.",
      laws: ["SC/ST (Prevention of Atrocities) Act", "Article 15 of Indian Constitution"],
      punishment: "Strict punishment depending on the case severity",
      more:
        "Discrimination and harassment based on caste or gender identity are punishable under Indian law. These acts violate basic human rights and dignity.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
        Types of Harassment & Indian Laws
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg shadow-black/30 border-l-8 border-purple-700"
          >
            <h2 className="text-2xl font-semibold text-purple-800">{item.title}</h2>
            <p className="mt-2 text-purple-700">{item.description}</p>
            <ul className="mt-2 list-disc list-inside text-purple-700">
              {item.laws.map((law, idx) => (
                <li key={idx}>{law}</li>
              ))}
            </ul>
            <p className="mt-1 font-semibold text-purple-700">
              Punishment: {item.punishment}
            </p>
            <button
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="mt-4 px-4 py-1 bg-purple-200 text-purple-800 rounded hover:bg-purple-300"
            >
              {expanded === index ? "Hide Info" : "More Info"}
            </button>
            {expanded === index && (
              <p className="mt-3 text-purple-600 text-sm">{item.more}</p>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-lg mt-10 font-medium text-purple-700">
        You have the right to be safe. Harassment is a crime. Report it. Speak up. Seek justice.
      </p>

      {/* ✅ SUPPORT SECTION */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
          Support & Resources
        </h2>

        <div className="bg-purple-50 p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">📞 National Helplines</h3>
          <ul className="list-disc list-inside text-purple-700">
            <li><strong>181:</strong> Women Helpline (24x7 emergency)</li>
            <li><strong>1091:</strong> Women Police Helpline</li>
            <li><strong>112:</strong> All-in-one Emergency Number</li>
            <li><a href="https://ncw.nic.in" target="_blank" rel="noreferrer" className="underline">Visit National Commission for Women (NCW)</a></li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">📝 How to Report</h3>
          <ul className="list-disc list-inside text-purple-700">
            <li>Visit nearest police station and file an FIR (First Information Report)</li>
            <li>Use online complaint portals like <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="underline">cybercrime.gov.in</a></li>
            <li>File complaint through NCW or Women Safety Apps (e.g. Raksha, Himmat)</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">🤝 Legal & Emotional Support</h3>
          <ul className="list-disc list-inside text-purple-700">
            <li>Free legal aid through District Legal Services Authority (DLSA)</li>
            <li>Counseling support via NGOs like <strong>SAHELI</strong>, <strong>Breakthrough</strong>, <strong>SNEHA</strong></li>
            <li>Join survivor groups and mental health forums for healing</li>
          </ul>
        </div>
           
{/* ✅ Join the Movement Section */}
<div className="bg-purple-50 p-6 rounded-xl shadow-md mb-8">
  <h3 className="text-xl font-semibold text-purple-700 mb-3">🤝 Join the Movement</h3>
  <ul className="list-disc list-inside text-purple-700 space-y-2">
    <li><strong>Become a Volunteer:</strong> Support awareness drives, events, or digital campaigns.</li>
    <li><strong>Partner with NGOs:</strong> Collaborate with organizations working for survivor support and women's safety.</li>
    <li><strong>Donate or Sponsor:</strong> Help fund helplines, counseling, or create survivor resource kits.</li>
    <li><strong>Spread Awareness:</strong> Share posts, use <span className="font-bold text-purple-800">#BraveSpeak</span>, and educate your circle.</li>
  </ul>
</div>



        <div className="bg-purple-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg italic text-purple-800">
            “You are brave. You matter. You are not alone.” 💜
          </p>
        </div>
      </div>
    </section>
  );
};

export default HarassmentLaws;
