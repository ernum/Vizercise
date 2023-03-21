import React from 'react';

function About() {
    return (
        <div>
            <div className="about-section">
                <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>About Us</h1>
                <h2 className="text-center text-4x1 font-bold" style={{ marginBottom: "15px", marginTop: "10px", fontSize: "20px"}}>The Project</h2>
                    <div className="row" style={{ marginLeft: "20%", marginRight: "20%", textAlign: 'center', marginBottom: "10px" }}>
                        Vizercise is an visualization tool that allows users to explore exercises based on activated muscle groups, exercise mechanics, difficulty, and other factors crucial to workout effectiveness [1]. 
                        The motivation behind this project was to bring visual representation and interactivity to exercise data from <a className="text-blue-600" href="https://musclewiki.com" target="_blank" rel="noreferrer">MuscleWiki [2]</a> by mapping it to the human body and giving a visual representation of workout intensity [3].
                    </div>
                    <div className="row" style={{ marginLeft: "10%", marginRight: "10%", textAlign: 'center', marginBottom: "30px", fontSize: "10px" }}>
                        Schoenfeld, Brad J. The Mechanisms of Muscle Hypertrophy and Their Application to Resistance Training [1] <br />
                        [2] MuscleWiki, https://musclewiki.com <br />
                        Barbalho, Matheus, et al. &quot;Evidence for an upper threshold for resistance training volume in trained women.&quot; Med Sci Sports Exerc (2019) [3]
                    </div>

                <h2 className="text-center text-4x1 font-bold" style={{ marginBottom: "15px", marginTop: "10px", fontSize: "20px"}}>Our Team</h2>
                    <div className="row" style={{ textAlign: 'center' }}>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                    <h2 className="text-center p-2 text-neutral-600 py-2 font-bold">Carter Smith</h2>
                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Collection and Processing, Frontend Development, UI/UX Design</p>

                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">carters@kth.se</p>
                                <a href="https://www.linkedin.com/in/carterwsmith" className="text-center p-2 text-blue-600 py-2 font-normal">Linkedin</a>
                                </div>
                            </div>
                        </div>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                <h2 className="text-center p-2 text-neutral-600 py-2 font-bold">Ernest Umeh</h2>
                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Processing, Frontend Development, UI/UX Design</p>

                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">umeh@kth.se</p>
                                <a href="https://www.linkedin.com/in/ernest-umeh" className="text-center p-2 text-blue-600 py-2 font-normal">Linkedin</a>
                                </div>
                            </div>
                        </div>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                <h2 className="text-center p-2 text-neutral-600 py-2 font-bold">Mohammed Qasim</h2>
                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Processing, Frontend Development, UI/UX Design, User test</p>

                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">msyqasim@kth.se</p>
                                <a href="https://www.linkedin.com/in/modi-qasim/" className="text-center p-2 text-blue-600 py-2 font-normal">Linkedin</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ textAlign: 'center' }}>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                <h2 className="text-center p-2 text-neutral-600 py-2 font-bold">M{"\u00E5"}ns Nyman</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Data Processing, Frontend Development, UI/UX Design</p>

                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">mansnym@kth.se</p>

                                </div>
                            </div>
                        </div>

                        <div className="column" style={{ display: 'inline-block', width: '33%', alignItems: 'center' }}>
                            <div className="card">
                                <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>

                                <h2 className="text-center p-2 text-neutral-600 py-2 font-bold">Marine Czaplinski</h2>
                                    <p className="text-center p-2 text-neutral-600 py-2 font-normal">Frontend Development, UI/UX Design</p>

                                <p className="text-center p-2 text-neutral-600 py-2 font-normal">marinec@kth.se</p>
                                <a href="https://www.linkedin.com/in/marine-czaplinski/" className="text-center p-2 text-blue-600 py-2 font-normal">Linkedin</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            
    );
}

export default About;