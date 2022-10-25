// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateLength = (v:any,min:number,max:number) => {
  const length = v.toString().length;
  return length >= min && length <= max;
}
