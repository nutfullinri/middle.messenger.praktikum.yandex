import template from './messages.hbs';
import Block, { Props } from '../../../../common/base-block/block';

export enum MessageType {
    SENT,
    RECEIVED
}

export interface Message {
    id: string;
    type: MessageType;
    textContent: string;
}

export interface MessagesProps extends Props {
    messages: Message[];
}

export class Messages extends Block {
    constructor(props: MessagesProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.element!.classList.add('chat__messages');
    }

    componentDidMount() {
        super.componentDidMount();

        (this.props.messages as { type: MessageType; id: string; }[]).forEach((message: { type: MessageType; id: string; }) => {
            if (message.type === MessageType.SENT) {
                this.element!.querySelector(`[data-message-id=${message.id}]`)!.classList.add('chat__messages__message_sent');
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
