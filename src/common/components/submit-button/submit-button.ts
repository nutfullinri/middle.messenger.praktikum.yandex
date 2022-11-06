import template from './submit-button.hbs';
import Block, { Props } from '../../base-block/block';

interface ButtonProps extends Props {
    label: string;
    events: {
        click: () => void;
    };
}

export class SubmitButton extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
    }

    init() {
        super.init();
        this.element!.classList.add('form__footer__submit-btn');
    }

    render() {
        return this.compile(template, this.props);
    }
}
