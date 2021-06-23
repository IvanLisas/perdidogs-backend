
export interface IAddress{
    name: string,
    email: string
}

export interface IMessagge{
    to: IAddress,
    from: IAddress
    subject: string,
    body: string
}

export interface AddEmailAccount{
    addMail: (messagge: IMessagge)=>Promise<void>
}