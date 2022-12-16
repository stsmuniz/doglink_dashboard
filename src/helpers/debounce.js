const debounce = (fn, wait) => {
    let timer;
    return function(...args){
        if(timer) {
            clearTimeout(timer); // clear any pre-existing timer
        }
        const context = this; // get the current context
        timer = setTimeout(()=>{
            fn.apply(context, args); // call the function if time expires
        }, wait);
    }
}

const reloadPage = () => setTimeout(() => document.getElementById('page-preview').src += '', 500)

export default debounce;
export {reloadPage}
