export class LinkedListNode<E> {
    public constructor(
        public readonly element: E,
        public next: LinkedListNode<E> | null = null,
        public prev: LinkedListNode<E> | null = null,
    ) {}
}
