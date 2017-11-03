export function toThousandslsFilter(num) {
  return '30.00'
}
export function questionToString(num) {
  switch (num){
  	case 0:
  	return '问题一'
  	break;
  	case 1:
  	return '问题二'
  	break;
  	case 2:
  	return '问题三'
  	break;
  	case 3:
  	return '问题四'
  	break;
  	case 4:
  	return '问题五'
  	break;
  	case 5:
  	return '问题六'
  	break;
  	case 6:
  	return '问题七'
  	break;
  	case 7:
  	return '问题八'
  	break;
  	case 8:
  	return '问题九'
  	break;
  	case 9:
  	return '问题十'
  	break;
  	case 10:
  	return '问题十一'
  	break;
  	case 11:
  	return '问题十二'
  	break;
  	case 12:
  	return '问题十三'
  	break;
  	case 13:
  	return '问题十四'
  	break;
  	case 14:
  	return '问题十五'
  	break;
  	case 15:
  	return '问题十六'
  	break;
  	case 16:
  	return '问题十七'
  	break;
  	case 17:
  	return '问题十八'
  	break;
  	case 18:
  	return '问题十九'
  	break;
  	case 19:
  	return '问题二十'
  	break;
  }
}
export function dataForm(date){
  if(date == null || date == '' || date == 0){
    return ''
  }else{
    var d = new Date(Number(date)*1000);
    var year = d.getFullYear();
    var month = d.getMonth() + 1<10?'0' + (d.getMonth() + 1) :d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes()<10?'0' + d.getMinutes() : '' + d.getMinutes();
    var seconds = d.getSeconds()<10?'0' + d.getSeconds() : '' + d.getSeconds();;
    return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
  }
}

export function dataFormYMD(date){
  if(date == null || date == '' || date == 0){
    return ''
  }else{
    var d = new Date(Number(date)*1000);
    var year = d.getFullYear();
    var month = d.getMonth() + 1<10?'0' + (d.getMonth() + 1) :d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes()<10?'0' + d.getMinutes() : '' + d.getMinutes();
    var seconds = d.getSeconds()<10?'0' + d.getSeconds() : '' + d.getSeconds();;
    return year+ '-' + month + '-' + day
  }
}