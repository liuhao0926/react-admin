// import './styles';
import './utils/public-utils';
import Root from './core/containers/Root';

const rootElement = document.getElementById('app-root');
ReactDOM.render(<Root />, rootElement);

// only dev server
if (module.hot && __MOCK__) {
    module.hot.accept();
    module.hot.dispose(() => {
        document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
            const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
            link.href = nextStyleHref;
        });
    });
}


