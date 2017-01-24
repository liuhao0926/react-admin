class Loader {
    require(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;
        if (document.getElementById('amap-script')) {
            return callback.call();
        }
        for (let i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    }
    loaded() {
        this.loadCount++;
        if (this.loadCount === this.totalRequired
            && typeof this.callback === 'function') {
            this.callback.call();
        }
    }
    writeScript(src, id) {
        const self = this;
        const head = document.getElementsByTagName('head')[0];
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = src;
        s.id = id || 'amap-script';
        s.addEventListener('load', () => {
            self.loaded();
        }, false);
        head.appendChild(s);
    }
}
module.exports = new Loader;