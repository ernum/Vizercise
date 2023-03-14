import React from 'react';

function About() {
    return (
        <div>
            <div className="about-section">
                <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>About Us</h1>
                <div className="column" style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', height: '20vh' }}>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Welcome to Viserzice, the visualization of workout exercises to help you find new ways of training. We intend to allow the user to target muscles and muscles groups of interest, filter depending on equipment, type of strength and mechanic but also choose exercises depending on its own level (Beginner, Intermediate and Expert). Selecting a few exercises allows the user to see the muscles targeted on the body heat map and in how many selected exercises each muscle appears. We intend to help beginners and more experienced person when it comes to workout to discover new exercises and visualize more information about a potential workout routine.This project is part of the course Information Visualization in KTH, Stockholm</p>
                    <h2 className="text-center text-4x1 font-bold" style={{ marginBottom: "15px", marginTop: "18px", fontSize:"20px" }}>Help Section</h2>
                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Body Heat Map</h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">The body representation allows you to see muscles on the back and front view simultaneously. You can switch between a Male and a Female representation
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">It is both an interactive map and a visual representation.
                    You can select muscles to filter the data of the Circle Packing chart on the top right. Selecting a muscle will only show exercises that target this specific muscle. Selecting multiple muscles will show all exercises that target one of the selected muscles
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">You enable the heatmap visualisation when selecting exercises on the Circle Packing chart. It intends to show which muscles are involved in the selected exercises and to what extent. The idea is to help select a group of exercises for a workout session. For each exercise, the information in the data about the muscles is as follows: Primary muscles, Secondary muscles and Tertiary muscles. Primary muscles are the main target of the exercise, Secondary muscles are support, and Tertiary muscles are synergists or stabilizers. We decided to attribute the arbitrary unit per muscle: 1 a.u. for Primary, 0,6 a.u. for Secondary, and 0,3 a.u. for Tertiary. The heatmap represents the sum of the arbitrary values for each selected exercise per muscle. When a muscle reaches 5 a.u., it starts pulsating. It is a warning sign as it is recommended to do 2 to 4 different exercises maximum per session when targeting a specific muscle</p>

                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Circle Packing Chart</h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This visualisation contains all the exercises available in our data. It aims to help you select proper exercises with filtering and packing possibilities. The filter is the selection of muscles on the body map. The second is on the left of the representation and is packing properties of the exercises: Equipment, Force Mechanic and Difficulty. When selecting one property, it packs exercises according to the value of this property. You can select multiple properties at the same, it will pack exercises with a depth factor. The first selected filter will be the packing in the first depth, the second, the packing in the second depth, etc.Little numbers on the top right of the filter icons indicate the depth of the corresponding packing. Select a pack circle to reach the next depth

                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">Colors of the exercises represent the difficulty level, the same one as the packing property.
                        The size of the circle represents popularity by Google search volume.
                        You can select and unselect exercises on this representation by clicking on the corresponding circle, they will then be listed on the bottom right of the screen in the Detailed List</p>

                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Detailed List</h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This representation is a list of all the selected exercises in the Circle Packing Chart. It aims to give more details on each exercise, by reading the table but also clicking on the name of an exercise to open a pop-up page with more information, such as a demonstration video and description of the exercise
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">The icon on the top left allows moving to the video-only view. In this view, the table chart is replaced by a new view. All the exercises that are listed in the Detailed List are added to this new view as follows: each page represents one exercise with the name of the exercise and the corresponding demonstration video. You can move to the next or previous exercise by using the arrows on each side. You can come back to the Detailed List view by pressing the top left icon</p>
                    <h2 className="text-center text-4x1 font-bold" style={{ marginBottom: "15px", marginTop: "10px", fontSize: "20px"}}>Our Team</h2>
                    <div className="row" style={{ textAlign: 'center' }}>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Carter Smith</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Collection and Processing, Frontend Development, User test</p>

                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">carters@kth.se</p>
                                </div>
                            </div>
                        </div>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Ernest Umeh</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Collection and Processing, Backend Development, Frontend Development, User test</p>

                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">umeh@kth.se</p>
                                </div>
                            </div>
                        </div>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Mohammed Qasim</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Collection and Processing, Backend Development, Frontend Development, User test</p>

                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">msyqasim@kth.se</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ textAlign: 'center' }}>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Mans Nyman</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Collection and Processing, Backend Development, Frontend Development, UI/UX Design, User test</p>

                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">mansnym@kth.se</p>

                                </div>
                            </div>
                        </div>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>

                                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Marine Czaplinski</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Frontend Development, UI/UX Design, User test</p>

                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">marinec@kth.se</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            
        </div>
    );
}

export default About;