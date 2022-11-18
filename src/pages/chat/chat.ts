import Block, { Props } from '../../common/base-block/block';
import template from './chat.hbs';
import { ChatPreviews } from './components/previews/previews';
import { ChatWindow } from './components/chat-window/chat-window';
import { MessageType } from './components/messages/messages';
import { nanoid } from 'nanoid';

export class ChatPage extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    init() {
        super.init();
        this.children.previews = new ChatPreviews({
            previewsData: [
                {
                    contactName: 'Киноклуб',
                    messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...'
                },
                {
                    contactName: 'Киноклуб',
                    messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...'
                },
                {
                    contactName: 'Киноклуб',
                    messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...'
                },
            ]
        });
        this.children.chatWindow = new ChatWindow({
            chatMessageFormProps: {
                inputValue: null,
            },
            chatContactProps: {
                contactName: 'Вадим',
            },
            messagesProps: {
                messages: [
                    {
                        id: nanoid(6),
                        type: MessageType.SENT,
                        textContent: 'Круто!',
                    },
                    {
                        id: nanoid(6),
                        type: MessageType.RECEIVED,
                        textContent: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
                    },
                ]
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
