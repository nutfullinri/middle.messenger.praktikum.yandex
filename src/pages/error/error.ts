import Block from '../../common/base-block/block';
import template from './error.hbs';

export class ErrorPage extends Block {
    constructor(props: { code: string }) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
