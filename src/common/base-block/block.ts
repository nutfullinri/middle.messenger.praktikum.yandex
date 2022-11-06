import EventBus from '../event-bus/event-bus';
import { nanoid } from 'nanoid';

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    public id = nanoid(6);
    props;
    children: Record<string, Block>;
    eventBus;

    _element: HTMLElement | null = null;
    _meta: { tagName?: string; props?: any } = {};

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsWithChildren
     *
     * @returns {void}
     */
    constructor(tagName = "div", propsWithChildren = {}) {
        const { children, props } = this.getChildren(propsWithChildren);
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    getChildren(propsWithChildren): { children: Record<string, Block>, props: Record<string, any> } {
        const children: Record<string, Block> = {};
        const props: Record<string, any> = {};

        Object.keys(propsWithChildren).forEach(key => {
            if (propsWithChildren[key] instanceof Block) {
                children[key] = propsWithChildren[key];
            } else {
                props[key] = propsWithChildren[key];
            }
        });

        return {children, props};
    }

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);

        });

        return temp.content;
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources(): void {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    /* eslint-disable no-empty-function */
    init(): void {}
    /* eslint-enable no-empty-function */

    _init() {
        this._createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(): void {
        this.componentDidMount();

        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    /* eslint-disable no-empty-function */
    componentDidMount(oldProps?): void {}
    /* eslint-enable no-empty-function */

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps, newProps): void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

// Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps): boolean {
        this._render()
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    get element() {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        this._element.innerHTML = '';
        this._element.append(block);

        this.addEvents();
    }

// Может переопределять пользователь, необязательно трогать
    render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent(): HTMLElement {
        return this.element;
    }

    addEvents() {
        const { events = {} } = this.props as { events: Record<string, () => void>};

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    removeEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        })
    }

    _makePropsProxy(props: any): any {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        return new Proxy({ ...props }, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = target;
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty(target, prop) {
                throw Error('нет доступа')
            }
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show(): void {
        this.getContent().style.display = "block";
    }

    hide(): void {
        this.getContent().style.display = "none";
    }
}

export default Block;
