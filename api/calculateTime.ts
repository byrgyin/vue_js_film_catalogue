export const calculateTime = (runtime:number):string=>{
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours} h ${minutes} m`;
}
