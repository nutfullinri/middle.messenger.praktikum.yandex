import template from './chat-message-form.hbs';
import Block from '../../../../common/base-block/block';
import { SubmitButton } from '../../../../common/components/submit-button/submit-button';

export interface ChatMessageFormProps {
    inputValue: string | null;
}

export class ChatMessageForm extends Block {
    constructor(props: ChatMessageFormProps) {
        //TODO: need to replace with button tag (click on button triggers rerender of whole page somehow)
        super('div', props);
    }

    init() {
        super.init();
        this.element.classList.add('chat__message-form');

        this.children.sendButton = new SubmitButton({
            label: 'send',
            events: {
                click: () => {
                    console.log({
                        message: this.element.getElementsByTagName('input')[0].value,
                    });
                    console.log({
                        messageValid: Boolean(this.element.getElementsByTagName('input')[0].value),
                    });
                },
            },
        });
    }

    componentDidMount(oldProps?) {
        super.componentDidMount(oldProps);

        this.element.querySelector('[name="message"]').addEventListener('focus', () => {
            console.log({
                messageValid: Boolean((this.element.querySelector('[name="message"]') as HTMLInputElement).value),
            });
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
