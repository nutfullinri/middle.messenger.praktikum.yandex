class EventBus {
    listeners: Record<string, Array<() => void>>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: () => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => void): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit<T extends unknown[]>(event: string, ...args: T): void {
        const listener = this.listeners[event];

        if (!listener) {
            throw new Event(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            // @ts-ignore
            listener(...args);
        });
    }
}

export default EventBus;
