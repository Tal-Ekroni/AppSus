const { Link } = ReactRouterDOM;
export function Home() {
    return (
        <section className="home">
            <h1>Welcome to AppSus</h1>
            <h2>Check out our different features!</h2>
            <div className="flex home-links">
                <Link to="/book"></Link>
                <Link to="/emails"></Link>
                <Link to="/keep"></Link>
            </div>

        </section>
    )
}