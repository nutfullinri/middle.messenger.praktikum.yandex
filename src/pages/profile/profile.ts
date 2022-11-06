import Block from '../../common/base-block/block';
import template from './profile.hbs';
import { SubmitButton } from '../../common/components/submit-button/submit-button';
import { LabeledInput } from '../../common/components/labeled-input/labeled-input';
import { FormProps } from '../../common/models/form-props';
import { emailValidation, loginValidation, nameValidation, passwordValidation, phoneValidation } from '../../utils/consts/validation-regexp';

export class ProfilePage extends Block {
    constructor(props: FormProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.children.saveButton = new SubmitButton({
            label: 'save',
            events: {
                click: () => {
                    console.log(this.getFormValues());
                    console.log(this.getFormValidationStatuses());
                },
            },
        });
        this.props.inputsData.forEach(input => {
            this.children[input.name] = new LabeledInput(input);
        });
    }

    componentDidMount(oldProps?) {
        super.componentDidMount(oldProps);

        this.makeFormFocusSubscriptions();
    }

    render() {
        return this.compile(template, this.props);
    }

    getFormValidationStatuses(): {
        firstNameValid: boolean;
        secondNameValid: boolean;
        loginValid: boolean;
        passwordValid: boolean;
        emailValid: boolean;
        phoneValid: boolean;
    } {
        return {
            firstNameValid: nameValidation.test((this.element.querySelector('[name="first_name"]') as HTMLInputElement).value),
            secondNameValid: nameValidation.test((this.element.querySelector('[name="second_name"]') as HTMLInputElement).value),
            loginValid: loginValidation.test((this.element.querySelector('[name="login"]') as HTMLInputElement).value),
            passwordValid: passwordValidation.test((this.element.querySelector('[name="password"]') as HTMLInputElement).value),
            emailValid: emailValidation.test((this.element.querySelector('[name="email"]') as HTMLInputElement).value),
            phoneValid: phoneValidation.test((this.element.querySelector('[name="phone"]') as HTMLInputElement).value),
        }
    }

    getFormValues(): {
        avatar: string;
        displayName: string;
        firstName: string;
        secondName: string;
        login: string;
        password: string;
        email: string;
        phone: string;
    } {
        return {
            avatar: (this.element.querySelector('[name="avatar"]') as HTMLImageElement).src,
            displayName: (this.element.querySelector('[name="display_name"]') as HTMLInputElement).value,
            firstName: (this.element.querySelector('[name="first_name"]') as HTMLInputElement).value,
            secondName: (this.element.querySelector('[name="second_name"]') as HTMLInputElement).value,
            login: (this.element.querySelector('[name="login"]') as HTMLInputElement).value,
            password: (this.element.querySelector('[name="password"]') as HTMLInputElement).value,
            email: (this.element.querySelector('[name="email"]') as HTMLInputElement).value,
            phone: (this.element.querySelector('[name="phone"]') as HTMLInputElement).value,
        }
    }

    makeFormFocusSubscriptions() {
        this.element.querySelector('[name="first_name"]').addEventListener('focus', () => {
            const { firstNameValid } = { ...this.getFormValidationStatuses() };
            console.log({ firstNameValid });
        });

        this.element.querySelector('[name="second_name"]').addEventListener('focus', () => {
            const { secondNameValid } = { ...this.getFormValidationStatuses() };
            console.log({ secondNameValid });
        });

        this.element.querySelector('[name="login"]').addEventListener('focus', () => {
            const { loginValid } = { ...this.getFormValidationStatuses() };
            console.log({ loginValid });
        });

        this.element.querySelector('[name="password"]').addEventListener('focus', () => {
            const { passwordValid } = { ...this.getFormValidationStatuses() };
            console.log({ passwordValid });
        });

        this.element.querySelector('[name="email"]').addEventListener('focus', () => {
            const { emailValid } = { ...this.getFormValidationStatuses() };
            console.log({ emailValid });
        });

        this.element.querySelector('[name="phone"]').addEventListener('focus', () => {
            const { phoneValid } = { ...this.getFormValidationStatuses() };
            console.log({ phoneValid });
        });
    }
}
