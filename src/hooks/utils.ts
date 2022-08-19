import PanelWithLabel from "../types/panel";

export const flatten = ((panels: PanelWithLabel[]) => panels
    .map(({panel, label}) => [panel, label])
    .reduce((prev, current) => prev.concat(current))
)