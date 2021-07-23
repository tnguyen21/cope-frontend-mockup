import React from "react"
import { Card } from "antd"
const { Meta } = Card

export const Gems = ({ data }) => {
    console.log("Gems data:",  data )
    const items = data
    return <div style={{ display: "flex"}}>
        {items.map((item, idx) => {
            /*
            
          "id": "bd5492a9-8a19-4446-8cc6-d5d7847324da",
          "type": "A_GEM",
          "assets": {
            "items": [
              {
                "type": "T_BODY",
                "name": "Body",
                "content": "Some sample markdown content!\n\\n# Heading 1\n\\n## Heading 2\n\\n### Heading 3\n\\nthis is some code but it's not really being rendered as code i wonder why\n\\nBut it's not being rendered correctly! Oh no!\n\\\nRandom image example\n\",
                "index": 1
              },
              {
                "type": "T_OG_TITLE",
                "name": "Title",
                "content": "Example Title",
                "index": 0
              },
              {
                "type": "A_VIDEO",
                "name": "Video",
                "content": "https://youtu.be/RSdqooZIRwI",
                "index": 2
              }
            ]
          }
          */
          
          const assets = item?.assets?.items
          if(!assets.length) return null
          console.log({assets})
          const { cover, title, body } = assets.reduce((a, c) => {
              const { type, name, content } = c
              switch(type){
                  case "T_BODY": 
                      return (a.body = content, a)
                  case "A_VIDEO":{
                      const parts = content.split("/")
                      const id = parts[parts.length - 1]
                      return (a.cover = `https://img.youtube.com/vi/${id}/1.jpg`, a)
                  }
                  case "A_IMAGE":
                      return (a.cover = content, a)
                  case "T_OG_TITLE":
                      return (a.title = content, a)
                  default:
                      return a
              }
          }, { cover: null, title: null , body: null })

          return <Card
              key={idx}
              hoverable
              style={{ width: 240, margin: '1rem', alignSelf: "flex-start"}}
              cover={<img alt={title} src={cover} />}
            >
              <Meta title={title} description={body} />
            </Card>
        })}
    </div>
}