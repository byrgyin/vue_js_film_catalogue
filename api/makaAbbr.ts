interface Person {
  name: string;
  surname: string;
}
export const makaAbbr = (obj:Person):string=>{
  return `${obj.name[0]}${obj.surname[0]}`;
}
