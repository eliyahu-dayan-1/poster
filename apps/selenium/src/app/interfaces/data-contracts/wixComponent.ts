export default interface wixComponent {
  "componentType": string,
  "type": string,
  "style": string,
  "data"?: {
    "linkList": Array<any>,
    "text": string,
    "stylesMapId": string,
    "type": string,
    "metaData": {
      "isPreset": boolean,
      "schemaVersion": string,
      "isHidden": boolean
    }
  },
  "id"?: string,
  "layout": {
    "x": number,
    "fixedPosition"?: false,
    "y": number,
    "scale"?: number,
    "height": number,
    "rotationInDegrees"?: number,
    "width": number
  },
  "skin"?: string
  "components"?: Array<wixComponent>
}

