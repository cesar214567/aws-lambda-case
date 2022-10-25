export const validateMinMaxNumber = (number:string,min:number,max:number) => {
  const realNumber = parseInt(number);
  return realNumber >= min && realNumber <= max;
}
