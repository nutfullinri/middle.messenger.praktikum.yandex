import Block, { Props } from '../../../../common/base-block/block';
import template from './chat-contact.hbs';

export interface ChatContactProps extends Props {
    contactName: string;
}

export class ChatContact extends Block {
    constructor(props: ChatContactProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.element!.classList.add('chat__contact');
    }

    render() {
        return this.compile(template, this.props);
    }
}
