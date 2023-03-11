import React from 'react';
import styles from './styles.module.css';
import AboutUs from './AboutUs.svg';

function About() {
    return (
        <div>
            <div className="about-section">
                <h1 className={styles.mheader}>About Us</h1>
                <div className="column" style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: '0 auto', height: '20vh'}}>
                <p className={styles.text}>Welcome to Viserzice, the visualization of workout exercises to help you find new ways of training. We intend to allow the user to target muscles and muscles groups of interest, filter depending on equipment, type of strength and mechanic but also choose exercises depending on its own level (Beginner, Intermediate and Expert). Selecting a few exercises allows the user to see the muscles targeted on the body heat map and in how many selected exercises each muscle appears. We intend to help beginners and more experienced person when it comes to workout to discover new exercises and visualize more information about a potential workout routine.This project is part of the course Information Visualization in KTH, Stockholm.</p>
                    <p className={styles.text} style={{ marginBottom: '1em' }}>.</p>
                    </div>
            </div>

            <h2 className={styles.header}>Our Team</h2>

            <div className="row" style={{ textAlign: 'center' }}>
                <div className="column" style={{ display: 'inline-block', width: '16%', alignItems: 'center' }}>
                    <div className="card">
                        <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                            <h2 className={styles.text}>Carter Smith</h2>
                            <p className={styles.text}>Data Collection and Processing, Frontend Development, User test</p>
                            
                            <p className={styles.text}>carters@kth.se</p>
                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '16%', alignItems: 'center' }}>
                    <div className="card">
                        <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                            <h2 className={styles.text}>Ernest Umeh</h2>
                            <p className={styles.text}>Data Collection and Processing, Backend Development, Frontend Development, User test</p>
                            
                            <p className={styles.text}>umeh@kth.se</p>
                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '16%', alignItems: 'center' }}>
                    <div className="card">
                        <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                            <h2 className={styles.text}>Mohammed Qasim</h2>
                            <p className={styles.text}>Data Collection and Processing, Backend Development, Frontend Development, User test</p>
                            
                            <p className={styles.text}>msyqasim@kth.se</p>
                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '16%', alignItems: 'center' }}>
                    <div className="card">
                        <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                            <h2 className={styles.text}>Mans Nyman</h2>
                            <p className={styles.text}>Data Collection and Processing, Backend Development, Frontend Development, UI/UX Design, User test</p>
                            
                            <p className={styles.text}>mansnym@kth.se</p>

                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '16%', alignItems: 'center' }}>
                    <div className="card">
                        <div className="container" style={{ marginBottom: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>

                            <h2 className={styles.text}>Marine Czaplinski</h2>
                            <p className={styles.text}>Frontend Development, UI/UX Design, User test</p>
                            
                            <p className={styles.text}>marinec@kth.se</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;