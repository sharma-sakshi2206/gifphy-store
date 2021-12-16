export function debounce(func) {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, arguments); }, 500);
    };
} 