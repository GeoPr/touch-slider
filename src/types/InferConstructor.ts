type TConstructable<R, A = any[]> = {
    new (...args: A extends any[] ? A : A[]): R;
};

export type TInferConstructor<R, C extends TConstructable<R>> = TConstructable<
    R,
    ConstructorParameters<C>
>;
