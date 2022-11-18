import Block, { Props } from '../../common/base-block/block';
import template from './sign-up.hbs';
import { SubmitButton } from '../../common/components/submit-button/submit-button';
import { LabeledInput, LabeledInputProps } from '../../common/components/labeled-input/labeled-input';
import { emailValidation, loginValidation, nameValidation, passwordValidation, phoneValidation } from '../../utils/consts/validation-regexp';

export class SignUpPage extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    init() {
        super.init();
        this.children.signUpButton = new SubmitButton({
            label: 'sign up',
            events: {
                click: () => {
                    console.log(this.getFormValues());
                    console.log(this.getFormValidationStatuses());
                    this.addValidationTextOnButtonClick();
                },
            },
        });
        (this.props.inputsData as Array<LabeledInputProps>).forEach((input: LabeledInputProps) => {
            this.children[(input.name as string)] = new LabeledInput(input);
        });
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
            firstNameValid: nameValidation.test((this.element!.querySelector('[name="first_name"]') as HTMLInputElement).value),
            secondNameValid: nameValidation.test((this.element!.querySelector('[name="second_name"]') as HTMLInputElement).value),
            loginValid: loginValidation.test((this.element!.querySelector('[name="login"]') as HTMLInputElement).value),
            passwordValid: passwordValidation.test((this.element!.querySelector('[name="password"]') as HTMLInputElement).value),
            emailValid: emailValidation.test((this.element!.querySelector('[name="email"]') as HTMLInputElement).value),
            phoneValid: phoneValidation.test((this.element!.querySelector('[name="phone"]') as HTMLInputElement).value),
        }
    }

    getFormValues(): {
        firstName: string;
        secondName: string;
        login: string;
        password: string;
        email: string;
        phone: string;
    } {
        return {
            firstName: (this.element!.querySelector('[name="first_name"]') as HTMLInputElement).value,
            secondName: (this.element!.querySelector('[name="second_name"]') as HTMLInputElement).value,
            login: (this.element!.querySelector('[name="login"]') as HTMLInputElement).value,
            password: (this.element!.querySelector('[name="password"]') as HTMLInputElement).value,
            email: (this.element!.querySelector('[name="email"]') as HTMLInputElement).value,
            phone: (this.element!.querySelector('[name="phone"]') as HTMLInputElement).value,
        }
    }

    addValidationText(element: HTMLElement) {
        if (element.childNodes.length < 5) {
            element.appendChild(document.createTextNode('invalid'));
        }
    }

    addValidationTextOnButtonClick() {
        const {
            firstNameValid,
            secondNameValid,
            loginValid,
            passwordValid,
            emailValid,
            phoneValid,
        } = {...this.getFormValidationStatuses()};
        if (!firstNameValid) {
            this.addValidationText(this.element!.querySelector('[name="first_name"]')!.parentElement!)
        }
        if (!secondNameValid) {
            this.addValidationText(this.element!.querySelector('[name="second_name"]')!.parentElement!)
        }
        if (!loginValid) {
            this.addValidationText(this.element!.querySelector('[name="login"]')!.parentElement!)
        }
        if (!passwordValid) {
            this.addValidationText(this.element!.querySelector('[name="password"]')!.parentElement!)
        }
        if (!emailValid) {
            this.addValidationText(this.element!.querySelector('[name="email"]')!.parentElement!)
        }
        if (!phoneValid) {
            this.addValidationText(this.element!.querySelector('[name="phone"]')!.parentElement!)
        }
    }
}
