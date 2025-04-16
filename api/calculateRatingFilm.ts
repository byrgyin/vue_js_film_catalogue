export const calculateRatingFilm = (rating:number):string =>{
  let color:string = '',
    num:number = 0;
  if(rating === 10){
    color = `#308e21`;
    num = rating.toFixed(0);
    return {
      color,
      num
    };
  }
  if(rating >= 8){
    color = `#308e21`;
    num = rating.toFixed(1);
    return {
      color,
      num
    };
  }
  if(rating >= 6) {
    color = `#afab0e`;
    num = rating.toFixed(1);
    return {
      color,
      num
    };
  }
  if(rating <= 5.9){
    color = `#ff0000`;
    num = rating.toFixed(1);
    return {
      color,
      num
    };
  }
}
