import {
    createSerializableStateInvariantMiddleware,
    isPlain,
    SerializableStateInvariantMiddlewareOptions
} from "@reduxjs/toolkit";

export const isSerializable = (value: any) =>
    typeof value[Symbol.iterator] === 'function' || isPlain(value);

export const getEntries = (value: any) =>
    typeof value[Symbol.iterator] === 'function'
        ? Array.from(value.entries())
        : Object.entries(value);

export const serializableMiddleware = createSerializableStateInvariantMiddleware({
        isSerializable,
        getEntries,
    } as SerializableStateInvariantMiddlewareOptions
);
