import React from 'react';


function Help() {
    return (
        <div>
            <div className="help-section">
                <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>Help</h1>
                <div className="column" style={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', height: '20vh' }}>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This visualization consists of three interactively connected parts: A <b>Body Map</b> (left) which displays different muscles, a <b>Circle Packing Chart</b> (top right) which displays exercises, and a <b>Detailed List</b> (bottom right) in which selected exercises appear and more detailed info about them can be found. A more detailed explanation of each of these parts, and in what ways they are connected, follows.</p>
                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium"><b>Body Map</b></h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">The Body Map shows the larger muscles and muscle groups of the human body. The body model can be set to either male or female according to personal preference.
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">It is both an interactive map and a visual representation. Clicking on a specific muscle updates the Circle Packing Chart to only show exercises targetting said muscle. Any additionally clicked muscles will update the Circle Packing Chart in one of two ways: By default, the exercises displayed will be the exercises targetting any of the currently selected muscles. By changing the option &quot;Get Exercises As&quot; to &quot;Intersection&quot;, the exercises displayed will only be the exercises targetting all of the currently selected muscles.
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">The Body Map is also a <b>Heat Map</b> which is enabled when exercises are selected in the Circle Packing Chart. The heat map shows which muscles are involved in the selected exercises and to what extent. All exercises have a primary muscle which they activate. Some exercises have secondary (support) and/or tertiary (synergists/stabilizers) muscles which are also activated but not to the same extent. We decided to attribute the arbitrary unit (aU) per muscle: 2 aU for primary muscles, 1 aU for secondary muscles, and 0.5 aU for tertiary muscles. The heat map represents the total aU per muscle for all currently selected exercises. As the aU sum of a muscle increases, the heat map updates by going from white to red. When a muscle reaches 9 aU, it starts pulsating to indicate that performing all of these exercises in one session could put you at risk of overtraining.</p>

                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium"><b>Circle Packing Chart</b></h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This visualization contains all of the available exercises. As explained in the previous section, the exercises currently being displayed is related to which muscles are currently selected. 
                    To find exercises based on specific criteria, four ways of sorting the Circle Packing Chart is available: by <i>Equipment</i>, by <i>Force</i> , by <i>Mechanic</i> and by <i>Difficulty</i>. When selecting a sorting filter, the Circle Packing Chart sorts exercises according to their own value for this attribute.
                    E.g. choosing to sort by difficulty puts all the beginner exercises in one circle, all intermediate exercises in another circle and all advanced exercises in a third circle.
                    Multiple sorting filters can be applied one after the other. This repeats the sorting function but takes it one level deeper. E.g. choosing to sort by mechanic after having already sorted by difficulty will give all the pre-existing difficulty circles (beginner, intermediate, advanced), two additional sub-circles (isolation, compound) in which the exercises now reside.
                    To traverse through the Circle Packing Chart, simply click inside the circle you want to traverse to. To zoom back out, click anywhere in the Circle Packing Chart window.

                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal"> The color of a circle represents the difficulty level of the exercise.
                        By default, the size of a circle represents popularity by Google search volume. This can be changed to instead represent the total number of muscles the exercise activates.
                        Exercises are selected and deselected in the Circle Packing Chart by clicking on a circle corresponding to an exercise. This will give the circle an outline and will also make it appear in the Detailed List.
                        </p>

                    <h2 className="text-center p-2 text-neutral-600 py-2 font-medium"><b>Detailed List</b></h2>
                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">This representation is a list of all the exercises selected in the Circle Packing Chart.
                    The list provides more detailed information on each selected exercise compared to what is given in the Circle Packing chart. 
                    Even more detailed information about a selected exercise can be retrieved by clicking on the name of the exercise in the list. This opens a pop-up page containing a written description on how to perform the exercise as well as a video demonstrating how to perform the exercise.
                    </p><p className="text-center p-2 text-neutral-600 py-2 font-normal">Clicking the top-left icon of the list transforms it to a video-only view. 
                    In this view, the list is instead represented only by the demonstration videos from the pop-up pages, allowing for quick navigation through the demonstration videos of the selected exercises on demand.
                    Switching between videos is done by clicking on the arrows on each side of the video player.</p>
                    <a className="text-center p-2 text-blue-600 py-2 font-normal " href="https://musclewiki.com/" target='_blank' rel="noreferrer">Data was scraped from MuscleWiki</a>
                    <a className="text-center p-2 text-blue-600 py-2 font-normal " href="https://github.com/ernum/Vizercise" target='_blank' rel="noreferrer">Source code is available on Github</a>
                    <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>Demo Video</h1>
                    
                    <a className="text-center p-2 text-blue-600 py-2 font-normal " href="https://youtu.be/pWXeIh5N4EM" target='_blank' rel="noreferrer">Click here to access Demo Video</a>
                </div>
            </div>


        </div>
    );

};

export default Help;
