import Block from '../../common/base-block/block';
import template from './home.hbs';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';
import { ProfilePage } from '../profile/profile';
import { InputType } from '../../common/components/labeled-input/labeled-input';
import { ErrorPage } from '../error/error';
import { ChatPage } from '../chat/chat';


export class HomePage extends Block {

    componentDidMount() {
        const pageContainer = document.querySelector('#container');
        const pages = {
            signIn: {
                button: document.querySelector('#sign-in'),
                page: new SignInPage({
                    inputsData: [
                        {
                            label: 'login',
                            name: 'login',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'password',
                            name: 'password',
                            value: null,
                            type: InputType.TEXT,
                        },
                    ],
                }),
            },
            signUp: {
                button: document.querySelector('#sign-up'),
                page: new SignUpPage({
                    inputsData: [
                        {
                            label: 'first name',
                            name: 'first_name',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'second name',
                            name: 'second_name',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'login',
                            name: 'login',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'password',
                            name: 'password',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'email',
                            name: 'email',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'phone',
                            name: 'phone',
                            value: null,
                            type: InputType.TEXT,
                        },
                    ],
                }),
            },
            profile: {
                button: document.querySelector('#profile'),
                page: new ProfilePage({
                    inputsData: [
                        //TODO:
                        {
                            label: 'change<br>picture',
                            name: 'avatar',
                            value: null,
                            type: InputType.IMAGE,
                        },
                        {
                            label: 'display name',
                            name: 'display_name',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'first name',
                            name: 'first_name',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'second name',
                            name: 'second_name',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'login',
                            name: 'login',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'password',
                            name: 'password',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'email',
                            name: 'email',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'phone',
                            name: 'phone',
                            value: null,
                            type: InputType.TEXT,
                        },

                        {
                            label: 'old password',
                            name: 'oldPassword',
                            value: null,
                            type: InputType.TEXT,
                        },
                        {
                            label: 'new password',
                            name: 'newPassword',
                            value: null,
                            type: InputType.TEXT,
                        },
                    ],
                }),
            },
            error404: {
                button: document.querySelector('#error404'),
                page: new ErrorPage({
                    code: '404',
                }),
            },
            error500: {
                button: document.querySelector('#error500'),
                page: new ErrorPage({
                    code: '500',
                }),
            },
            chat: {
                button: document.querySelector('#chat'),
                page: new ChatPage({code: 'some'}),
            }
            // profile: {
            //     button: document.querySelector('#profile'),
            //     template: profileTmpl,
            //     data: {},
            // },
            // error404: {
            //     button: document.querySelector('#error404'),
            //     template: errorTmpl,
            //     data: {
            //         code: '404'
            //     },
            // },
            // error500: {
            //     button: document.querySelector('#error500'),
            //     template: errorTmpl,
            //     data: {
            //         code: '500'
            //     },
            // },
            // chat: {
            //     button: document.querySelector('#chat'),
            //     template: chatTmpl,
            //     data: {},
            // },
        }

        //console.log(pages.signIn.data);

        Object.keys(pages).forEach(key => {
            pages[key].button.addEventListener('click', () => {
                pageContainer.innerHTML = '';
                pageContainer.append(pages[key].page.getContent()!)
                pages[key].page.dispatchComponentDidMount();
                //pageContainer.innerHTML = Handlebars.compile(pages[key].template)(pages[key].data);
            });
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
