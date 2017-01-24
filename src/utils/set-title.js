export default (title = '飞牛巴士') => {
    const body = document.body;
    if (document.title === title) return;
    document.title = title; // hack在微信等webview中无法修改document.title的情况
    const $iframe = document.createElement('iframe');
    $iframe.src = '/favicon.ico';
    $iframe.style.display = 'none';
    $iframe.style.position = 'absolute';
    $iframe.onload = () => {
        const timer = window.setTimeout(() => {
            $iframe.onload = null;
            body.removeChild($iframe);
            window.clearTimeout(timer);
        }, 0);
    };
    body.appendChild($iframe);
};