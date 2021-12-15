type Rule = {
  message: string;
  required?: boolean;
  trigger?: string;
  type?: string;
}

type Form = {
  id?: string;
  name: string;
  description: string;
  image: string;
  muscles: string[];
}

export type DialogDataType = {
  form: Form;
  rules: {[key:string]: Rule[]}
}
