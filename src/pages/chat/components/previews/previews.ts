import template from './previews.hbs';
import Block from '../../../../common/base-block/block';

export interface PreviewData {
    contactName: string;
    messagePreview: string;
}

export interface ChatPreviewsProps {
    previewsData: PreviewData[];
}

export class ChatPreviews extends Block {
    constructor(props: ChatPreviewsProps) {
        super('div', props);
    }

    init() {
        super.init();
        this.element.classList.add('previews')
        //this.children.previews = new ChatPreviews()
    }

    render() {
        return this.compile(template, this.props);
    }
}
