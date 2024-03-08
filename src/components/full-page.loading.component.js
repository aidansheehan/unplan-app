import { LightBulbIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

const eslTeachingTips = [
    "Incorporate authentic materials like menus or brochures into lessons to give students real-world practice.",
    "Use role-play scenarios to enhance speaking skills, such as ordering food or asking for directions.",
    "Introduce idiomatic expressions and phrases to help students sound more like native speakers.",
    "Employ the TPR (Total Physical Response) method for kinesthetic learners by acting out vocabulary words.",
    "Create a language-rich environment in your classroom with posters, labels, and visual aids.",
    "Start a class blog where students can share experiences and practice writing skills.",
    "Implement the use of language learning apps as homework to reinforce classroom learning.",
    "Focus on phonetic practice to help students with pronunciation and understanding spoken English.",
    "Utilize pair and group work to foster communication and teamwork among students.",
    "Incorporate music and song lyrics to teach rhythm, stress, and intonation in English speech.",
    "Use storytelling as a method to teach vocabulary, grammar, and cultural nuances.",
    "Encourage self-correction among students to make them more independent learners.",
    "Introduce debates and discussions on current events to practice persuasive language and critical thinking.",
    "Implement a ‘word of the day’ activity to expand students’ vocabularies.",
    "Provide clear objectives for each lesson so students understand the purpose of their activities.",
    "Use technology in the classroom, such as interactive whiteboards or language learning websites.",
    "Encourage students to read extensively outside of class, and suggest English books appropriate for their levels.",
    "Design quizzes and games to make learning fun and competitive.",
    "Differentiate instruction to meet the varied needs of students at different language levels.",
    "Offer regular, constructive feedback on spoken and written work to guide students’ progress."
  ];
  

const FullPageLoading = ({message}) => {
  const [ progress, setProgress ]               = useState(0);
  const [ tip, setTip ]                         = useState('')
  const [ extendedLoading, setExtendedLoading ] = useState(false)

  useEffect(() => {
    setTip(eslTeachingTips[Math.floor(Math.random() * eslTeachingTips.length)]);
    //Change the tip every 5 seconds
    const tipInterval = setInterval(() => {
        setTip(eslTeachingTips[Math.floor(Math.random() * eslTeachingTips.length)])
    }, 10000)

    // Simulate a loading bar progress
    const progressInterval = setInterval(() => {
        setProgress(oldProgress => {
          const newProgress = oldProgress + 5;
          if (newProgress >= 95) {
            clearInterval(progressInterval);
            // Start checking if loading is taking too long
            setTimeout(() => setExtendedLoading(true), 2000); // 2 seconds after reaching 95%
          }
          return newProgress;
        });
      }, 1000); // The bar will fill up in 20 seconds

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval)
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="bg-accent text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>{extendedLoading ? "We're still working on it..." : 'Loading...'}</div>
        </div>
        <h2 className="text-lg font-semibold text-center mt-4">
            {extendedLoading ? "Almost there, just finalizing a few things!" : message}
        </h2>
        <p className="mt-2 text-gray-600 text-center">
            {extendedLoading ? "Thanks for your patience." : "This may take around 20 seconds. Please don't close this page."}
        </p>
        <div className="mt-4 p-4 bg-lightPrimary rounded-md shadow-lg inline-flex">
          <LightBulbIcon className='h-8 mr-4' />
          <p className="text-sm text-secondaryText italic">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoading;
