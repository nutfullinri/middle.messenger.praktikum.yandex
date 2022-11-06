import template from './labeled-input.hbs';
import Block from '../../base-block/block';

export enum InputType {
    TEXT = 'text',
    IMAGE = 'image',
}

export interface LabeledInputProps {
    label: string;
    name: string;
    type: InputType;
    value: string | null;
}

export class LabeledInput extends Block {
    constructor(props: LabeledInputProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.element.classList.add('form__controls__labeled-input');

        if (this.props.type === InputType.IMAGE) {
            this.element.classList.add('form__controls__labeled-input_avatar');
        }
    }

    componentDidMount () {
        super.componentDidMount();
        if (this.props.type === InputType.IMAGE) {
            this.element.children[1].classList.add('form__controls__labeled-input__input_avatar');
        }
    }


    render() {
        return this.compile(template, this.props);
    }
}
