import React from 'react';
import styles from './styles.module.css';

function About() {
    return (
        <div>
            <div className="about-section">
                <h1 className={styles.mheader}>About Us Page</h1>
                <p className={styles.text}>Some text about who we are and what we do.</p>
                <p className={styles.text} style={{ marginBottom: '1em' }}>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <h2 className={styles.header}>Our Team</h2>

            <div className="row" style={{ textAlign: 'center' }}>
                <div className="column" style={{ display: 'inline-block', width: '18%' }}>
                    <div className="card">
                        
                        <div className="container" style={{ marginBottom: '1em' }}>
                            <h2 className={styles.text}>Carter Smith</h2>
                            <p className={styles.text}>CEO &amp; Founder</p>
                            <p className={styles.text}>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p className={styles.text}>carters@kth.se</p>
                            
                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '18%' }}>
                    <div className="card">
                        
                        <div className="container" style={{ marginBottom: '1em' }}>
                            <h2 className={styles.text}>Ernest Umeh</h2>
                            <p className={styles.text}>Art Director</p>
                            <p className={styles.text}>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p className={styles.text}>umeh@kth.se</p>
                            
                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '18%' }}>
                    <div className="card">
                        
                        <div className="container" style={{ marginBottom: '1em' }}>
                            <h2 className={styles.text}>Mohammed Qasim</h2>
                            <p className={styles.text}>Designer</p>
                            <p className={styles.text}>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p className={styles.text}>msyqasim@kth.se</p>
                            
                        </div> 
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '18%' }}>
                    <div className="card">

                        <div className="container" style={{ marginBottom: '1em' }}>
                            <h2 className={styles.text}>Mans Nyman</h2>
                            <p className={styles.text}>Art Director</p>
                            <p className={styles.text}>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p className={styles.text}>mansnym@kth.se</p>

                        </div>
                    </div>
                </div>

                <div className="column" style={{ display: 'inline-block', width: '18%' }}>
                    <div className="card">

                        <div className="container" style={{ marginBottom: '1em' }}>
                            <h2 className={styles.text}>Marine Czaplinski</h2>
                            <p className={styles.text}>Art Director</p>
                            <p className={styles.text}>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p className={styles.text}>marinec@kth.se</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;