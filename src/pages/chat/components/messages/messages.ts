import template from './messages.hbs';
import Block from '../../../../common/base-block/block';

export enum MessageType {
    SENT,
    RECEIVED
}

export interface Message {
    id: string;
    type: MessageType;
    textContent: string;
}

export interface MessagesProps {
    messages: Message[];
}

export class Messages extends Block {
    constructor(props: MessagesProps) {
        //TODO: need to replace with button (click on button triggers rerender of whole page somehow)
        super('div', props);
    }

    init() {
        super.init();
        this.element.classList.add('chat__messages');
    }

    componentDidMount(oldProps?) {
        super.componentDidMount(oldProps);

        this.props.messages.forEach(message => {
            if (message.type === MessageType.SENT) {
                this.element.querySelector(`[data-message-id=${message.id}]`).classList.add('chat__messages__message_sent');
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
