const Navbar = () => {

    return (
        <div className="nav">
            <ul>
                <li>
                    <a className="active" href="/">
                        TEXT POSTERIZER
                    </a>
                </li>
                <li className="about">
                    <a href="/About">About</a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;