import Block from '../../../../common/base-block/block';
import template from './chat-window.hbs';
import { Messages, MessagesProps } from '../messages/messages';
import { ChatContact, ChatContactProps } from '../chat-contact/chat-contact';
import { ChatMessageForm, ChatMessageFormProps } from '../chat-message-form/chat-message-form';

export interface ChatWindowProps {
    messagesProps: MessagesProps;
    chatContactProps: ChatContactProps;
    chatMessageFormProps: ChatMessageFormProps;
}

export class ChatWindow extends Block {
    constructor(props: ChatWindowProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.element.classList.add('chat');
        this.children.chatMessageForm = new ChatMessageForm(this.props.chatMessageFormProps)
        this.children.chatMessages = new Messages(this.props.messagesProps);
        this.children.chatContact = new ChatContact(this.props.chatContactProps);
    }

    render() {
        return this.compile(template, this.props);
    }
}
