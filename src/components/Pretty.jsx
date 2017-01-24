import { Component, PropTypes } from 'react';

class Pretty extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.handleToggle = this.handleToggle.bind(this);
    }
    state = {
        show: true
    }
    handleToggle() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <div className="debuger">
                <div className="debuger-header" onClick={this.handleToggle}>
                    <strong>Debug</strong>
                </div>
                {(this.state.show ? <pre>{JSON.stringify(this.props.data, null, 2)}</pre> : false)}
            </div>
        );
    }

}
export default Pretty;
