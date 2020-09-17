export { Format, FormatDefinition, AsyncFormatDefinition, KeywordDefinition, Vocabulary, } from "./types";
export interface Plugin<Opts> {
    (ajv: Ajv, options?: Opts): Ajv;
    [prop: string]: any;
}
import KeywordCxt from "./compile/context";
export { KeywordCxt };
import type { Schema, AnySchema, AnySchemaObject, SchemaObject, AsyncSchema, Vocabulary, KeywordDefinition, Options, InstanceOptions, AnyValidateFunction, ValidateFunction, AsyncValidateFunction, Logger, ErrorObject, Format, AddedFormat } from "./types";
import type { JSONSchemaType } from "./types/json-schema";
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
    validate<T = any>(schema: Schema | JSONSchemaType<T> | string, data: unknown): data is T;
    validate<T = any>(schema: AsyncSchema, data: unknown): Promise<T>;
    validate<T = any>(schemaKeyRef: AnySchema | string, data: unknown): data is T | Promise<T>;
    compile<T = any>(schema: Schema | JSONSchemaType<T>, _meta?: boolean): ValidateFunction<T>;
    compile<T = any>(schema: AsyncSchema, _meta?: boolean): AsyncValidateFunction<T>;
    compile<T = any>(schema: AnySchema, _meta?: boolean): AnyValidateFunction<T>;
    compileAsync<T = any>(schema: SchemaObject | JSONSchemaType<T>, _meta?: boolean): Promise<ValidateFunction<T>>;
    compileAsync<T = any>(schema: AsyncSchema, meta?: boolean): Promise<AsyncValidateFunction<T>>;
    compileAsync<T = any>(schema: AnySchemaObject, meta?: boolean): Promise<AnyValidateFunction<T>>;
    addSchema(schema: AnySchema | AnySchema[], // If array is passed, `key` will be ignored
    key?: string, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta?: boolean, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema?: boolean | "log"): Ajv;
    addMetaSchema(schema: AnySchemaObject, key?: string, // schema key
    _validateSchema?: boolean | "log"): Ajv;
    validateSchema(schema: AnySchema, throwOrLogError?: boolean): boolean | Promise<unknown>;
    getSchema<T = any>(keyRef: string): AnyValidateFunction<T> | undefined;
    removeSchema(schemaKeyRef: AnySchema | string | RegExp): Ajv;
    addVocabulary(definitions: Vocabulary): Ajv;
    addKeyword(kwdOrDef: string | KeywordDefinition): Ajv;
    getKeyword(keyword: string): KeywordDefinition | boolean;
    removeKeyword(keyword: string): Ajv;
    addFormat(name: string, format: Format): Ajv;
    errorsText(errors?: ErrorObject[] | null | undefined, // optional array of validation errors
    { separator, dataVar }?: ErrorsTextOptions): string;
    $dataMetaSchema(metaSchema: AnySchemaObject, keywordsJsonPointers: string[]): AnySchemaObject;
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
