import Block from '../../common/base-block/block';
import template from './sign-in.hbs';
import { SubmitButton } from '../../common/components/submit-button/submit-button';
import { LabeledInput } from '../../common/components/labeled-input/labeled-input';
import { FormProps } from '../../common/models/form-props';
import { loginValidation, passwordValidation } from '../../utils/consts/validation-regexp';

export class SignInPage extends Block {
    constructor(props: FormProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.children.proceedButton = new SubmitButton({
            label: 'proceed',
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

        this.element.querySelector('[name="login"]').addEventListener('focus', () => {
            const { loginValid } = { ...this.getFormValidationStatuses() };
            console.log({ loginValid });
        });

        this.element.querySelector('[name="password"]').addEventListener('focus', () => {
            const { passwordValid } = { ...this.getFormValidationStatuses() };
            console.log({ passwordValid });
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    getFormValidationStatuses(): { loginValid: boolean; passwordValid: boolean; } {
        return {
            loginValid: loginValidation.test((this.element.querySelector('[name="login"]') as HTMLInputElement).value),
            passwordValid: passwordValidation.test((this.element.querySelector('[name="password"]') as HTMLInputElement).value),
        }
    }

    getFormValues(): { login: string; password: string; } {
        return {
            login: (this.element.querySelector('[name="login"]') as HTMLInputElement).value,
            password: (this.element.querySelector('[name="password"]') as HTMLInputElement).value,
        }
    }
}
