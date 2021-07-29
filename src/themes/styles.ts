export const colors = {
    primary: "#1A304A",
}

export const baseFonts = {
    sans: "Helvetica, 'Helvetica Neue', Segoe",
    serif: "serif",
    mono: "monospace",
}
export const fonts = {
    ...baseFonts,
    body: baseFonts.sans,
    heading: baseFonts.serif,
    monospace: baseFonts.mono,
}

const heading = {
    fontFamily: fonts.heading,
    //fontWeight: ,
    //lineHeight: fonts.,
    //mt: 4
}

export const styles = {
    root: {
        fontFamily: fonts.body,
        lineHeight: "2rem",
        //  fontWeight: font.body
    },
    p: {
        lineHeight: "2rem",
    },
    //p: {
    //  lineHeight: [1.75, 2],
    //  fontSize: [2, 3],
    //  mt: [3, 4]
    //},
    a: {
        color: colors.primary,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    strong: {
        fontWeight: "bold",
    },
    ul: {
        listStylePostition: "outside",
        //  mt: 3,
        //  mx: 4
    },
    li: {
        //listStyleType: "disc",
        lineHeight: 1.75,
        //  fontSize: [2, 3],
        //  mt: 3
    },
    h1: {
        ...heading,
        padding: "1rem 0",
        //  fontSize: [6, 7],
        //  mt: 6
    },
    h2: {
        ...heading,
        //  fontSize: [5, 6],
        //  pt: 5
    },
    h3: {
        ...heading,
        //  fontSize: [4, 5],
        //  pt: 4
    },
    h4: {
        ...heading,
        //  fontSize: [3, 4],
        //  pt: 4
    },
    h5: {
        ...heading,
        //  fontSize: [2, 3]
    },
    h6: {
        ...heading,
        //  fontSize: [1, 2]
    },
    pre: {
        lineHeight: 1.75,
        //  my: 4,
        //  mx: -2
    },
    code: {
        margin: "1rem",
        boxShadow: "inner",
        color: "dark",
        fontSize: [ 0, 1 ],
        fontFamily: fonts.mono,
        borderRadius: "default",
        //  p: 1
    },
    hr: {
        height: 1,
        width: "100vw",
        position: "relative",
        marginLeft: "-50vw",
        //  mt: 6,
        left: "50%",
    },
    blockquote: {
        padding: "1rem 0",
        fontFamily: "mono",
        fontStyle: "italic",
        //  fontSize: [3, 4],
        //  lineHeight: 1.5,
        //  mx: -4,
        //  my: 4,
        //  p: 5
    },
    table: {
        borderRadius: "default",
        overflow: "hidden",
        //  fontSize: [1, 2],
        width: "100%",
        //  mt: 4
    },
    tr: {
        backgroundColor: "muted",
        "&:first-child": {
            fontWeight: "bold",
            backgroundColor: "dark",
            color: "muted",
        },
        //  "lineHeight": [1.75, 2],
        "&:nth-child(2n)": {
            backgroundColor: "background",
        },
    },
    td: {
        //  p: 2
    },
    img: {
        display: "block",
        //  my: [2, 3],
        width: "100%",
        maxHeight: "500px",
        objectFit: "cover",
        borderRadius: "default",
    },
}
