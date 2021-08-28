const { NavLink, Route } = ReactRouterDOM




export function About() {



    return (
        <section className="about">
            <strong>We are all about the sauce</strong>
            <p>Meet out team</p>
            <div className="cards">

                <div className="team-card">
                    <img src="../../css/assests/imgs/lior.PNG" className="about-img" />
                    <div className="card-info">
                        <h4>Lior leizerovitch</h4>
                        <p>Up and coming programmer striving to learn new techniches and grow in the programming world.</p>
                        <div className="socials">
                            <a className="linked" href="https://github.com/LiorLe97"></a>
                            <a className="git" href="https://www.instagram.com/liorleizerovich/"></a>
                            <a className="face" href="https://www.facebook.com/lior.lezerovich/"></a>
                        </div>
                    </div>
                </div>
                <div className="team-card">
                    <img src="../../css/assests/imgs/tal.jpeg" className="about-img" />
                    <div className="card-info">
                        <h4>Tal Ekroni</h4>
                        <p>Im 24 years old, New fullstack developer whos allways excited for new technologies! </p>
                        <div className="socials">
                            <a className="linked" href="https://github.com/Tal-Ekroni"></a>
                            <a className="git" href="https://www.instagram.com/tal_ekroni/"></a>
                            <a className="face" href="https://www.facebook.com/Ekroni"></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // <section>


        // </section>
    )
}
