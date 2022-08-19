import { RefObject } from "react"

type PanelWithLabel = {
    panel: RefObject<HTMLDivElement>,
    label: RefObject<HTMLDivElement>
}

export default PanelWithLabel;