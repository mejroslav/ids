export interface Pipe<A> {
  <Z>(f: (item: A) => Z): Z;
  <B, Z>(f: (item: A) => B, g: (item: B) => Z): Z;
  <B, C, Z>(f: (item: A) => B, g: (item: B) => C, h: (item: C) => Z): Z;
  <B, C, D, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => Z
  ): Z;
  <B, C, D, E, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => Z
  ): Z;
  <B, C, D, E, F, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => F,
    k: (item: F) => Z
  ): Z;
  <B, C, D, E, F, G, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => F,
    k: (item: F) => G,
    l: (item: G) => Z
  ): Z;
  <B, C, D, E, F, G, H, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => F,
    k: (item: F) => G,
    l: (item: G) => H,
    m: (item: H) => Z
  ): Z;
  <B, C, D, E, F, G, H, I, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => F,
    k: (item: F) => G,
    l: (item: G) => H,
    m: (item: H) => I,
    n: (item: I) => Z
  ): Z;
  <B, C, D, E, F, G, H, I, J, Z>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => F,
    k: (item: F) => G,
    l: (item: G) => H,
    m: (item: H) => I,
    n: (item: I) => J,
    o: (item: J) => Z
  ): Z;
  <B, C, D, E, F, G, H, I, J, K>(
    f: (item: A) => B,
    g: (item: B) => C,
    h: (item: C) => D,
    i: (item: D) => E,
    j: (item: E) => F,
    k: (item: F) => G,
    l: (item: G) => H,
    m: (item: H) => I,
    n: (item: I) => J,
    o: (item: J) => K,
    ...fns: Array<(item: any) => any>
  ): any;
}

type Decrement<N extends number> = [
  ...[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ...[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
][N];

type Spread<A, B> = Omit<A, keyof B> & B;

type FlatStateMachine<
  Depth extends number,
  State extends {
    type: any;
    array: boolean;
    promise: boolean;
    set: boolean;
  }
> = {
  done: State;
  recur: State extends { type: infer Type }
    ? // unwrap promise and don't decrement depth
      Type extends Promise<infer Inner>
      ? FlatStateMachine<Depth, Spread<State, { type: Inner; promise: true }>>
      : // unwrap array and decrement depth
      Type extends ReadonlyArray<infer Inner>
      ? FlatStateMachine<
          Decrement<Depth>,
          Spread<State, { type: Inner; array: true }>
        >
      : // unwrap set and decrement depth
      Type extends ReadonlySet<infer Inner>
      ? FlatStateMachine<
          Decrement<Depth>,
          Spread<State, { type: Inner; set: true }>
        >
      : // nothing to unwrap, terminate
        State
    : never;
}[Depth extends -1 ? "done" : "recur"];

type FlatStateConsumer<
  State extends {
    type: any;
    array: boolean;
    promise: boolean;
    set: boolean;
  }
> = true extends State["promise"]
  ? Promise<FlatStateConsumer<Spread<State, { promise: false }>>>
  : true extends State["set"]
  ? Set<State["type"]>
  : true extends State["array"]
  ? Array<State["type"]>
  : State["type"];

type Flat<Nested, Depth extends number> = FlatStateConsumer<
  FlatStateMachine<
    Depth,
    { type: Nested; array: false; promise: false; set: false }
  >
>;

export function pipable<T>(x: T): { pipe: Pipe<T> } {
  return {
    pipe(...fns: Array<(item: any) => any>) {
      return fns.reduce((previousValue, f) => f(previousValue), x);
    },
  };
}

const { isArray } = Array;
const add = <T>(collection: T[] | Set<T>, value: T): any =>
  isArray(collection) ? collection.push(value) : collection.add(value);
const isPromise = (x: any): x is Promise<any> => x instanceof Promise;
const isSet = (x: any): x is Set<any> => x instanceof Set;
const isCollection = (x: any): x is any[] | Set<any> =>
  isArray(x) || isSet(x);

export function flat<D extends number = 1>(
  depth: D = <D>1
): <T>(value: T) => Flat<T, D> {
  return (value): any => {
    let aggregate: any[] | Set<any> = [];
    let async = false;

    (function recur(d: number, v: any) {
      if (d < 0 || !isCollection(v)) {
        async ||= isPromise(v);
        return add(aggregate, v);
      }

      if (!isSet(aggregate) && isSet(v)) {
        aggregate = new Set(aggregate);
      }

      for (const el of v) recur(d - 1, el);
    })(depth, value);

    if (async) {
      if (isSet(aggregate))
        return Promise.all([...aggregate]).then((a) => new Set(a));
      else return Promise.all(aggregate);
    }

    return aggregate;
  };
}

export function map<S, T>(
  f: (element: S) => T
): <R extends Promise<S> | ReadonlyArray<S> | ReadonlySet<S>>(
  outer: R
) => R extends Promise<S>
  ? Promise<T>
  : R extends ReadonlyArray<S>
  ? T[]
  : R extends ReadonlySet<S>
  ? Set<T>
  : never {
  return (outer): any => {
    if (isPromise(outer)) return outer.then(f);
    if (isSet(outer)) return new Set([...outer].map(f));
    if (isArray(outer)) return outer.map(f);
    throw new TypeError("Unknown type – expected an array, a set or a promise.");
  };
}
