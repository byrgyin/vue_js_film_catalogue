const formatMoney = (numStr:string):string=>{
  if(numStr){
    const cleanedStr = numStr.replace(/[^0-9.]/g, '');
    const parts = cleanedStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
}

export default formatMoney;
