import React, { useContext } from "react"
import { Breadcrumb } from "antd"
import { CTX } from "../context"
export const Breadcrumbs = () => {
    const { parse } = useContext(CTX)
    const { URL_PATH } = parse()
    console.log({ URL_PATH })
    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            {URL_PATH.map((crumb, i) => <Breadcrumb.Item key={i}>{crumb}</Breadcrumb.Item>)}
        </Breadcrumb>
    )
}
