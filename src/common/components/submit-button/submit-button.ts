import template from './submit-button.hbs';
import Block from '../../base-block/block';

interface ButtonProps {
    label: string;
    events: {
        click: () => void;
    };
}

export class SubmitButton extends Block {
    constructor(props: ButtonProps) {
        //TODO: need to change to button (click on button triggers redirect on page somehow)
        super('div', props);
    }

    init() {
        super.init();
        this.element.classList.add('form__footer__submit-btn');
    }

    render() {
        return this.compile(template, this.props);
    }
}
