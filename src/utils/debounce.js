export default function debounce(func, wait, immediate) {
    let timeout;
    return {
        create() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        },
        clear() {
            window.clearTimeout(timeout);
        }
    };
}