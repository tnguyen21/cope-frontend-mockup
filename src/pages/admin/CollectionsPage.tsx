import React from "react"
import Collections from "../../components/Collections"

interface QueryParams {
    type: string
}

export const CollectionsPage = ({ data }: { data: QueryParams }) => {
    return (
        <div>
            <Collections type={data ? data.type : null} />
        </div>
    )
}
