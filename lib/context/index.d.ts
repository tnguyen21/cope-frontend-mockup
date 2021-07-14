export function Pre({ data }: {
    data: any;
}): JSX.Element;
export const CTX: React.Context<{
    run$: import("@thi.ng/rstream").PubSub<any, any, any>;
    useCursor: any;
    $store$: import("@thi.ng/atom").Atom<{
        $$_PATH: any[];
        $$_LOAD: boolean;
        $$_VIEW: any;
        $$_ROOT: any;
    }>;
    parse: any;
    DefaultView: ({ data }: {
        data: any;
    }) => JSX.Element;
}>;
import React from "react";
