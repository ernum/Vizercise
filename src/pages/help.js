import React from 'react';


function Help() {
    return (
        <div>
            <div className="help-section">
                <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>Help</h1>
                <div className="column" style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', height: '20vh' }}>
                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Body Heat Map</h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">The body representation allows you to see muscles on the back and front view simultaneously. You can switch between a Male and a Female representation
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">It is both an interactive map and a visual representation.
                        You can select muscles to filter the data of the Circle Packing chart on the top right. Selecting a muscle will only show exercises that target this specific muscle. Selecting multiple muscles will show all exercises that target one of the selected muscles or both depending on the selected filter
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">You enable the heatmap visualisation when selecting exercises on the Circle Packing chart. It intends to show which muscles are involved in the selected exercises and to what extent. The idea is to help select a group of exercises for a workout session. For each exercise, the information in the data about the muscles is as follows: Primary muscles, Secondary muscles and Tertiary muscles. Primary muscles are the main target of the exercise, Secondary muscles are support, and Tertiary muscles are synergists or stabilizers. We decided to attribute the arbitrary unit per muscle: 2 a.u. for Primary, 1 a.u. for Secondary, and 0,5 a.u. for Tertiary. The heatmap represents the sum of the arbitrary values for each selected exercise per muscle. When a muscle reaches 9 a.u., it starts pulsating. It is a warning sign as it is recommended to do 2 to 4 different exercises maximum per session when targeting a specific muscle</p>

                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Circle Packing Chart</h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This visualisation contains all the exercises available in our data. It aims to help you select proper exercises with filtering and packing possibilities. The first filter is the selection of muscles on the body map. The second is on the left of the representation and is packing properties of the exercises: Equipment, Force, Mechanic and Difficulty. When selecting one property, it packs exercises according to the value of this property. You can select multiple properties at the same, it will pack exercises with a depth factor. The first selected filter will be the packing in the first depth, the second, the packing in the second depth, etc.Little numbers on the top right of the filter icons indicate the depth of the corresponding packing. Select a pack circle to reach the next depth

                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">Colors of the exercises represent the difficulty level, the same one as the packing property.
                        The size of the circle represents popularity by Google search volume. You can use the Circle Size filter so that the size represent the amount of muscles activated in the exercise.
                        You can select and unselect exercises on this representation by clicking on the corresponding circle, they will then be listed on the bottom right of the screen in the Detailed List</p>

                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium">Detailed List</h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This representation is a list of all the selected exercises in the Circle Packing Chart. It aims to give more details on each exercise, by reading the table but also clicking on the name of an exercise to open a pop-up page with more information, such as a demonstration video and description of the exercise
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">The icon on the top left allows moving to the video-only view. In this view, the table chart is replaced by a new view. All the exercises that are listed in the Detailed List are added to this new view as follows: each page represents one exercise with the name of the exercise and the corresponding demonstration video. You can move to the next or previous exercise by using the arrows on each side. You can come back to the Detailed List view by pressing the top left icon</p>
                    <a className="text-center p-2 text-blue-600 py-2 font-normal " href="https://musclewiki.com/" target='_blank' rel="noreferrer">Data was scrapped from MuscleWiki</a>
                    <a className="text-center p-2 text-blue-600 py-2 font-normal " href="https://github.com/ernum/Vizercise" target='_blank' rel="noreferrer">Source code is available on Github</a>
                    <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>Demo Video</h1>
                    
                    <a className="text-center p-2 text-blue-600 py-2 font-normal " href="https://youtu.be/5H7QNZI6wRY" target='_blank' rel="noreferrer">Click here to access Demo Video</a>
                </div>
            </div>


        </div>
    );

};

export default Help;
