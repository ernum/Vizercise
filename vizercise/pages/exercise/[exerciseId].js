import React, { Component } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [showPosts, setShowPosts] = useState();
  const source = "/scraped-data.json";
  const router = useRouter();
  const exerciseId = router.query.exerciseId;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(source); //fetch
      const dataRespons = await response.json(); //store respons(the data) object

      let displayData = dataRespons.map(function (exercise) {
        if (exercise.id == exerciseId)
          return (
            <div key={exercise.id} className='flex h-screen'>
              <div
                className=' flex shadow-2xl bg-white rounded-3xl w-1/4
                 m-auto'>
                <div className='pt-20'>
                  <iframe
                    className='m-auto rounded-xl'
                    src={exercise.video}
                    width='400px'
                    height='225px'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'></iframe>
                  <div className='p-20'>
                    <h1 className='text-center p-2 text-3xl text-neutral-600 font-medium'>
                      {exercise.name}
                    </h1>
                    <p className='py-2 font-normal'><b>Equipment:</b> {exercise.equipment}{" "}</p>
                    <p className='py-2 font-normal'> 
                      <b>Difficulty:</b>{" "}
                      <span className={difficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </span>
                    </p>
                    <p className='py-2 font-normal'><b>Grips:</b> {exercise.grips}</p>
                    <p className='py-2 font-normal'><b>Mechanic:</b> {exercise.mechanic}</p>
                    <p className='py-2 font-normal'><b>Force:</b> {exercise.force}</p>
                    <p className='py-2 font-normal'><b>Instructions:</b> {exercise.howTo}</p>
                  </div>
                </div>
              </div>
            </div>
          );
      });
      setShowPosts(displayData);
    }
    fetchData();
  }, [router]);

  return (
    <div>
      <div>{showPosts}</div>
    </div>
  );
}

function difficultyColor(level) {
  if (level == "Beginner")
    return "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
  else if (level == "Intermediate")
    return "bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300";
  return "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
}
