import { Schema, SchemaObject, SyncSchemaObject, AsyncSchemaObject, Vocabulary, KeywordDefinition, Options, InstanceOptions, ValidateFunction, ValidateGuard, SyncValidateFunction, AsyncValidateFunction, Logger, ErrorObject, Format, AddedFormat } from "./types";
import { JSONSchemaType } from "./types/json-schema";
import { ValidationError, MissingRefError } from "./compile/error_classes";
import { ValidationRules } from "./compile/rules";
import { SchemaEnv } from "./compile";
import { ValueScope } from "./compile/codegen";
export default class Ajv {
    opts: InstanceOptions;
    errors?: ErrorObject[] | null;
    logger: Logger;
    readonly scope: ValueScope;
    readonly schemas: {
        [key: string]: SchemaEnv | undefined;
    };
    readonly refs: {
        [ref: string]: SchemaEnv | string | undefined;
    };
    readonly formats: {
        [name: string]: AddedFormat | undefined;
    };
    readonly RULES: ValidationRules;
    readonly _compilations: Set<SchemaEnv>;
    private readonly _loading;
    private readonly _cache;
    private readonly _metaOpts;
    static ValidationError: typeof ValidationError;
    static MissingRefError: typeof MissingRefError;
    constructor(opts?: Options);
    validate(schema: {
        $async?: never;
    }, data: unknown): boolean | Promise<unknown>;
    validate(schema: SyncSchemaObject | boolean, data: unknown): boolean;
    validate<T>(schema: SyncSchemaObject | JSONSchemaType<T>, data: unknown): data is T;
    validate(schema: AsyncSchemaObject, data: unknown): Promise<unknown>;
    validate(schemaKeyRef: Schema | string, data: unknown): boolean | Promise<unknown>;
    compile(schema: {
        $async?: never;
    }, _meta?: boolean): ValidateFunction;
    compile(schema: SyncSchemaObject | boolean, _meta?: boolean): SyncValidateFunction;
    compile<T>(schema: SyncSchemaObject | JSONSchemaType<T>, _meta?: boolean): ValidateGuard<T>;
    compile(schema: AsyncSchemaObject, _meta?: boolean): AsyncValidateFunction;
    compile(schema: Schema, _meta?: boolean): ValidateFunction;
    compileAsync(schema: {
        $async?: never;
    }, _meta?: boolean): Promise<ValidateFunction>;
    compileAsync(schema: SyncSchemaObject, meta?: boolean): Promise<SyncValidateFunction>;
    compileAsync<T>(schema: SyncSchemaObject | JSONSchemaType<T>, _meta?: boolean): Promise<ValidateGuard<T>>;
    compileAsync(schema: AsyncSchemaObject, meta?: boolean): Promise<AsyncValidateFunction>;
    compileAsync(schema: SchemaObject, meta?: boolean): Promise<ValidateFunction>;
    addSchema(schema: Schema | Schema[], // If array is passed, `key` will be ignored
    key?: string, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta?: boolean, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema?: boolean | "log"): Ajv;
    addMetaSchema(schema: SchemaObject, key?: string, // schema key
    _validateSchema?: boolean | "log"): Ajv;
    validateSchema(schema: Schema, throwOrLogError?: boolean): boolean | Promise<unknown>;
    getSchema(keyRef: string): ValidateFunction | undefined;
    removeSchema(schemaKeyRef: Schema | string | RegExp): Ajv;
    addVocabulary(definitions: Vocabulary): Ajv;
    addKeyword(kwdOrDef: string | KeywordDefinition): Ajv;
    getKeyword(keyword: string): KeywordDefinition | boolean;
    removeKeyword(keyword: string): Ajv;
    addFormat(name: string, format: Format): Ajv;
    errorsText(errors?: ErrorObject[] | null | undefined, // optional array of validation errors
    { separator, dataVar }?: ErrorsTextOptions): string;
    $dataMetaSchema(metaSchema: SchemaObject, keywordsJsonPointers: string[]): SchemaObject;
    private _removeAllSchemas;
    private _addSchema;
    private _checkUnique;
    private _compileSchemaEnv;
    private _compileMetaSchema;
}
export interface ErrorsTextOptions {
    separator?: string;
    dataVar?: string;
}
