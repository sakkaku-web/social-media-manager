/* tslint:disable */
/* eslint-disable */
/**
 * SNS-Manager API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ReferenceImage } from './ReferenceImage';
import {
    ReferenceImageFromJSON,
    ReferenceImageFromJSONTyped,
    ReferenceImageToJSON,
} from './ReferenceImage';

/**
 * 
 * @export
 * @interface UpvotedResponse
 */
export interface UpvotedResponse {
    /**
     * 
     * @type {Array<ReferenceImage>}
     * @memberof UpvotedResponse
     */
    images: Array<ReferenceImage>;
}

/**
 * Check if a given object implements the UpvotedResponse interface.
 */
export function instanceOfUpvotedResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "images" in value;

    return isInstance;
}

export function UpvotedResponseFromJSON(json: any): UpvotedResponse {
    return UpvotedResponseFromJSONTyped(json, false);
}

export function UpvotedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpvotedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'images': ((json['images'] as Array<any>).map(ReferenceImageFromJSON)),
    };
}

export function UpvotedResponseToJSON(value?: UpvotedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'images': ((value.images as Array<any>).map(ReferenceImageToJSON)),
    };
}

