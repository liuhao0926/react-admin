import './login.less';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'UI';
const FormItem = Form.Item;
import { bindActionCreators } from 'redux';
import { userLogin } from 'actions';

// import { BUSINESS_MODES } from 'config/business.config';
// import CarouselBox from 'components/CarouselBox';
// import { StorageService } from '../../utils';


class LoginPage extends Component {
    static propTypes = {
        userLogin: PropTypes.func.isRequired,
        userAccount: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };
    constructor() {
        super();
        this.state = {
            userName: {
                validateStatus: '',
                help: '',
                errorText: '请输入正确的3-16字符用户名',
                validRule: /^[a-zA-Z0-9_]{3,16}$/,
                value: '',
                name: 'userName'
            },
            userPass: {
                validateStatus: '',
                help: '',
                errorText: '用户密码至少为6位字符',
                validRule: /^.{6,}$/,
                value: '',
                name: 'userPass'
            },
            validForm: true
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleUserPassChange = this.handleUserPassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit() {
        // console.log('submit');
        const data = {};
        data.userName = this.state.userName.value;
        data.userPass = this.state.userPass.value;
        if (!data.userName || !data.userPass) {
            this.setState({
                validForm: false
            });
            return;
        }
        this.props.userLogin(data);
        this.props.router.push('/');
        // console.log(this.props.router);
    }
    handleUserNameChange(e) {
        const origin = Object.assign({}, this.state.userName);
        origin.value = e.target.value;
        if (!origin.value || !/^[a-zA-Z0-9_]{3,16}$/.test(origin.value)) {
            origin.validateStatus = 'error';
            origin.help = origin.errorText;
        } else {
            origin.validateStatus = '';
            origin.help = '';
        }
        this.setState({
            userName: origin
        });
    }
    handleUserPassChange(e) {
        const origin = Object.assign({}, this.state.userPass);
        origin.value = e.target.value;
        if (!origin.value || !/^.{6,}$/.test(origin.value)) {
            origin.validateStatus = 'error';
            origin.help = origin.errorText;
        } else {
            origin.validateStatus = '';
            origin.help = '';
        }
        this.setState({
            userPass: origin
        });
    }
    // _validate(fields) {
    //     if ($$.isObject(fields)) {
    //         fields = [fields];
    //     }
    //     fields.map((item, idx) => {
    //         if (!item.value || !item.validRule.test(item.value)) {
    //             item.
    //         }
    //     });
    // }
    render() {
        return (
            <div>
                <Form className="login-form">
                    <Alert
                        message="请输入完整信息"
                        type="error"
                        showIcon
                        style={{ display: this.state.validForm ? 'none' : '' }}
                    />
                    <FormItem
                        validateStatus={this.state.userName.validateStatus}
                        help={this.state.userName.help}
                    >
                        <Input 
                            addonBefore={<Icon type="user" />}
                            placeholder="用户名"
                            defaultValue={this.state.userName.value}
                            onBlur={this.handleUserNameChange}
                        />
                    </FormItem>
                    <FormItem
                        validateStatus={this.state.userPass.validateStatus}
                        help={this.state.userPass.help}
                    >
                        <Input addonBefore={<Icon type="lock" />}
                            type="password"
                            placeholder="密码"
                            defaultValue={this.state.userPass.value}
                            onBlur={this.handleUserPassChange}
                        />
                    </FormItem>
                    <FormItem>
                        <Checkbox>记住账号</Checkbox>
                        <a className="login-form-forgot">忘记密码？</a>
                        <Button type="primary"
                            htmlType="button"
                            className="login-form-button"
                            onClick={this.handleSubmit}
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
module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginPage);