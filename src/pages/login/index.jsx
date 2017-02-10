import './login.less';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'UI';
const FormItem = Form.Item;
// import { bindActionCreators } from 'redux';
// import { fetchBusinessMode } from 'actions';

// import { BUSINESS_MODES } from 'config/business.config';
// import CarouselBox from 'components/CarouselBox';
// import { StorageService } from '../../utils';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {};
        // this.handleSelectMode = this.handleSelectMode.bind(this);
    }
    componentDidMount() {
    }
    componentWillReceiveProps() {
    }
    
    shouldComponentUpdate() {
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                    </FormItem>
                    <FormItem>
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a>register now!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// const mapStateToProps = state => ({ cityStore: state.cityStore, userAccount: state.userAccount });
// const actions = { fetchBusinessMode };
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = connect()(LoginPage);