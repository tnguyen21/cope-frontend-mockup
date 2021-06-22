import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return(
        <header>
            <nav>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/test">Test</NavLink>
                <NavLink to="/nested/route">Nested Link</NavLink>
            </nav>
        </header>
    )
}

export default Header;