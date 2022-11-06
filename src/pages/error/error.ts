import Block from '../../common/base-block/block';
import template from './error.hbs';
import { SubmitButton } from '../../common/components/submit-button/submit-button';
import { LabeledInput } from '../../common/components/labeled-input/labeled-input';
import { FormProps } from '../../common/models/form-props';

export class ErrorPage extends Block {
    constructor(props: { code: string }) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
