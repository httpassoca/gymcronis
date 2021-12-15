type Rule = {
  message: string;
  required?: boolean;
  trigger?: string;
  type?: string;
}

type Form = {
  authorId?: string;
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
