import Block, { Props } from '../../common/base-block/block';
import template from './sign-in.hbs';
import { SubmitButton } from '../../common/components/submit-button/submit-button';
import { loginValidation, passwordValidation } from '../../utils/consts/validation-regexp';
import { LabeledInput, LabeledInputProps } from '../../common/components/labeled-input/labeled-input';
import { FormInputName } from '../../common/enums/form-input-name.enum';

export class SignInPage extends Block {
    constructor(props: Props) {
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
                    this.addValidationTextOnButtonClick();
                },
            },
        });
        (this.props.inputsData as Array<LabeledInputProps>).forEach((input: LabeledInputProps) => {
            this.children[input.label] = new LabeledInput(input);
        });
    }

    render() {
        return this.compile(template, this.props);
    }

    getFormValidationStatuses(): { loginValid: boolean; passwordValid: boolean; } {
        return {
            loginValid: loginValidation.test((this.element!.querySelector(`[name="${FormInputName.LOGIN}"]`) as HTMLInputElement).value),
            passwordValid: passwordValidation.test((this.element!.querySelector(`[name="${FormInputName.PASSWORD}"]`) as HTMLInputElement).value),
        }
    }

    getFormValues(): { login: string; password: string; } {
        return {
            login: (this.element!.querySelector(`[name="${FormInputName.LOGIN}"]`) as HTMLInputElement).value,
            password: (this.element!.querySelector(`[name="${FormInputName.PASSWORD}"]`) as HTMLInputElement).value,
        }
    }



    addValidationText(element: HTMLElement) {
        if (element.childNodes.length < 5) {
            element.appendChild(document.createTextNode('invalid'));
        }
    }

    addValidationTextOnButtonClick() {
        const {
            loginValid,
            passwordValid,
        } = {...this.getFormValidationStatuses()};
        if (!loginValid) {
            this.addValidationText(this.element!.querySelector('[name="login"]')!.parentElement!)
        }
        if (!passwordValid) {
            this.addValidationText(this.element!.querySelector('[name="password"]')!.parentElement!)
        }
    }
}
