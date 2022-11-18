import Block, { Props } from '../../common/base-block/block';
import template from './profile.hbs';
import { SubmitButton } from '../../common/components/submit-button/submit-button';
import { LabeledInput, LabeledInputProps } from '../../common/components/labeled-input/labeled-input';
import { emailValidation, loginValidation, nameValidation, passwordValidation, phoneValidation } from '../../utils/consts/validation-regexp';
import { FormInputName } from '../../common/enums/form-input-name.enum';

export class ProfilePage extends Block {
    constructor(props: Props) {
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
                    this.addValidationTextOnButtonClick();
                },
            },
        });
        (this.props.inputsData as LabeledInputProps[]).forEach((input: LabeledInputProps) => {

            this.children[input.name] = new LabeledInput(input);
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
            firstNameValid: nameValidation.test((this.element!.querySelector(`[name="${FormInputName.FIRST_NAME}"]`) as HTMLInputElement).value),
            secondNameValid: nameValidation.test((this.element!.querySelector(`[name="${FormInputName.SECOND_NAME}"]`) as HTMLInputElement).value),
            loginValid: loginValidation.test((this.element!.querySelector(`[name="${FormInputName.LOGIN}"]`) as HTMLInputElement).value),
            passwordValid: passwordValidation.test((this.element!.querySelector(`[name="${FormInputName.PASSWORD}"]`) as HTMLInputElement).value),
            emailValid: emailValidation.test((this.element!.querySelector(`[name="${FormInputName.EMAIL}"]`) as HTMLInputElement).value),
            phoneValid: phoneValidation.test((this.element!.querySelector(`[name="${FormInputName.PHONE}"]`) as HTMLInputElement).value),
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
            avatar: (this.element!.querySelector(`[name="${FormInputName.AVATAR}"]`) as HTMLImageElement).src,
            displayName: (this.element!.querySelector(`[name="${FormInputName.DISPLAY_NAME}"]`) as HTMLInputElement).value,
            firstName: (this.element!.querySelector(`[name="${FormInputName.FIRST_NAME}"]`) as HTMLInputElement).value,
            secondName: (this.element!.querySelector(`[name="${FormInputName.SECOND_NAME}"]`) as HTMLInputElement).value,
            login: (this.element!.querySelector(`[name="${FormInputName.LOGIN}"]`) as HTMLInputElement).value,
            password: (this.element!.querySelector(`[name="${FormInputName.PASSWORD}"]`) as HTMLInputElement).value,
            email: (this.element!.querySelector(`[name="${FormInputName.EMAIL}"]`) as HTMLInputElement).value,
            phone: (this.element!.querySelector(`[name="${FormInputName.PHONE}"]`) as HTMLInputElement).value,
        }
    }

    addValidationText(element: HTMLElement) {
        if (element.childNodes.length < 5) {
            element.appendChild(document.createTextNode('invalid'));
        }
    }

    removeValidationText(element: HTMLElement) {
        if (element.childNodes.length === 5) {
            element.removeChild(element.lastChild!);
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
            this.addValidationText(this.element!.querySelector(`[name="${FormInputName.FIRST_NAME}"]`)!.parentElement!)
        }
        if (!secondNameValid) {
            this.addValidationText(this.element!.querySelector(`[name="${FormInputName.SECOND_NAME}"]`)!.parentElement!)
        }
        if (!loginValid) {
            this.addValidationText(this.element!.querySelector(`[name="${FormInputName.LOGIN}"]`)!.parentElement!)
        }
        if (!passwordValid) {
            this.addValidationText(this.element!.querySelector(`[name="${FormInputName.PASSWORD}"]`)!.parentElement!)
        }
        if (!emailValid) {
            this.addValidationText(this.element!.querySelector(`[name="${FormInputName.EMAIL}"]`)!.parentElement!)
        }
        if (!phoneValid) {
            this.addValidationText(this.element!.querySelector(`[name="${FormInputName.PHONE}"]`)!.parentElement!)
        }
    }
}
