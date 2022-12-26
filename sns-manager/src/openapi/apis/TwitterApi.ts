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


import * as runtime from '../runtime';
import type {
  ErrorMessage,
  SNSPostResponse,
  TweetImagesResponse,
  TwitterToken,
  UnprocessableEntity,
  User,
} from '../models';
import {
    ErrorMessageFromJSON,
    ErrorMessageToJSON,
    SNSPostResponseFromJSON,
    SNSPostResponseToJSON,
    TweetImagesResponseFromJSON,
    TweetImagesResponseToJSON,
    TwitterTokenFromJSON,
    TwitterTokenToJSON,
    UnprocessableEntityFromJSON,
    UnprocessableEntityToJSON,
    UserFromJSON,
    UserToJSON,
} from '../models';

export interface ListTweetsTweetsUsernameGetRequest {
    username: string;
    maxId?: number;
    count?: number;
}

export interface TwitterAuthCallbackCallbackGetRequest {
    oauthVerifier: string;
    oauthToken: string;
}

export interface TwitterAuthGetRequest {
    returnTo?: string;
}

export interface TwitterPostPostPostRequest {
    text: string;
    images?: Array<Blob>;
}

/**
 * 
 */
export class TwitterApi extends runtime.BaseAPI {

    /**
     */
    async listTweetsTweetsUsernameGetRaw(requestParameters: ListTweetsTweetsUsernameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TweetImagesResponse>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling listTweetsTweetsUsernameGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.maxId !== undefined) {
            queryParameters['max_id'] = requestParameters.maxId;
        }

        if (requestParameters.count !== undefined) {
            queryParameters['count'] = requestParameters.count;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/twitter/tweets/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TweetImagesResponseFromJSON(jsonValue));
    }

    /**
     */
    async listTweetsTweetsUsernameGet(requestParameters: ListTweetsTweetsUsernameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TweetImagesResponse> {
        const response = await this.listTweetsTweetsUsernameGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Callback after login to get access token
     */
    async twitterAuthCallbackCallbackGetRaw(requestParameters: TwitterAuthCallbackCallbackGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TwitterToken>> {
        if (requestParameters.oauthVerifier === null || requestParameters.oauthVerifier === undefined) {
            throw new runtime.RequiredError('oauthVerifier','Required parameter requestParameters.oauthVerifier was null or undefined when calling twitterAuthCallbackCallbackGet.');
        }

        if (requestParameters.oauthToken === null || requestParameters.oauthToken === undefined) {
            throw new runtime.RequiredError('oauthToken','Required parameter requestParameters.oauthToken was null or undefined when calling twitterAuthCallbackCallbackGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.oauthVerifier !== undefined) {
            queryParameters['oauth_verifier'] = requestParameters.oauthVerifier;
        }

        if (requestParameters.oauthToken !== undefined) {
            queryParameters['oauth_token'] = requestParameters.oauthToken;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/twitter/auth/callback`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TwitterTokenFromJSON(jsonValue));
    }

    /**
     * Callback after login to get access token
     */
    async twitterAuthCallbackCallbackGet(requestParameters: TwitterAuthCallbackCallbackGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TwitterToken> {
        const response = await this.twitterAuthCallbackCallbackGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Redirects to twitter login
     */
    async twitterAuthGetRaw(requestParameters: TwitterAuthGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.returnTo !== undefined) {
            queryParameters['return_to'] = requestParameters.returnTo;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/twitter/auth/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Redirects to twitter login
     */
    async twitterAuthGet(requestParameters: TwitterAuthGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.twitterAuthGetRaw(requestParameters, initOverrides);
    }

    /**
     * Posting a twitter tweet
     */
    async twitterPostPostPostRaw(requestParameters: TwitterPostPostPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SNSPostResponse>> {
        if (requestParameters.text === null || requestParameters.text === undefined) {
            throw new runtime.RequiredError('text','Required parameter requestParameters.text was null or undefined when calling twitterPostPostPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.images) {
            requestParameters.images.forEach((element) => {
                formParams.append('images', element as any);
            })
        }

        if (requestParameters.text !== undefined) {
            formParams.append('text', requestParameters.text as any);
        }

        const response = await this.request({
            path: `/api/twitter/post`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SNSPostResponseFromJSON(jsonValue));
    }

    /**
     * Posting a twitter tweet
     */
    async twitterPostPostPost(requestParameters: TwitterPostPostPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SNSPostResponse> {
        const response = await this.twitterPostPostPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async userUserGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/twitter/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async userUserGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.userUserGetRaw(initOverrides);
        return await response.value();
    }

}
