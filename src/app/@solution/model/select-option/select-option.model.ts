export class SelectOptionModel<T> {
  constructor(text, value, title, extra = null) {
    this.text = text;
    this.value = value;
    this.title = title;
    this.extraData = extra;
  }
  text: string;
  title?: string;
  value: T;
  disabled?: boolean;
  extraData?: any;
}

export class SelectItem {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
  text: string;
  value: any
}
