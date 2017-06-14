import './login.less';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'UI';
const FormItem = Form.Item;
import { bindActionCreators } from 'redux';
import { userLogin } from 'actions';

// import { BUSINESS_MODES } from 'config/business.config';
// import CarouselBox from 'components/CarouselBox';
// import { StorageService } from '../../utils';

const rules = {
    userName: {
        rules: [{ required: true, message: '请输入用户名!' }]
    },
    password: {
        rules: [
            { required: true, message: '请输入密码!' },
            { pattern: /^.{6,}$/, message: '密码最少为6位字符!' }
        ]
    }
};

class LoginPage extends Component {
    static propTypes = {
        userLogin: PropTypes.func,
        userAccount: PropTypes.object,
        router: PropTypes.object,
        form: PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            spnLoading: false
        };
    }
    componentDidMount() {
        if (this.props.userAccount.loggedIn) {
            this.props.router.push('/');
        }
    }
    componentWillReceiveProps() {
    }
    // shouldComponentUpdate() {
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.postFormData(values);
                this.props.userLogin(values);
            }
        });
        this.props.router.push('/');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-page">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem hasFeedback>
                        {getFieldDecorator('username', rules.userName)(
                            <Input
                                addonBefore={<Icon type="user" />}
                                placeholder="用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                        {getFieldDecorator('password', rules.password)(
                            <Input addonBefore={<Icon type="lock" />}
                                type="password"
                                placeholder="密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Checkbox>记住账号</Checkbox>
                        <a className="login-form-forgot">忘记密码？</a>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={this.state.spnLoading}
                        >
                            登录
                        </Button>
                        或者 <a>现在注册!</a>
                    </FormItem>
                </Form>
            </div>    
        );
    }
}

const mapStateToProps = state => ({ userAccount: state.userAccount });
const actions = { userLogin };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
module.exports = Form.create()(connect(mapStateToProps, mapDispatchToProps)(LoginPage));