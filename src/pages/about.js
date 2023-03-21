import React from 'react';

function About() {
    return (
        <div>
            <div className="about-section">
                <h1 className="text-2xl font-bold mb-2" style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center" }}>About Us</h1>
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