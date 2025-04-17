export const calculateRatingFilm = (rating:number): { color: string; num: string }=>{
  let color: string = '';
  let num: string = '';

  if (rating === 10) {
    color = '#308e21';
    num = rating.toFixed(0);
  } else if (rating >= 8) {
    color = '#308e21';
    num = rating.toFixed(1);
  } else if (rating >= 6) {
    color = '#afab0e';
    num = rating.toFixed(1);
  } else {
    color = '#ff0000';
    num = rating.toFixed(1);
  }

  return { color, num };
}
