const crypto = require('crypto-js')
// const FormData = require('form-data')

// type StringObject = {[key:string]:string | number | boolean};
function ksort(obj){
    let sorted = {};
    const keys = Object.keys(obj);
    keys.sort();
    keys.forEach(key => {
      sorted[key] = obj[key];
    });
    return sorted;
}

function sign(value, key) {
    const paramsArray = [];
    const ksortValue = ksort(value);
    Object.keys(ksortValue).forEach(key => paramsArray.push(key + '=' + ksortValue[key]));
    const str = paramsArray.join('&');
    console.log(str, key)
    const md5Value = crypto.HmacMD5(str, key).toString();
    return md5Value;
}

function environment () {
    const overallGlobal =
    typeof globalThis !== 'undefined' &&  typeof globalThis.window === 'undefined' ? 
        {   
            environment:'node',
            ...globalThis
        }
    : 
    typeof window !== 'undefined' ? 
        {
            environment:'web',
            ...window
        } 
    : 
    typeof global !== 'undefined' ? 
        {
            environment:'node',
            ...global
        } 
    : 
    typeof self !== 'undefined' ? 
        {
            environment:'web',
            ...self
        } 
    : 
        {
            environment:'null',
        }
    ;
    return overallGlobal
}

async function formDataHandle (
    obj,
    file,
) {
    if(environment().environment === 'web'){
        const formData = new FormData()
        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })
        try{
            formData.append('file', file)
        }catch (err) {
            return {
                data: 0,
                headers: {}
            }
        }
        return {
            data: formData,
            headers: {}
        }
    }else if(environment().environment === 'node'){
        const formData = new FormData()
        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })
        try{
            formData.append('file', file)
        }catch (err) {
            return {
                data: 0,
                headers: {}
            }
        }
        return {
            data: formData,
            headers: {
                ...formData.getHeaders()
            }
        }
    }
    return {
        data: 0,
        headers: {}
    }
}

module.exports = {
  sign,
  ksort,
  // StringObject,
  formDataHandle,
  environment
}