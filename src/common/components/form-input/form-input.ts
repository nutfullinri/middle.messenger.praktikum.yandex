import template from './form-input.hbs';
import Block, { Props } from '../../base-block/block';
import { InputType } from '../labeled-input/labeled-input';
import { FormInputName } from '../../enums/form-input-name.enum';

export interface FormInputProps extends Props {
    name: FormInputName;
    type: InputType;
    value: string | null;
}

export class FormInput extends Block {
    constructor(props: FormInputProps) {
        super('input', props);
    }

    init() {
        super.init();
        this.element!.classList.add('form__controls__labeled-input__input');
        this.element!.setAttribute('name', (this.props.name as string));
        this.element!.setAttribute('type', (this.props.type as string));
        this.element!.setAttribute('value', (this.props.value as string));
    }

    componentDidMount () {
        super.componentDidMount();
        if (this.props.type === InputType.IMAGE) {
            this.element!.classList.add('form__controls__labeled-input__input_avatar');
        }
    }


    render() {
        return this.compile(template, this.props);
    }
}
