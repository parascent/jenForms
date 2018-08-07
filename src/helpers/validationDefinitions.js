import {required} from 'vuelidate/lib/validators'

export default function(){
  return {
    'min-length':minLength,
    'max-length':maxLength,
    'required':required,
  }
}

var minLength = function (length ) {
  var length = length
  return function(string){
    return string.length > length ? true : "Minimum length should be "+length
  }
}

var maxLength = function (length , string) {
  var length = length
  return function(string){
    return string.length < length ? true : "Maxmimum length should be "+length
  }
}


