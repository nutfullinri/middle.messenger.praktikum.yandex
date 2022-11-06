import template from './labeled-input.hbs';
import Block, { Props } from '../../base-block/block';
import { FormInput, FormInputProps } from '../form-input/form-input';
import { formInputValidationRegexpMap } from '../../../utils/consts/validation-regexp';
export enum InputType {
    TEXT = 'text',
    IMAGE = 'image',
}

export interface LabeledInputProps extends Props {
    label: string;
    name: string;
    input: FormInputProps;
}


export class LabeledInput extends Block {
    constructor(props: LabeledInputProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.children.input = new FormInput({
            ...(this.props.input as FormInputProps),
            events: {
                blur: () => {
                    if (this.element!.childNodes.length === 5 && this.getValidationStatus()) {
                        this.element!.removeChild(this.element!.lastChild!);
                    }
                    if (this.element!.childNodes.length < 5 && !this.getValidationStatus()) {
                        this.element!.appendChild(document.createTextNode('invalid'));
                    }
                    console.log(this.getValidationStatus());
                },
            },
        });

        this.element!.classList.add('form__controls__labeled-input');

        if (this.props.type === InputType.IMAGE) {
            this.element!.classList.add('form__controls__labeled-input_avatar');
        }
    }

    render() {
        return this.compile(template, this.props);
    }

    getValidationStatus() {
        return formInputValidationRegexpMap.get((this.props.input as FormInputProps).name)
            ? formInputValidationRegexpMap.get((this.props.input as FormInputProps).name)!.test(this.element!.getElementsByTagName('input')[0].value)
            : true;
    }
}
