export interface Chat {
    data: ChatMsg[],
}

export interface ChatMsg {
    date: String,
    user: String,
    company: String,
    msg: String,
}