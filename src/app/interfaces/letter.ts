export interface ILetter {
  _id: string;
  mailbox: string;
  subject: string;
  body: string;
  to: string;
  _checked: boolean;
}

export class Letter implements ILetter {
  constructor (
    public _id = '',
    public mailbox = '',
    public subject = '',
    public body = '',
    public to = '',
    public _checked = false,
  ) { }
}
