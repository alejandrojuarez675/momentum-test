export interface MenuNode {
    option: Number;
    title: String;
}

export interface Menu {
    data: MenuNode[];
}


export const MENU = {
    data: [
        {
            option: 1,
            title: "Generate call transcripts",
        },
        {
            option: 2,
            title: "List existing call transcripts",
        },
        {
            option: 3,
            title: "Summarized call transcript"
        },
        {
            option: 4,
            title: "Ask a question"
        }
    ]
}