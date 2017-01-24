import { Component, PropTypes } from 'react';
import { Icon } from 'UI';

class Price extends Component {
    static propTypes = {
        data: PropTypes.number.isRequired,
        loading: PropTypes.bool,
        onClick: PropTypes.func
    }
    renderPrice() {
        const { data: price, loading } = this.props;
        let content;
        let parsePrice = 0;
        if (!Number.isNaN(price)) {
            parsePrice = (price / 100).toFixed(2);
        }
        if (loading) {
            content = (
                <img src={require('./loading-bubbles.svg')}
                    width="64"
                    height="64"
                />
            );
        }        
        if (!loading && parsePrice > 0) { 
            content = (
                <span className="flex-middle-center">
                    <span className="text-primary text-md">¥{parsePrice}</span>
                    <Icon type="right" className="icon text-sm" onClick={this.props.onClick} />
                </span>
            );
        }
        return content;
    }
    render() {
        return (
            <div className="flex-middle-center price-tag">
                {this.renderPrice()}
            </div>
        );
    }
}
export default Price;