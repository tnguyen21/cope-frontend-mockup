import React from "react"
import { Link, Header } from "../components"

export const Chrome = ({ children }) => {
    return (
        <div>
            <div
                style={{
                    minHeight: "100vh",
                    //overflow: "hidden",
                }}
            >
                <div style={{ minHeight: "100vh" }}>
                    <Header />
                    <ul>
                        <Link to="page1">page1</Link>
                        <Link to="page2">page2</Link>
                        <Link to="page3">page3</Link>
                        <Link to="admin/collections">page3</Link>
                    </ul>
                    <div
                        style={{
                            padding: "0 24px",
                            minHeight: 280,
                            overflow: "hidden",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                ©2021 US Census Bureau Civic Digital Fellows Team: Tommy Nguyen | Logan Powell
            </div>
        </div>
    )
}
