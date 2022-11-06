import Block from '../../common/base-block/block';
import template from './home.hbs';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';
import { ProfilePage } from '../profile/profile';
import { InputType } from '../../common/components/labeled-input/labeled-input';
import { ErrorPage } from '../error/error';
import { ChatPage } from '../chat/chat';
import { FormInputName } from '../../common/enums/form-input-name.enum';


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
                            input: {
                                name: FormInputName.LOGIN,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'password',
                            input: {
                                name: FormInputName.PASSWORD,
                                value: '',
                                type: InputType.TEXT,
                            },
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
                            name: FormInputName.FIRST_NAME,
                            input: {
                                name: FormInputName.FIRST_NAME,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'second name',
                            name: FormInputName.SECOND_NAME,
                            input: {
                                name: FormInputName.SECOND_NAME,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'login',
                            name: FormInputName.LOGIN,
                            input: {
                                name: FormInputName.LOGIN,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'password',
                            name: FormInputName.PASSWORD,
                            input: {
                                name: FormInputName.PASSWORD,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'email',
                            name: FormInputName.EMAIL,
                            input: {
                                name: FormInputName.EMAIL,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'phone',
                            name: FormInputName.PHONE,
                            input: {
                                name: FormInputName.PHONE,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                    ],
                }),
            },
            profile: {
                button: document.querySelector('#profile'),
                page: new ProfilePage({
                    inputsData: [
                        {
                            label: 'change<br>picture',
                            name: FormInputName.AVATAR,
                            input: {
                                name: FormInputName.AVATAR,
                                value: '',
                                type: InputType.IMAGE,
                            },
                        },
                        {
                            label: 'display name',
                            name: FormInputName.DISPLAY_NAME,
                            input: {
                                name: FormInputName.DISPLAY_NAME,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'first name',
                            name: FormInputName.FIRST_NAME,
                            input: {
                                name: FormInputName.FIRST_NAME,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'second name',
                            name: FormInputName.SECOND_NAME,
                            input: {
                                name: FormInputName.SECOND_NAME,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'login',
                            name: FormInputName.LOGIN,
                            input: {
                                name: FormInputName.LOGIN,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'password',
                            name: FormInputName.PASSWORD,
                            input: {
                                name: FormInputName.PASSWORD,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'email',
                            name: FormInputName.EMAIL,
                            input: {
                                name: FormInputName.EMAIL,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'phone',
                            name: FormInputName.PHONE,
                            input: {
                                name: FormInputName.PHONE,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },

                        {
                            label: 'old password',
                            name: FormInputName.OLD_PASSWORD,
                            input: {
                                name: FormInputName.OLD_PASSWORD,
                                value: '',
                                type: InputType.TEXT,
                            },
                        },
                        {
                            label: 'new password',
                            name: FormInputName.NEW_PASSWORD,
                            input: {
                                name: FormInputName.NEW_PASSWORD,
                                value: '',
                                type: InputType.TEXT,
                            },
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
        }

        Object.keys(pages).forEach((key: string) => {
            // TODO: remove pages on third sprint
            // @ts-ignore
            pages[key].button.addEventListener('click', () => {
                pageContainer!.innerHTML = '';
                // @ts-ignore
                pageContainer!.append(pages[key].page.getContent()!)
                // @ts-ignore
                pages[key].page.dispatchComponentDidMount();
            });
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
