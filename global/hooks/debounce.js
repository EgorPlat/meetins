export function debounce(fn, time){
    let timeout;
    return function(){
       const fnCall = () => {fn.apply(this, arguments)}
       clearTimeout(timeout);
       timeout = setTimeout(fnCall, time);
    };
}