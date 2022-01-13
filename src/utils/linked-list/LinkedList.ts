import { LinkedListNode } from './Node';

export class LinkedList<E> {
    public head: LinkedListNode<E> | null = null;

    public append(element: E): this {
        const node = new LinkedListNode(element);

        if (!this.head) {
            this.head = node;
            return this;
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        node.prev = current;
        current.next = node;

        return this;
    }

    public clear(): void {
        this.head = null;
    }

    public toArray(): LinkedListNode<E>[] {
        if (!this.head) return [];

        const array: LinkedListNode<E>[] = [this.head];

        let current = this.head;

        while (current.next) {
            current = current.next;
            array.push(current);
        }

        return array;
    }
}
