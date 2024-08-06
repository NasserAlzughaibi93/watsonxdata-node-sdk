/**
 * (C) Copyright IBM Corp. 2024.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * IBM OpenAPI SDK Code Generator Version: 3.93.0-c40121e6-20240729-182103
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  getQueryParam,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * This is the Public API for IBM watsonx.data
 *
 * API Version: 2.0.0
 */

class WatsonxDataV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://region.lakehouse.cloud.ibm.com/lakehouse/api/v2';

  static DEFAULT_SERVICE_NAME: string = 'watsonx_data';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of WatsonxDataV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {WatsonxDataV2}
   */

  public static newInstance(options: UserOptions): WatsonxDataV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new WatsonxDataV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a WatsonxDataV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {WatsonxDataV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(WatsonxDataV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * buckets
   ************************/

  /**
   * Get bucket registrations.
   *
   * Get list of registered buckets.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistrationCollection>>}
   */
  public listBucketRegistrations(
    params?: WatsonxDataV2.ListBucketRegistrationsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistrationCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listBucketRegistrations');

    const parameters = {
      options: {
        url: '/bucket_registrations',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Register bucket.
   *
   * Register a new bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {BucketDetails} params.bucketDetails - bucket details.
   * @param {string} params.bucketType - bucket type.
   * @param {string} params.description - bucket description.
   * @param {string} params.managedBy - managed by.
   * @param {BucketCatalog} [params.associatedCatalog] - bucket catalog.
   * @param {string} [params.bucketDisplayName] - bucket display name.
   * @param {string} [params.region] - region where the bucket is located.
   * @param {string[]} [params.tags] - tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistration>>}
   */
  public createBucketRegistration(
    params: WatsonxDataV2.CreateBucketRegistrationParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['bucketDetails', 'bucketType', 'description', 'managedBy'];
    const _validParams = ['bucketDetails', 'bucketType', 'description', 'managedBy', 'associatedCatalog', 'bucketDisplayName', 'region', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'bucket_details': _params.bucketDetails,
      'bucket_type': _params.bucketType,
      'description': _params.description,
      'managed_by': _params.managedBy,
      'associated_catalog': _params.associatedCatalog,
      'bucket_display_name': _params.bucketDisplayName,
      'region': _params.region,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createBucketRegistration');

    const parameters = {
      options: {
        url: '/bucket_registrations',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get bucket.
   *
   * Get a registered bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketId - bucket id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistration>>}
   */
  public getBucketRegistration(
    params: WatsonxDataV2.GetBucketRegistrationParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['bucketId'];
    const _validParams = ['bucketId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket_id': _params.bucketId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getBucketRegistration');

    const parameters = {
      options: {
        url: '/bucket_registrations/{bucket_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Deregister Bucket.
   *
   * Deregister a bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketId - bucket id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deregisterBucket(
    params: WatsonxDataV2.DeregisterBucketParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['bucketId'];
    const _validParams = ['bucketId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket_id': _params.bucketId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deregisterBucket');

    const parameters = {
      options: {
        url: '/bucket_registrations/{bucket_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update bucket.
   *
   * Update bucket details & credentials.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketId - bucket id.
   * @param {BucketDetails} [params.bucketDetails] - bucket details.
   * @param {string} [params.bucketDisplayName] - bucket display name.
   * @param {string} [params.description] - modified description.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistration>>}
   */
  public updateBucketRegistration(
    params: WatsonxDataV2.UpdateBucketRegistrationParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['bucketId'];
    const _validParams = ['bucketId', 'bucketDetails', 'bucketDisplayName', 'description', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'bucket_details': _params.bucketDetails,
      'bucket_display_name': _params.bucketDisplayName,
      'description': _params.description,
      'tags': _params.tags,
    };

    const path = {
      'bucket_id': _params.bucketId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateBucketRegistration');

    const parameters = {
      options: {
        url: '/bucket_registrations/{bucket_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Activate Bucket.
   *
   * Activate a registered bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketId - bucket id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateActivateBucketCreatedBody>>}
   */
  public createActivateBucket(
    params: WatsonxDataV2.CreateActivateBucketParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateActivateBucketCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['bucketId'];
    const _validParams = ['bucketId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket_id': _params.bucketId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createActivateBucket');

    const parameters = {
      options: {
        url: '/bucket_registrations/{bucket_id}/activate',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Deactivate Bucket.
   *
   * Deactivate a bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketId - bucket id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteDeactivateBucket(
    params: WatsonxDataV2.DeleteDeactivateBucketParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['bucketId'];
    const _validParams = ['bucketId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket_id': _params.bucketId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteDeactivateBucket');

    const parameters = {
      options: {
        url: '/bucket_registrations/{bucket_id}/deactivate',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List bucket objects.
   *
   * Fetch all objects from a given bucket.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.bucketId - bucket id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistrationObjectCollection>>}
   */
  public listBucketObjects(
    params: WatsonxDataV2.ListBucketObjectsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.BucketRegistrationObjectCollection>> {
    const _params = { ...params };
    const _requiredParams = ['bucketId'];
    const _validParams = ['bucketId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'bucket_id': _params.bucketId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listBucketObjects');

    const parameters = {
      options: {
        url: '/bucket_registrations/{bucket_id}/objects',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * databases
   ************************/

  /**
   * Get databases.
   *
   * Get list of databases.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistrationCollection>>}
   */
  public listDatabaseRegistrations(
    params?: WatsonxDataV2.ListDatabaseRegistrationsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistrationCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listDatabaseRegistrations');

    const parameters = {
      options: {
        url: '/database_registrations',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add/Create database.
   *
   * Add or create a new database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.databaseDisplayName - Database display name.
   * @param {string} params.databaseType - Connector type.
   * @param {DatabaseCatalog} [params.associatedCatalog] - database catalog.
   * @param {string} [params.createdOn] - Created on.
   * @param {DatabaseDetails} [params.databaseDetails] - database details.
   * @param {DatabaseRegistrationPrototypeDatabasePropertiesItems[]} [params.databaseProperties] - This will hold all
   * the properties for a custom database.
   * @param {string} [params.description] - Database description.
   * @param {string[]} [params.tags] - tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistration>>}
   */
  public createDatabaseRegistration(
    params: WatsonxDataV2.CreateDatabaseRegistrationParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['databaseDisplayName', 'databaseType'];
    const _validParams = ['databaseDisplayName', 'databaseType', 'associatedCatalog', 'createdOn', 'databaseDetails', 'databaseProperties', 'description', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'database_display_name': _params.databaseDisplayName,
      'database_type': _params.databaseType,
      'associated_catalog': _params.associatedCatalog,
      'created_on': _params.createdOn,
      'database_details': _params.databaseDetails,
      'database_properties': _params.databaseProperties,
      'description': _params.description,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createDatabaseRegistration');

    const parameters = {
      options: {
        url: '/database_registrations',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get database.
   *
   * Get a registered databases.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.databaseId - database id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistration>>}
   */
  public getDatabase(
    params: WatsonxDataV2.GetDatabaseParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['databaseId'];
    const _validParams = ['databaseId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'database_id': _params.databaseId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getDatabase');

    const parameters = {
      options: {
        url: '/database_registrations/{database_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete database.
   *
   * Delete a database.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.databaseId - database id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteDatabaseCatalog(
    params: WatsonxDataV2.DeleteDatabaseCatalogParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['databaseId'];
    const _validParams = ['databaseId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'database_id': _params.databaseId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteDatabaseCatalog');

    const parameters = {
      options: {
        url: '/database_registrations/{database_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update database.
   *
   * Update database details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.databaseId - database id.
   * @param {DatabaseRegistrationPatchDatabaseDetails} [params.databaseDetails] - New database details.
   * @param {string} [params.databaseDisplayName] - New database display name.
   * @param {string} [params.description] - New database description.
   * @param {string[]} [params.tags] - New tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistration>>}
   */
  public updateDatabase(
    params: WatsonxDataV2.UpdateDatabaseParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.DatabaseRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['databaseId'];
    const _validParams = ['databaseId', 'databaseDetails', 'databaseDisplayName', 'description', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'database_details': _params.databaseDetails,
      'database_display_name': _params.databaseDisplayName,
      'description': _params.description,
      'tags': _params.tags,
    };

    const path = {
      'database_id': _params.databaseId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateDatabase');

    const parameters = {
      options: {
        url: '/database_registrations/{database_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * otherEngines
   ************************/

  /**
   * List other engines.
   *
   * list all other engine details.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.OtherEngineCollection>>}
   */
  public listOtherEngines(
    params?: WatsonxDataV2.ListOtherEnginesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.OtherEngineCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listOtherEngines');

    const parameters = {
      options: {
        url: '/other_engines',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create other engine.
   *
   * Create a new engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {OtherEngineDetailsBody} params.engineDetails - External engine details.
   * @param {string} params.engineDisplayName - engine display name.
   * @param {string} [params.description] - engine description.
   * @param {string} [params.origin] - Origin - created or registered.
   * @param {string[]} [params.tags] - other engine tags.
   * @param {string} [params.type] - Engine type.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.OtherEngine>>}
   */
  public createOtherEngine(
    params: WatsonxDataV2.CreateOtherEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.OtherEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineDetails', 'engineDisplayName'];
    const _validParams = ['engineDetails', 'engineDisplayName', 'description', 'origin', 'tags', 'type', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'description': _params.description,
      'origin': _params.origin,
      'tags': _params.tags,
      'type': _params.type,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createOtherEngine');

    const parameters = {
      options: {
        url: '/other_engines',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete engine.
   *
   * Delete an engine from lakehouse.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteOtherEngine(
    params: WatsonxDataV2.DeleteOtherEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteOtherEngine');

    const parameters = {
      options: {
        url: '/other_engines/{engine_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * db2Engines
   ************************/

  /**
   * Get list of db2 engines.
   *
   * Get list of all db2 engines.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Db2EngineCollection>>}
   */
  public listDb2Engines(
    params?: WatsonxDataV2.ListDb2EnginesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Db2EngineCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listDb2Engines');

    const parameters = {
      options: {
        url: '/db2_engines',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create db2 engine.
   *
   * Create a new db2 engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.origin - Origin - created or registered.
   * @param {string} [params.description] - Engine description.
   * @param {Db2EngineDetailsBody} [params.engineDetails] - External engine details.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Db2Engine>>}
   */
  public createDb2Engine(
    params: WatsonxDataV2.CreateDb2EngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Db2Engine>> {
    const _params = { ...params };
    const _requiredParams = ['origin'];
    const _validParams = ['origin', 'description', 'engineDetails', 'engineDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origin': _params.origin,
      'description': _params.description,
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createDb2Engine');

    const parameters = {
      options: {
        url: '/db2_engines',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete db2 engine.
   *
   * Delete a db2 engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteDb2Engine(
    params: WatsonxDataV2.DeleteDb2EngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteDb2Engine');

    const parameters = {
      options: {
        url: '/db2_engines/{engine_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update db2 engine.
   *
   * Update details of db2 engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.description] - Modified description.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Db2Engine>>}
   */
  public updateDb2Engine(
    params: WatsonxDataV2.UpdateDb2EngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Db2Engine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'description', 'engineDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'engine_display_name': _params.engineDisplayName,
      'tags': _params.tags,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateDb2Engine');

    const parameters = {
      options: {
        url: '/db2_engines/{engine_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * netezzaEngines
   ************************/

  /**
   * Get list of netezza engines.
   *
   * Get list of all netezza engines.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.NetezzaEngineCollection>>}
   */
  public listNetezzaEngines(
    params?: WatsonxDataV2.ListNetezzaEnginesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.NetezzaEngineCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listNetezzaEngines');

    const parameters = {
      options: {
        url: '/netezza_engines',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create netezza engine.
   *
   * Create a new netezza engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.origin - Origin - created or registered.
   * @param {string} [params.description] - Engine description.
   * @param {NetezzaEngineDetailsBody} [params.engineDetails] - External engine details.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.NetezzaEngine>>}
   */
  public createNetezzaEngine(
    params: WatsonxDataV2.CreateNetezzaEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.NetezzaEngine>> {
    const _params = { ...params };
    const _requiredParams = ['origin'];
    const _validParams = ['origin', 'description', 'engineDetails', 'engineDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origin': _params.origin,
      'description': _params.description,
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createNetezzaEngine');

    const parameters = {
      options: {
        url: '/netezza_engines',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete netezza engine.
   *
   * Delete a netezza engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteNetezzaEngine(
    params: WatsonxDataV2.DeleteNetezzaEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteNetezzaEngine');

    const parameters = {
      options: {
        url: '/netezza_engines/{engine_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update netezza engine.
   *
   * Update details of netezza engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.description] - Modified description.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.NetezzaEngine>>}
   */
  public updateNetezzaEngine(
    params: WatsonxDataV2.UpdateNetezzaEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.NetezzaEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'description', 'engineDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'engine_display_name': _params.engineDisplayName,
      'tags': _params.tags,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateNetezzaEngine');

    const parameters = {
      options: {
        url: '/netezza_engines/{engine_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * prestissimoEngines
   ************************/

  /**
   * Get list of prestissimo engines.
   *
   * Get list of all prestissimo engines.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngineCollection>>}
   */
  public listPrestissimoEngines(
    params?: WatsonxDataV2.ListPrestissimoEnginesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngineCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listPrestissimoEngines');

    const parameters = {
      options: {
        url: '/prestissimo_engines',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create prestissimo engine.
   *
   * Create a new prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.origin - Origin - created or registered.
   * @param {string[]} [params.associatedCatalogs] - Associated catalogs.
   * @param {string} [params.description] - Engine description.
   * @param {PrestissimoEngineDetails} [params.engineDetails] - External engine details.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string} [params.region] - Region (cloud).
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.version] - Version like 0.278 for prestissimo or else.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngine>>}
   */
  public createPrestissimoEngine(
    params: WatsonxDataV2.CreatePrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngine>> {
    const _params = { ...params };
    const _requiredParams = ['origin'];
    const _validParams = ['origin', 'associatedCatalogs', 'description', 'engineDetails', 'engineDisplayName', 'region', 'tags', 'version', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origin': _params.origin,
      'associated_catalogs': _params.associatedCatalogs,
      'description': _params.description,
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'region': _params.region,
      'tags': _params.tags,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createPrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get prestissimo engine.
   *
   * Get details of one prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngine>>}
   */
  public getPrestissimoEngine(
    params: WatsonxDataV2.GetPrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getPrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete prestissimo engine.
   *
   * Delete a prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deletePrestissimoEngine(
    params: WatsonxDataV2.DeletePrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deletePrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update prestissimo engine.
   *
   * Update details of prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.description] - Modified description.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {PrestissimoEngineEngineProperties} [params.engineProperties] - Engine properties.
   * @param {string} [params.engineRestart] - Triggers engine restart if value is force.
   * @param {RemoveEngineProperties} [params.removeEngineProperties] - RemoveEngine properties.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngine>>}
   */
  public updatePrestissimoEngine(
    params: WatsonxDataV2.UpdatePrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestissimoEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'description', 'engineDisplayName', 'engineProperties', 'engineRestart', 'removeEngineProperties', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'engine_display_name': _params.engineDisplayName,
      'engine_properties': _params.engineProperties,
      'engine_restart': _params.engineRestart,
      'remove_engine_properties': _params.removeEngineProperties,
      'tags': _params.tags,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updatePrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get prestissimo engine catalogs.
   *
   * Get list of all catalogs attached a prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public listPrestissimoEngineCatalogs(
    params: WatsonxDataV2.ListPrestissimoEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listPrestissimoEngineCatalogs');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/catalogs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Associate catalogs to a prestissimo engine.
   *
   * Associate one or more catalogs to a prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.catalogNames] - catalog names.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public addPrestissimoEngineCatalogs(
    params: WatsonxDataV2.AddPrestissimoEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'catalogNames', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'catalog_names': _params.catalogNames,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'addPrestissimoEngineCatalogs');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/catalogs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Disassociate catalogs from a prestissimo engine.
   *
   * Disassociate one or more catalogs from a prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogNames - Catalog id(s) to be stopped, comma separated.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deletePrestissimoEngineCatalogs(
    params: WatsonxDataV2.DeletePrestissimoEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogNames'];
    const _validParams = ['engineId', 'catalogNames', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'catalog_names': _params.catalogNames,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deletePrestissimoEngineCatalogs');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/catalogs',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get prestissimo engine catalog.
   *
   * Get catalog attached to a prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>>}
   */
  public getPrestissimoEngineCatalog(
    params: WatsonxDataV2.GetPrestissimoEngineCatalogParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId'];
    const _validParams = ['engineId', 'catalogId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getPrestissimoEngineCatalog');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/catalogs/{catalog_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Pause prestissimo engine.
   *
   * Pause a running prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public pausePrestissimoEngine(
    params: WatsonxDataV2.PausePrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'pausePrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/pause',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Explain query.
   *
   * Explain a query statement.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine id.
   * @param {string} params.statement - Presto query to determine explain plan.
   * @param {string} [params.format] - Format.
   * @param {string} [params.type] - Type.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ResultPrestissimoExplainStatement>>}
   */
  public runPrestissimoExplainStatement(
    params: WatsonxDataV2.RunPrestissimoExplainStatementParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ResultPrestissimoExplainStatement>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'statement'];
    const _validParams = ['engineId', 'statement', 'format', 'type', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'statement': _params.statement,
      'format': _params.format,
      'type': _params.type,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'runPrestissimoExplainStatement');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/query_explain',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Explain analyze.
   *
   * Return query metrics after query is complete.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine id.
   * @param {string} params.statement - Presto query to show explain analyze.
   * @param {boolean} [params.verbose] - Verbose.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ResultRunPrestissimoExplainAnalyzeStatement>>}
   */
  public runPrestissimoExplainAnalyzeStatement(
    params: WatsonxDataV2.RunPrestissimoExplainAnalyzeStatementParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ResultRunPrestissimoExplainAnalyzeStatement>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'statement'];
    const _validParams = ['engineId', 'statement', 'verbose', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'statement': _params.statement,
      'verbose': _params.verbose,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'runPrestissimoExplainAnalyzeStatement');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/query_explain_analyze',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Restart a prestissimo engine.
   *
   * Restart an existing prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public restartPrestissimoEngine(
    params: WatsonxDataV2.RestartPrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'restartPrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/restart',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Resume prestissimo engine.
   *
   * Resume a paused prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public resumePrestissimoEngine(
    params: WatsonxDataV2.ResumePrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'resumePrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/resume',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Scale a prestissimo engine.
   *
   * Scale an existing prestissimo engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {PrestissimoNodeDescriptionBody} [params.coordinator] - Node details.
   * @param {PrestissimoNodeDescriptionBody} [params.worker] - Node details.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public scalePrestissimoEngine(
    params: WatsonxDataV2.ScalePrestissimoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'coordinator', 'worker', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'coordinator': _params.coordinator,
      'worker': _params.worker,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'scalePrestissimoEngine');

    const parameters = {
      options: {
        url: '/prestissimo_engines/{engine_id}/scale',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * prestoEngines
   ************************/

  /**
   * Get list of presto engines.
   *
   * Get list of all presto engines.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngineCollection>>}
   */
  public listPrestoEngines(
    params?: WatsonxDataV2.ListPrestoEnginesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngineCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listPrestoEngines');

    const parameters = {
      options: {
        url: '/presto_engines',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create presto engine.
   *
   * Create a new presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.origin - Origin - created or registered.
   * @param {string[]} [params.associatedCatalogs] - Associated catalogs.
   * @param {string} [params.description] - Engine description.
   * @param {EngineDetailsBody} [params.engineDetails] - Node details.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string} [params.region] - Region (cloud).
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.version] - Version like 0.278 for presto or else.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngine>>}
   */
  public createPrestoEngine(
    params: WatsonxDataV2.CreatePrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngine>> {
    const _params = { ...params };
    const _requiredParams = ['origin'];
    const _validParams = ['origin', 'associatedCatalogs', 'description', 'engineDetails', 'engineDisplayName', 'region', 'tags', 'version', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origin': _params.origin,
      'associated_catalogs': _params.associatedCatalogs,
      'description': _params.description,
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'region': _params.region,
      'tags': _params.tags,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createPrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get presto engine.
   *
   * Get details of one presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngine>>}
   */
  public getPrestoEngine(
    params: WatsonxDataV2.GetPrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getPrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete presto engine.
   *
   * Delete a presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteEngine(
    params: WatsonxDataV2.DeleteEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update presto engine.
   *
   * Update details of presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.description] - Modified description.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {PrestoEngineEngineProperties} [params.engineProperties] - Engine properties.
   * @param {string} [params.engineRestart] - Triggers engine restart if value is force.
   * @param {PrestoEnginePatchRemoveEngineProperties} [params.removeEngineProperties] - RemoveEngine properties.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngine>>}
   */
  public updatePrestoEngine(
    params: WatsonxDataV2.UpdatePrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.PrestoEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'description', 'engineDisplayName', 'engineProperties', 'engineRestart', 'removeEngineProperties', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'engine_display_name': _params.engineDisplayName,
      'engine_properties': _params.engineProperties,
      'engine_restart': _params.engineRestart,
      'remove_engine_properties': _params.removeEngineProperties,
      'tags': _params.tags,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updatePrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get presto engine catalogs.
   *
   * Get list of all catalogs attached to a presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public listPrestoEngineCatalogs(
    params: WatsonxDataV2.ListPrestoEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listPrestoEngineCatalogs');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/catalogs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Associate catalogs to presto engine.
   *
   * Associate one or more catalogs to a presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.catalogNames] - catalog names.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public addPrestoEngineCatalogs(
    params: WatsonxDataV2.AddPrestoEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'catalogNames', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'catalog_names': _params.catalogNames,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'addPrestoEngineCatalogs');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/catalogs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Disassociate catalogs from a presto engine.
   *
   * Disassociate one or more catalogs from a presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogNames - Catalog id(s) to be stopped, comma separated.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deletePrestoEngineCatalogs(
    params: WatsonxDataV2.DeletePrestoEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogNames'];
    const _validParams = ['engineId', 'catalogNames', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'catalog_names': _params.catalogNames,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deletePrestoEngineCatalogs');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/catalogs',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get presto engine catalog.
   *
   * Get catalog attached to presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>>}
   */
  public getPrestoEngineCatalog(
    params: WatsonxDataV2.GetPrestoEngineCatalogParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId'];
    const _validParams = ['engineId', 'catalogId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getPrestoEngineCatalog');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/catalogs/{catalog_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Pause presto engine.
   *
   * Pause a running presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEnginePauseCreatedBody>>}
   */
  public pausePrestoEngine(
    params: WatsonxDataV2.PausePrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEnginePauseCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'pausePrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/pause',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Explain presto query.
   *
   * Explain a query statement.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine id.
   * @param {string} params.statement - Presto query to determine explain plan.
   * @param {string} [params.format] - Format.
   * @param {string} [params.type] - Type.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.RunExplainStatementOKBody>>}
   */
  public runExplainStatement(
    params: WatsonxDataV2.RunExplainStatementParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.RunExplainStatementOKBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'statement'];
    const _validParams = ['engineId', 'statement', 'format', 'type', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'statement': _params.statement,
      'format': _params.format,
      'type': _params.type,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'runExplainStatement');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/query_explain',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Explain presto analyze.
   *
   * Return query metrics after query is complete.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine id.
   * @param {string} params.statement - Presto query to show explain analyze.
   * @param {boolean} [params.verbose] - Verbose.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.RunExplainAnalyzeStatementOKBody>>}
   */
  public runExplainAnalyzeStatement(
    params: WatsonxDataV2.RunExplainAnalyzeStatementParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.RunExplainAnalyzeStatementOKBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'statement'];
    const _validParams = ['engineId', 'statement', 'verbose', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'statement': _params.statement,
      'verbose': _params.verbose,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'runExplainAnalyzeStatement');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/query_explain_analyze',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Restart a presto engine.
   *
   * Restart an existing presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEngineRestartCreatedBody>>}
   */
  public restartPrestoEngine(
    params: WatsonxDataV2.RestartPrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEngineRestartCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'restartPrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/restart',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Resume presto engine.
   *
   * Resume a paused presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEngineResumeCreatedBody>>}
   */
  public resumePrestoEngine(
    params: WatsonxDataV2.ResumePrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEngineResumeCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'resumePrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/resume',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Scale a presto engine.
   *
   * Scale an existing presto engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {NodeDescription} [params.coordinator] - NodeDescription.
   * @param {NodeDescription} [params.worker] - NodeDescription.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEngineScaleCreatedBody>>}
   */
  public scalePrestoEngine(
    params: WatsonxDataV2.ScalePrestoEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateEngineScaleCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'coordinator', 'worker', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'coordinator': _params.coordinator,
      'worker': _params.worker,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'scalePrestoEngine');

    const parameters = {
      options: {
        url: '/presto_engines/{engine_id}/scale',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * sparkEngines
   ************************/

  /**
   * List all spark engines.
   *
   * List all spark engines.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineCollection>>}
   */
  public listSparkEngines(
    params?: WatsonxDataV2.ListSparkEnginesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listSparkEngines');

    const parameters = {
      options: {
        url: '/spark_engines',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create spark engine.
   *
   * Create a new spark  engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.origin - Origin - created or registered.
   * @param {string[]} [params.associatedCatalogs] - Associated catalogs.
   * @param {string} [params.description] - Engine description.
   * @param {SparkEngineDetailsPrototype} [params.engineDetails] - Node details.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string} [params.status] - Engine status.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngine>>}
   */
  public createSparkEngine(
    params: WatsonxDataV2.CreateSparkEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngine>> {
    const _params = { ...params };
    const _requiredParams = ['origin'];
    const _validParams = ['origin', 'associatedCatalogs', 'description', 'engineDetails', 'engineDisplayName', 'status', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origin': _params.origin,
      'associated_catalogs': _params.associatedCatalogs,
      'description': _params.description,
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'status': _params.status,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createSparkEngine');

    const parameters = {
      options: {
        url: '/spark_engines',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get spark engine.
   *
   * Get spark engine by ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngine>>}
   */
  public getSparkEngine(
    params: WatsonxDataV2.GetSparkEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getSparkEngine');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete spark engine.
   *
   * Delete a spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteSparkEngine(
    params: WatsonxDataV2.DeleteSparkEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSparkEngine');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update spark engine.
   *
   * Update details of spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.description] - Modified description.
   * @param {UpdateSparkEngineBodyEngineDetails} [params.engineDetails] - Engine details.
   * @param {string} [params.engineDisplayName] - Engine display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngine>>}
   */
  public updateSparkEngine(
    params: WatsonxDataV2.UpdateSparkEngineParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngine>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'description', 'engineDetails', 'engineDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'engine_details': _params.engineDetails,
      'engine_display_name': _params.engineDisplayName,
      'tags': _params.tags,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateSparkEngine');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all applications in a spark engine.
   *
   * List all applications in a spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {string[]} [params.state] - state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineApplicationStatusCollection>>}
   */
  public listSparkEngineApplications(
    params: WatsonxDataV2.ListSparkEngineApplicationsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineApplicationStatusCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'state', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listSparkEngineApplications');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/applications',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Submit engine applications.
   *
   * Submit engine applications.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {SparkApplicationDetails} params.applicationDetails - Application details.
   * @param {string} [params.jobEndpoint] - Job endpoint.
   * @param {string} [params.serviceInstanceId] - Service Instance ID for POST.
   * @param {string} [params.type] - Engine Type.
   * @param {SparkVolumeDetails[]} [params.volumes] - Spark application volumes to mount.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {string[]} [params.state] - state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineApplicationStatus>>}
   */
  public createSparkEngineApplication(
    params: WatsonxDataV2.CreateSparkEngineApplicationParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineApplicationStatus>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'applicationDetails'];
    const _validParams = ['engineId', 'applicationDetails', 'jobEndpoint', 'serviceInstanceId', 'type', 'volumes', 'authInstanceId', 'state', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'application_details': _params.applicationDetails,
      'job_endpoint': _params.jobEndpoint,
      'service_instance_id': _params.serviceInstanceId,
      'type': _params.type,
      'volumes': _params.volumes,
    };

    const query = {
      'state': _params.state,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createSparkEngineApplication');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/applications',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Stop Spark Applications.
   *
   * Stop a running spark application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.applicationId - Application id(s) to be stopped, comma separated.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {string[]} [params.state] - state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteSparkEngineApplications(
    params: WatsonxDataV2.DeleteSparkEngineApplicationsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'applicationId'];
    const _validParams = ['engineId', 'applicationId', 'authInstanceId', 'state', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'application_id': _params.applicationId,
      'state': _params.state,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSparkEngineApplications');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/applications',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get spark application.
   *
   * Get status of spark application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.applicationId - Application id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineApplicationStatus>>}
   */
  public getSparkEngineApplicationStatus(
    params: WatsonxDataV2.GetSparkEngineApplicationStatusParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkEngineApplicationStatus>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'applicationId'];
    const _validParams = ['engineId', 'applicationId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
      'application_id': _params.applicationId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getSparkEngineApplicationStatus');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/applications/{application_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get spark engine catalogs.
   *
   * Get list of all catalogs attached to a spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public listSparkEngineCatalogs(
    params: WatsonxDataV2.ListSparkEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listSparkEngineCatalogs');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/catalogs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Associate catalogs to spark engine.
   *
   * Associate one or more catalogs to a spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.catalogNames] - catalog names.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public addSparkEngineCatalogs(
    params: WatsonxDataV2.AddSparkEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'catalogNames', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'catalog_names': _params.catalogNames,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'addSparkEngineCatalogs');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/catalogs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Disassociate catalogs from a spark engine.
   *
   * Disassociate one or more catalogs from a spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogNames - Catalog id(s) to be stopped, comma separated.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteSparkEngineCatalogs(
    params: WatsonxDataV2.DeleteSparkEngineCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogNames'];
    const _validParams = ['engineId', 'catalogNames', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'catalog_names': _params.catalogNames,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSparkEngineCatalogs');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/catalogs',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get spark engine catalog.
   *
   * Get catalog attached to spark engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>>}
   */
  public getSparkEngineCatalog(
    params: WatsonxDataV2.GetSparkEngineCatalogParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId'];
    const _validParams = ['engineId', 'catalogId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getSparkEngineCatalog');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/catalogs/{catalog_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get spark history server.
   *
   * Get spark history server.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkHistoryServer>>}
   */
  public getSparkEngineHistoryServer(
    params: WatsonxDataV2.GetSparkEngineHistoryServerParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkHistoryServer>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getSparkEngineHistoryServer');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/history_server',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Start spark history server.
   *
   * Start spark history server.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.cores] - CPU count.
   * @param {string} [params.memory] - Memory in GiB.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkHistoryServer>>}
   */
  public startSparkEngineHistoryServer(
    params: WatsonxDataV2.StartSparkEngineHistoryServerParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SparkHistoryServer>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'cores', 'memory', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cores': _params.cores,
      'memory': _params.memory,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'startSparkEngineHistoryServer');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/history_server',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Stop spark history server.
   *
   * Stop spark history server.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteSparkEngineHistoryServer(
    params: WatsonxDataV2.DeleteSparkEngineHistoryServerParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSparkEngineHistoryServer');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/history_server',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Pause engine.
   *
   * Pause engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public createSparkEnginePause(
    params: WatsonxDataV2.CreateSparkEnginePauseParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createSparkEnginePause');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/pause',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Resume engine.
   *
   * Resume engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public createSparkEngineResume(
    params: WatsonxDataV2.CreateSparkEngineResumeParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createSparkEngineResume');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/resume',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Scale Spark engine.
   *
   * Scale Saprk engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {number} [params.numberOfNodes] - Node count.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>>}
   */
  public createSparkEngineScale(
    params: WatsonxDataV2.CreateSparkEngineScaleParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.SuccessResponse>> {
    const _params = { ...params };
    const _requiredParams = ['engineId'];
    const _validParams = ['engineId', 'numberOfNodes', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'number_of_nodes': _params.numberOfNodes,
    };

    const path = {
      'engine_id': _params.engineId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createSparkEngineScale');

    const parameters = {
      options: {
        url: '/spark_engines/{engine_id}/scale',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List spark version.
   *
   * List spark version.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ListSparkVersionsOKBody>>}
   */
  public listSparkVersions(
    params?: WatsonxDataV2.ListSparkVersionsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ListSparkVersionsOKBody>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listSparkVersions');

    const parameters = {
      options: {
        url: '/spark_versions',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * catalogs
   ************************/

  /**
   * List all registered catalogs.
   *
   * List all registered catalogs.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>>}
   */
  public listCatalogs(
    params?: WatsonxDataV2.ListCatalogsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CatalogCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listCatalogs');

    const parameters = {
      options: {
        url: '/catalogs',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get catalog properties by catalog_id.
   *
   * Get catalog properties of a catalog identified by catalog_id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogId - catalog ID.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>>}
   */
  public getCatalog(
    params: WatsonxDataV2.GetCatalogParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Catalog>> {
    const _params = { ...params };
    const _requiredParams = ['catalogId'];
    const _validParams = ['catalogId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getCatalog');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all schemas.
   *
   * List all schemas in catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine name.
   * @param {string} params.catalogId - Catalog name.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ListSchemasOKBody>>}
   */
  public listSchemas(
    params: WatsonxDataV2.ListSchemasParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ListSchemasOKBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId'];
    const _validParams = ['engineId', 'catalogId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listSchemas');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create schema.
   *
   * Create a new schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine name.
   * @param {string} params.catalogId - Catalog name.
   * @param {string} params.customPath - Path associated with bucket.
   * @param {string} params.schemaName - Schema name.
   * @param {string} [params.bucketName] - Bucket associated to metastore where schema will be added.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateSchemaCreatedBody>>}
   */
  public createSchema(
    params: WatsonxDataV2.CreateSchemaParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.CreateSchemaCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'customPath', 'schemaName'];
    const _validParams = ['engineId', 'catalogId', 'customPath', 'schemaName', 'bucketName', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'custom_path': _params.customPath,
      'schema_name': _params.schemaName,
      'bucket_name': _params.bucketName,
    };

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createSchema');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete schema.
   *
   * Delete a schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine name.
   * @param {string} params.catalogId - Catalog name.
   * @param {string} params.schemaId - URL encoded Schema name.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteSchema(
    params: WatsonxDataV2.DeleteSchemaParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSchema');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all tables.
   *
   * List all tables in a schema in a catalog for a given engine.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.TableCollection>>}
   */
  public listTables(
    params: WatsonxDataV2.ListTablesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.TableCollection>> {
    const _params = { ...params };
    const _requiredParams = ['catalogId', 'schemaId', 'engineId'];
    const _validParams = ['catalogId', 'schemaId', 'engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listTables');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get table details.
   *
   * Get details of a given table in a catalog and schema.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded table name.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Table>>}
   */
  public getTable(
    params: WatsonxDataV2.GetTableParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Table>> {
    const _params = { ...params };
    const _requiredParams = ['catalogId', 'schemaId', 'tableId', 'engineId'];
    const _validParams = ['catalogId', 'schemaId', 'tableId', 'engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getTable');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete table.
   *
   * Delete table for a given schema and catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded table name.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteTable(
    params: WatsonxDataV2.DeleteTableParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogId', 'schemaId', 'tableId', 'engineId'];
    const _validParams = ['catalogId', 'schemaId', 'tableId', 'engineId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteTable');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Rename table.
   *
   * Rename table.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded table name.
   * @param {string} params.engineId - engine id.
   * @param {string} [params.tableName] - New table name.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Table>>}
   */
  public renameTable(
    params: WatsonxDataV2.RenameTableParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Table>> {
    const _params = { ...params };
    const _requiredParams = ['catalogId', 'schemaId', 'tableId', 'engineId'];
    const _validParams = ['catalogId', 'schemaId', 'tableId', 'engineId', 'tableName', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'table_name': _params.tableName,
    };

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'renameTable');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all columns of a table.
   *
   * List all columns of a table in a given a schema for a given catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded schema name.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ColumnCollection>>}
   */
  public listColumns(
    params: WatsonxDataV2.ListColumnsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ColumnCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId', 'tableId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listColumns');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add column(s).
   *
   * Add one or multiple columns to a table in a schema for a given catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded schema name.
   * @param {Column[]} [params.columns] - List of the tables present in the schema.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ColumnCollection>>}
   */
  public createColumns(
    params: WatsonxDataV2.CreateColumnsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ColumnCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId', 'tableId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'columns', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'columns': _params.columns,
    };

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createColumns');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete column.
   *
   * Delete column in a table for a given schema and catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded schema name.
   * @param {string} params.columnId - URL encoded schema name.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteColumn(
    params: WatsonxDataV2.DeleteColumnParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'columnId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'columnId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
      'column_id': _params.columnId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteColumn');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns/{column_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Alter column.
   *
   * Update the given column - rename column.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - engine id.
   * @param {string} params.catalogId - catalog id.
   * @param {string} params.schemaId - URL encoded schema name.
   * @param {string} params.tableId - URL encoded schema name.
   * @param {string} params.columnId - URL encoded schema name.
   * @param {string} [params.columnName] - Column name.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.Column>>}
   */
  public updateColumn(
    params: WatsonxDataV2.UpdateColumnParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.Column>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'columnId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'columnId', 'columnName', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'column_name': _params.columnName,
    };

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
      'column_id': _params.columnId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateColumn');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns/{column_id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get table snapshots.
   *
   * List all table snapshots.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine name.
   * @param {string} params.catalogId - Catalog ID.
   * @param {string} params.schemaId - Schema ID.
   * @param {string} params.tableId - Table ID.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.TableSnapshotCollection>>}
   */
  public listTableSnapshots(
    params: WatsonxDataV2.ListTableSnapshotsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.TableSnapshotCollection>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId', 'tableId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listTableSnapshots');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/snapshots',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Rollback table to snapshot.
   *
   * Rollback table to a snapshot.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.engineId - Engine name.
   * @param {string} params.catalogId - Catalog ID.
   * @param {string} params.schemaId - Schema ID.
   * @param {string} params.tableId - Table ID.
   * @param {string} [params.snapshotId] - Snapshot Id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.ReplaceSnapshotCreatedBody>>}
   */
  public rollbackTable(
    params: WatsonxDataV2.RollbackTableParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.ReplaceSnapshotCreatedBody>> {
    const _params = { ...params };
    const _requiredParams = ['engineId', 'catalogId', 'schemaId', 'tableId'];
    const _validParams = ['engineId', 'catalogId', 'schemaId', 'tableId', 'snapshotId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'snapshot_id': _params.snapshotId,
    };

    const query = {
      'engine_id': _params.engineId,
    };

    const path = {
      'catalog_id': _params.catalogId,
      'schema_id': _params.schemaId,
      'table_id': _params.tableId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'rollbackTable');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/rollback',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * External Iceberg table registration.
   *
   * Synchronize the external Iceberg table registration for a catalog identified by catalog_id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogId - catalog ID.
   * @param {boolean} params.autoAddNewTables - Auto add new table.
   * @param {boolean} params.syncIcebergMd - Sync iceberg metadata.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.UpdateSyncCatalogOKBody>>}
   */
  public updateSyncCatalog(
    params: WatsonxDataV2.UpdateSyncCatalogParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.UpdateSyncCatalogOKBody>> {
    const _params = { ...params };
    const _requiredParams = ['catalogId', 'autoAddNewTables', 'syncIcebergMd'];
    const _validParams = ['catalogId', 'autoAddNewTables', 'syncIcebergMd', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'auto_add_new_tables': _params.autoAddNewTables,
      'sync_iceberg_md': _params.syncIcebergMd,
    };

    const path = {
      'catalog_id': _params.catalogId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateSyncCatalog');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_id}/sync',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * services
   ************************/

  /**
   * Get list of milvus services.
   *
   * Get list milvus services.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusServiceCollection>>}
   */
  public listMilvusServices(
    params?: WatsonxDataV2.ListMilvusServicesParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusServiceCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listMilvusServices');

    const parameters = {
      options: {
        url: '/milvus_services',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create milvus service.
   *
   * Create milvus service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.origin - Origin - place holder.
   * @param {string} [params.description] - Service description.
   * @param {string} [params.serviceDisplayName] - Service display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusService>>}
   */
  public createMilvusService(
    params: WatsonxDataV2.CreateMilvusServiceParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusService>> {
    const _params = { ...params };
    const _requiredParams = ['origin'];
    const _validParams = ['origin', 'description', 'serviceDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'origin': _params.origin,
      'description': _params.description,
      'service_display_name': _params.serviceDisplayName,
      'tags': _params.tags,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'createMilvusService');

    const parameters = {
      options: {
        url: '/milvus_services',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get milvus service.
   *
   * Get milvus service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.serviceId - service id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusService>>}
   */
  public getMilvusService(
    params: WatsonxDataV2.GetMilvusServiceParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusService>> {
    const _params = { ...params };
    const _requiredParams = ['serviceId'];
    const _validParams = ['serviceId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'service_id': _params.serviceId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'getMilvusService');

    const parameters = {
      options: {
        url: '/milvus_services/{service_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete milvus service.
   *
   * Delete milvus service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.serviceId - service id.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>>}
   */
  public deleteMilvusService(
    params: WatsonxDataV2.DeleteMilvusServiceParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['serviceId'];
    const _validParams = ['serviceId', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'service_id': _params.serviceId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteMilvusService');

    const parameters = {
      options: {
        url: '/milvus_services/{service_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update milvus service.
   *
   * Update details of milvus service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.serviceId - service id.
   * @param {string} [params.description] - Modified description.
   * @param {string} [params.serviceDisplayName] - Service display name.
   * @param {string[]} [params.tags] - Tags.
   * @param {string} [params.authInstanceId] - CRN.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusService>>}
   */
  public updateMilvusService(
    params: WatsonxDataV2.UpdateMilvusServiceParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.MilvusService>> {
    const _params = { ...params };
    const _requiredParams = ['serviceId'];
    const _validParams = ['serviceId', 'description', 'serviceDisplayName', 'tags', 'authInstanceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'service_display_name': _params.serviceDisplayName,
      'tags': _params.tags,
    };

    const path = {
      'service_id': _params.serviceId,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'updateMilvusService');

    const parameters = {
      options: {
        url: '/milvus_services/{service_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * ingestion
   ************************/

  /**
   * Get ingestion jobs.
   *
   * Get list of ingestion jobs.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.authInstanceId - watsonx.data instance ID.
   * @param {string} [params.start] - Page number of requested ingestion jobs.
   * @param {number} [params.jobsPerPage] - Number of requested ingestion jobs.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WatsonxDataV2.Response<WatsonxDataV2.IngestionJobCollection>>}
   */
  public listIngestionJobs(
    params: WatsonxDataV2.ListIngestionJobsParams
  ): Promise<WatsonxDataV2.Response<WatsonxDataV2.IngestionJobCollection>> {
    const _params = { ...params };
    const _requiredParams = ['authInstanceId'];
    const _validParams = ['authInstanceId', 'start', 'jobsPerPage', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'jobs_per_page': _params.jobsPerPage,
    };

    const sdkHeaders = getSdkHeaders(WatsonxDataV2.DEFAULT_SERVICE_NAME, 'v2', 'listIngestionJobs');

    const parameters = {
      options: {
        url: '/ingestion_jobs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'AuthInstanceId': _params.authInstanceId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace WatsonxDataV2 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listBucketRegistrations` operation. */
  export interface ListBucketRegistrationsParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createBucketRegistration` operation. */
  export interface CreateBucketRegistrationParams {
    /** bucket details. */
    bucketDetails: BucketDetails;
    /** bucket type. */
    bucketType: CreateBucketRegistrationConstants.BucketType | string;
    /** bucket description. */
    description: string;
    /** managed by. */
    managedBy: CreateBucketRegistrationConstants.ManagedBy | string;
    /** bucket catalog. */
    associatedCatalog?: BucketCatalog;
    /** bucket display name. */
    bucketDisplayName?: string;
    /** region where the bucket is located. */
    region?: string;
    /** tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createBucketRegistration` operation. */
  export namespace CreateBucketRegistrationConstants {
    /** bucket type. */
    export enum BucketType {
      AWS_S3 = 'aws_s3',
      MINIO = 'minio',
      IBM_COS = 'ibm_cos',
      IBM_CEPH = 'ibm_ceph',
    }
    /** managed by. */
    export enum ManagedBy {
      IBM = 'ibm',
      CUSTOMER = 'customer',
    }
  }

  /** Parameters for the `getBucketRegistration` operation. */
  export interface GetBucketRegistrationParams {
    /** bucket id. */
    bucketId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deregisterBucket` operation. */
  export interface DeregisterBucketParams {
    /** bucket id. */
    bucketId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBucketRegistration` operation. */
  export interface UpdateBucketRegistrationParams {
    /** bucket id. */
    bucketId: string;
    /** bucket details. */
    bucketDetails?: BucketDetails;
    /** bucket display name. */
    bucketDisplayName?: string;
    /** modified description. */
    description?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createActivateBucket` operation. */
  export interface CreateActivateBucketParams {
    /** bucket id. */
    bucketId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDeactivateBucket` operation. */
  export interface DeleteDeactivateBucketParams {
    /** bucket id. */
    bucketId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listBucketObjects` operation. */
  export interface ListBucketObjectsParams {
    /** bucket id. */
    bucketId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDatabaseRegistrations` operation. */
  export interface ListDatabaseRegistrationsParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDatabaseRegistration` operation. */
  export interface CreateDatabaseRegistrationParams {
    /** Database display name. */
    databaseDisplayName: string;
    /** Connector type. */
    databaseType: string;
    /** database catalog. */
    associatedCatalog?: DatabaseCatalog;
    /** Created on. */
    createdOn?: string;
    /** database details. */
    databaseDetails?: DatabaseDetails;
    /** This will hold all the properties for a custom database. */
    databaseProperties?: DatabaseRegistrationPrototypeDatabasePropertiesItems[];
    /** Database description. */
    description?: string;
    /** tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDatabase` operation. */
  export interface GetDatabaseParams {
    /** database id. */
    databaseId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDatabaseCatalog` operation. */
  export interface DeleteDatabaseCatalogParams {
    /** database id. */
    databaseId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDatabase` operation. */
  export interface UpdateDatabaseParams {
    /** database id. */
    databaseId: string;
    /** New database details. */
    databaseDetails?: DatabaseRegistrationPatchDatabaseDetails;
    /** New database display name. */
    databaseDisplayName?: string;
    /** New database description. */
    description?: string;
    /** New tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listOtherEngines` operation. */
  export interface ListOtherEnginesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createOtherEngine` operation. */
  export interface CreateOtherEngineParams {
    /** External engine details. */
    engineDetails: OtherEngineDetailsBody;
    /** engine display name. */
    engineDisplayName: string;
    /** engine description. */
    description?: string;
    /** Origin - created or registered. */
    origin?: CreateOtherEngineConstants.Origin | string;
    /** other engine tags. */
    tags?: string[];
    /** Engine type. */
    type?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createOtherEngine` operation. */
  export namespace CreateOtherEngineConstants {
    /** Origin - created or registered. */
    export enum Origin {
      NATIVE = 'native',
      EXTERNAL = 'external',
      DISCOVER = 'discover',
    }
  }

  /** Parameters for the `deleteOtherEngine` operation. */
  export interface DeleteOtherEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDb2Engines` operation. */
  export interface ListDb2EnginesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDb2Engine` operation. */
  export interface CreateDb2EngineParams {
    /** Origin - created or registered. */
    origin: CreateDb2EngineConstants.Origin | string;
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engineDetails?: Db2EngineDetailsBody;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDb2Engine` operation. */
  export namespace CreateDb2EngineConstants {
    /** Origin - created or registered. */
    export enum Origin {
      NATIVE = 'native',
      EXTERNAL = 'external',
      DISCOVER = 'discover',
    }
  }

  /** Parameters for the `deleteDb2Engine` operation. */
  export interface DeleteDb2EngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDb2Engine` operation. */
  export interface UpdateDb2EngineParams {
    /** engine id. */
    engineId: string;
    /** Modified description. */
    description?: string;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listNetezzaEngines` operation. */
  export interface ListNetezzaEnginesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createNetezzaEngine` operation. */
  export interface CreateNetezzaEngineParams {
    /** Origin - created or registered. */
    origin: CreateNetezzaEngineConstants.Origin | string;
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engineDetails?: NetezzaEngineDetailsBody;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createNetezzaEngine` operation. */
  export namespace CreateNetezzaEngineConstants {
    /** Origin - created or registered. */
    export enum Origin {
      NATIVE = 'native',
      EXTERNAL = 'external',
      DISCOVER = 'discover',
    }
  }

  /** Parameters for the `deleteNetezzaEngine` operation. */
  export interface DeleteNetezzaEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateNetezzaEngine` operation. */
  export interface UpdateNetezzaEngineParams {
    /** engine id. */
    engineId: string;
    /** Modified description. */
    description?: string;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPrestissimoEngines` operation. */
  export interface ListPrestissimoEnginesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPrestissimoEngine` operation. */
  export interface CreatePrestissimoEngineParams {
    /** Origin - created or registered. */
    origin: CreatePrestissimoEngineConstants.Origin | string;
    /** Associated catalogs. */
    associatedCatalogs?: string[];
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engineDetails?: PrestissimoEngineDetails;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Region (cloud). */
    region?: string;
    /** Tags. */
    tags?: string[];
    /** Version like 0.278 for prestissimo or else. */
    version?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createPrestissimoEngine` operation. */
  export namespace CreatePrestissimoEngineConstants {
    /** Origin - created or registered. */
    export enum Origin {
      NATIVE = 'native',
      EXTERNAL = 'external',
      DISCOVER = 'discover',
    }
  }

  /** Parameters for the `getPrestissimoEngine` operation. */
  export interface GetPrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePrestissimoEngine` operation. */
  export interface DeletePrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePrestissimoEngine` operation. */
  export interface UpdatePrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** Modified description. */
    description?: string;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Engine properties. */
    engineProperties?: PrestissimoEngineEngineProperties;
    /** Triggers engine restart if value is force. */
    engineRestart?: UpdatePrestissimoEngineConstants.EngineRestart | string;
    /** RemoveEngine properties. */
    removeEngineProperties?: RemoveEngineProperties;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updatePrestissimoEngine` operation. */
  export namespace UpdatePrestissimoEngineConstants {
    /** Triggers engine restart if value is force. */
    export enum EngineRestart {
      FORCE = 'force',
      FALSE = 'false',
    }
  }

  /** Parameters for the `listPrestissimoEngineCatalogs` operation. */
  export interface ListPrestissimoEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addPrestissimoEngineCatalogs` operation. */
  export interface AddPrestissimoEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** catalog names. */
    catalogNames?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePrestissimoEngineCatalogs` operation. */
  export interface DeletePrestissimoEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** Catalog id(s) to be stopped, comma separated. */
    catalogNames: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPrestissimoEngineCatalog` operation. */
  export interface GetPrestissimoEngineCatalogParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `pausePrestissimoEngine` operation. */
  export interface PausePrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `runPrestissimoExplainStatement` operation. */
  export interface RunPrestissimoExplainStatementParams {
    /** Engine id. */
    engineId: string;
    /** Presto query to determine explain plan. */
    statement: string;
    /** Format. */
    format?: RunPrestissimoExplainStatementConstants.Format | string;
    /** Type. */
    type?: RunPrestissimoExplainStatementConstants.Type | string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `runPrestissimoExplainStatement` operation. */
  export namespace RunPrestissimoExplainStatementConstants {
    /** Format. */
    export enum Format {
      TEXT = 'text',
      GRAPHVIZ = 'graphviz',
      JSON = 'json',
    }
    /** Type. */
    export enum Type {
      LOGICAL = 'logical',
      DISTRIBUTED = 'distributed',
      VALIDATE = 'validate',
      IO = 'io',
    }
  }

  /** Parameters for the `runPrestissimoExplainAnalyzeStatement` operation. */
  export interface RunPrestissimoExplainAnalyzeStatementParams {
    /** Engine id. */
    engineId: string;
    /** Presto query to show explain analyze. */
    statement: string;
    /** Verbose. */
    verbose?: boolean;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `restartPrestissimoEngine` operation. */
  export interface RestartPrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `resumePrestissimoEngine` operation. */
  export interface ResumePrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `scalePrestissimoEngine` operation. */
  export interface ScalePrestissimoEngineParams {
    /** engine id. */
    engineId: string;
    /** Node details. */
    coordinator?: PrestissimoNodeDescriptionBody;
    /** Node details. */
    worker?: PrestissimoNodeDescriptionBody;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPrestoEngines` operation. */
  export interface ListPrestoEnginesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPrestoEngine` operation. */
  export interface CreatePrestoEngineParams {
    /** Origin - created or registered. */
    origin: CreatePrestoEngineConstants.Origin | string;
    /** Associated catalogs. */
    associatedCatalogs?: string[];
    /** Engine description. */
    description?: string;
    /** Node details. */
    engineDetails?: EngineDetailsBody;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Region (cloud). */
    region?: string;
    /** Tags. */
    tags?: string[];
    /** Version like 0.278 for presto or else. */
    version?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createPrestoEngine` operation. */
  export namespace CreatePrestoEngineConstants {
    /** Origin - created or registered. */
    export enum Origin {
      NATIVE = 'native',
      EXTERNAL = 'external',
      DISCOVER = 'discover',
    }
  }

  /** Parameters for the `getPrestoEngine` operation. */
  export interface GetPrestoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEngine` operation. */
  export interface DeleteEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePrestoEngine` operation. */
  export interface UpdatePrestoEngineParams {
    /** engine id. */
    engineId: string;
    /** Modified description. */
    description?: string;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Engine properties. */
    engineProperties?: PrestoEngineEngineProperties;
    /** Triggers engine restart if value is force. */
    engineRestart?: UpdatePrestoEngineConstants.EngineRestart | string;
    /** RemoveEngine properties. */
    removeEngineProperties?: PrestoEnginePatchRemoveEngineProperties;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updatePrestoEngine` operation. */
  export namespace UpdatePrestoEngineConstants {
    /** Triggers engine restart if value is force. */
    export enum EngineRestart {
      FORCE = 'force',
      FALSE = 'false',
    }
  }

  /** Parameters for the `listPrestoEngineCatalogs` operation. */
  export interface ListPrestoEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addPrestoEngineCatalogs` operation. */
  export interface AddPrestoEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** catalog names. */
    catalogNames?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePrestoEngineCatalogs` operation. */
  export interface DeletePrestoEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** Catalog id(s) to be stopped, comma separated. */
    catalogNames: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPrestoEngineCatalog` operation. */
  export interface GetPrestoEngineCatalogParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `pausePrestoEngine` operation. */
  export interface PausePrestoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `runExplainStatement` operation. */
  export interface RunExplainStatementParams {
    /** Engine id. */
    engineId: string;
    /** Presto query to determine explain plan. */
    statement: string;
    /** Format. */
    format?: RunExplainStatementConstants.Format | string;
    /** Type. */
    type?: RunExplainStatementConstants.Type | string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `runExplainStatement` operation. */
  export namespace RunExplainStatementConstants {
    /** Format. */
    export enum Format {
      TEXT = 'text',
      GRAPHVIZ = 'graphviz',
      JSON = 'json',
    }
    /** Type. */
    export enum Type {
      LOGICAL = 'logical',
      DISTRIBUTED = 'distributed',
      VALIDATE = 'validate',
      IO = 'io',
    }
  }

  /** Parameters for the `runExplainAnalyzeStatement` operation. */
  export interface RunExplainAnalyzeStatementParams {
    /** Engine id. */
    engineId: string;
    /** Presto query to show explain analyze. */
    statement: string;
    /** Verbose. */
    verbose?: boolean;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `restartPrestoEngine` operation. */
  export interface RestartPrestoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `resumePrestoEngine` operation. */
  export interface ResumePrestoEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `scalePrestoEngine` operation. */
  export interface ScalePrestoEngineParams {
    /** engine id. */
    engineId: string;
    /** NodeDescription. */
    coordinator?: NodeDescription;
    /** NodeDescription. */
    worker?: NodeDescription;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSparkEngines` operation. */
  export interface ListSparkEnginesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSparkEngine` operation. */
  export interface CreateSparkEngineParams {
    /** Origin - created or registered. */
    origin: CreateSparkEngineConstants.Origin | string;
    /** Associated catalogs. */
    associatedCatalogs?: string[];
    /** Engine description. */
    description?: string;
    /** Node details. */
    engineDetails?: SparkEngineDetailsPrototype;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Engine status. */
    status?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSparkEngine` operation. */
  export namespace CreateSparkEngineConstants {
    /** Origin - created or registered. */
    export enum Origin {
      EXTERNAL = 'external',
      DISCOVER = 'discover',
      NATIVE = 'native',
    }
  }

  /** Parameters for the `getSparkEngine` operation. */
  export interface GetSparkEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSparkEngine` operation. */
  export interface DeleteSparkEngineParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSparkEngine` operation. */
  export interface UpdateSparkEngineParams {
    /** engine id. */
    engineId: string;
    /** Modified description. */
    description?: string;
    /** Engine details. */
    engineDetails?: UpdateSparkEngineBodyEngineDetails;
    /** Engine display name. */
    engineDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSparkEngineApplications` operation. */
  export interface ListSparkEngineApplicationsParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    /** state. */
    state?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSparkEngineApplication` operation. */
  export interface CreateSparkEngineApplicationParams {
    /** engine id. */
    engineId: string;
    /** Application details. */
    applicationDetails: SparkApplicationDetails;
    /** Job endpoint. */
    jobEndpoint?: string;
    /** Service Instance ID for POST. */
    serviceInstanceId?: string;
    /** Engine Type. */
    type?: CreateSparkEngineApplicationConstants.Type | string;
    /** Spark application volumes to mount. */
    volumes?: SparkVolumeDetails[];
    /** CRN. */
    authInstanceId?: string;
    /** state. */
    state?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSparkEngineApplication` operation. */
  export namespace CreateSparkEngineApplicationConstants {
    /** Engine Type. */
    export enum Type {
      IAE = 'iae',
      EMR = 'emr',
    }
  }

  /** Parameters for the `deleteSparkEngineApplications` operation. */
  export interface DeleteSparkEngineApplicationsParams {
    /** engine id. */
    engineId: string;
    /** Application id(s) to be stopped, comma separated. */
    applicationId: string;
    /** CRN. */
    authInstanceId?: string;
    /** state. */
    state?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSparkEngineApplicationStatus` operation. */
  export interface GetSparkEngineApplicationStatusParams {
    /** engine id. */
    engineId: string;
    /** Application id. */
    applicationId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSparkEngineCatalogs` operation. */
  export interface ListSparkEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addSparkEngineCatalogs` operation. */
  export interface AddSparkEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** catalog names. */
    catalogNames?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSparkEngineCatalogs` operation. */
  export interface DeleteSparkEngineCatalogsParams {
    /** engine id. */
    engineId: string;
    /** Catalog id(s) to be stopped, comma separated. */
    catalogNames: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSparkEngineCatalog` operation. */
  export interface GetSparkEngineCatalogParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSparkEngineHistoryServer` operation. */
  export interface GetSparkEngineHistoryServerParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `startSparkEngineHistoryServer` operation. */
  export interface StartSparkEngineHistoryServerParams {
    /** engine id. */
    engineId: string;
    /** CPU count. */
    cores?: string;
    /** Memory in GiB. */
    memory?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSparkEngineHistoryServer` operation. */
  export interface DeleteSparkEngineHistoryServerParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSparkEnginePause` operation. */
  export interface CreateSparkEnginePauseParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSparkEngineResume` operation. */
  export interface CreateSparkEngineResumeParams {
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSparkEngineScale` operation. */
  export interface CreateSparkEngineScaleParams {
    /** engine id. */
    engineId: string;
    /** Node count. */
    numberOfNodes?: number;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSparkVersions` operation. */
  export interface ListSparkVersionsParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCatalogs` operation. */
  export interface ListCatalogsParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCatalog` operation. */
  export interface GetCatalogParams {
    /** catalog ID. */
    catalogId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSchemas` operation. */
  export interface ListSchemasParams {
    /** Engine name. */
    engineId: string;
    /** Catalog name. */
    catalogId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSchema` operation. */
  export interface CreateSchemaParams {
    /** Engine name. */
    engineId: string;
    /** Catalog name. */
    catalogId: string;
    /** Path associated with bucket. */
    customPath: string;
    /** Schema name. */
    schemaName: string;
    /** Bucket associated to metastore where schema will be added. */
    bucketName?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSchema` operation. */
  export interface DeleteSchemaParams {
    /** Engine name. */
    engineId: string;
    /** Catalog name. */
    catalogId: string;
    /** URL encoded Schema name. */
    schemaId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTables` operation. */
  export interface ListTablesParams {
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTable` operation. */
  export interface GetTableParams {
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded table name. */
    tableId: string;
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTable` operation. */
  export interface DeleteTableParams {
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded table name. */
    tableId: string;
    /** engine id. */
    engineId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `renameTable` operation. */
  export interface RenameTableParams {
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded table name. */
    tableId: string;
    /** engine id. */
    engineId: string;
    /** New table name. */
    tableName?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listColumns` operation. */
  export interface ListColumnsParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded schema name. */
    tableId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createColumns` operation. */
  export interface CreateColumnsParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded schema name. */
    tableId: string;
    /** List of the tables present in the schema. */
    columns?: Column[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteColumn` operation. */
  export interface DeleteColumnParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded schema name. */
    tableId: string;
    /** URL encoded schema name. */
    columnId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateColumn` operation. */
  export interface UpdateColumnParams {
    /** engine id. */
    engineId: string;
    /** catalog id. */
    catalogId: string;
    /** URL encoded schema name. */
    schemaId: string;
    /** URL encoded schema name. */
    tableId: string;
    /** URL encoded schema name. */
    columnId: string;
    /** Column name. */
    columnName?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTableSnapshots` operation. */
  export interface ListTableSnapshotsParams {
    /** Engine name. */
    engineId: string;
    /** Catalog ID. */
    catalogId: string;
    /** Schema ID. */
    schemaId: string;
    /** Table ID. */
    tableId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `rollbackTable` operation. */
  export interface RollbackTableParams {
    /** Engine name. */
    engineId: string;
    /** Catalog ID. */
    catalogId: string;
    /** Schema ID. */
    schemaId: string;
    /** Table ID. */
    tableId: string;
    /** Snapshot Id. */
    snapshotId?: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSyncCatalog` operation. */
  export interface UpdateSyncCatalogParams {
    /** catalog ID. */
    catalogId: string;
    /** Auto add new table. */
    autoAddNewTables: boolean;
    /** Sync iceberg metadata. */
    syncIcebergMd: boolean;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listMilvusServices` operation. */
  export interface ListMilvusServicesParams {
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createMilvusService` operation. */
  export interface CreateMilvusServiceParams {
    /** Origin - place holder. */
    origin: string;
    /** Service description. */
    description?: string;
    /** Service display name. */
    serviceDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMilvusService` operation. */
  export interface GetMilvusServiceParams {
    /** service id. */
    serviceId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteMilvusService` operation. */
  export interface DeleteMilvusServiceParams {
    /** service id. */
    serviceId: string;
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateMilvusService` operation. */
  export interface UpdateMilvusServiceParams {
    /** service id. */
    serviceId: string;
    /** Modified description. */
    description?: string;
    /** Service display name. */
    serviceDisplayName?: string;
    /** Tags. */
    tags?: string[];
    /** CRN. */
    authInstanceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listIngestionJobs` operation. */
  export interface ListIngestionJobsParams {
    /** watsonx.data instance ID. */
    authInstanceId: string;
    /** Page number of requested ingestion jobs. */
    start?: string;
    /** Number of requested ingestion jobs. */
    jobsPerPage?: number;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * bucket catalog.
   */
  export interface BucketCatalog {
    /** catalog name. */
    catalog_name?: string;
    /** catalog tags. */
    catalog_tags?: string[];
    /** catalog type. */
    catalog_type?: string;
  }

  /**
   * bucket details.
   */
  export interface BucketDetails {
    /** Access key ID, encrypted during bucket registration. */
    access_key?: string;
    /** actual bucket name. */
    bucket_name: string;
    /** Cos endpoint. */
    endpoint?: string;
    /** Secret access key, encrypted during bucket registration. */
    secret_key?: string;
  }

  /**
   * Bucket.
   */
  export interface BucketRegistration {
    /** Actions. */
    actions?: string[];
    /** bucket catalog. */
    associated_catalog: BucketCatalog;
    /** bucket details. */
    bucket_details?: BucketDetails;
    /** bucket display name. */
    bucket_display_name?: string;
    /** bucket ID auto generated during bucket registration. */
    bucket_id?: string;
    /** bucket type. */
    bucket_type: BucketRegistration.Constants.BucketType | string;
    /** Username who created the bucket. */
    created_by: string;
    /** Creation date. */
    created_on: string;
    /** bucket description. */
    description: string;
    /** managed by. */
    managed_by: BucketRegistration.Constants.ManagedBy | string;
    /** Region where the bucket is located. */
    region?: string;
    /** mark bucket active or inactive. */
    state: BucketRegistration.Constants.State | string;
    /** tags. */
    tags?: string[];
  }
  export namespace BucketRegistration {
    export namespace Constants {
      /** bucket type. */
      export enum BucketType {
        AMAZON_S3 = 'amazon_s3',
        AWS_S3 = 'aws_s3',
        MINIO = 'minio',
        IBM_COS = 'ibm_cos',
        IBM_CEPH = 'ibm_ceph',
      }
      /** managed by. */
      export enum ManagedBy {
        IBM = 'ibm',
        CUSTOMER = 'customer',
      }
      /** mark bucket active or inactive. */
      export enum State {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
      }
    }
  }

  /**
   * List bucket registrations.
   */
  export interface BucketRegistrationCollection {
    /** Buckets. */
    bucket_registrations?: BucketRegistration[];
  }

  /**
   * List bucket objects.
   */
  export interface BucketRegistrationObjectCollection {
    /** bucket object. */
    objects?: string[];
  }

  /**
   * Define the catalog details.
   */
  export interface Catalog {
    /** list of allowed actions. */
    actions?: string[];
    /** Associated buckets items. */
    associated_buckets?: string[];
    /** Associated databases items. */
    associated_databases?: string[];
    /** Associated engines items. */
    associated_engines?: string[];
    /** Name for the catalog. */
    catalog_name?: string;
    /** Table type. */
    catalog_type?: string;
    /** Created by. */
    created_by?: string;
    /** Created on. */
    created_on?: string;
    /** Description. */
    description?: string;
    /** IBM thrift uri hostname. */
    hostname?: string;
    /** Last sync time. */
    last_sync_at?: string;
    /** Managed by. */
    managed_by?: Catalog.Constants.ManagedBy | string;
    /** Catalog name. */
    metastore?: string;
    /** IBM thrift uri port. */
    port?: string;
    /** Catalog status. */
    status?: string;
    /** Sync description. */
    sync_description?: string;
    /** Tables not sync because data is corrupted. */
    sync_exception?: string[];
    /** Sync status. */
    sync_status?: string;
    /** Tags. */
    tags?: string[];
    /** Customer thrift uri. */
    thrift_uri?: string;
  }
  export namespace Catalog {
    export namespace Constants {
      /** Managed by. */
      export enum ManagedBy {
        IBM = 'ibm',
        CUSTOMER = 'customer',
      }
    }
  }

  /**
   * GetCatalogs OK.
   */
  export interface CatalogCollection {
    /** Catalogs. */
    catalogs?: Catalog[];
  }

  /**
   * Column.
   */
  export interface Column {
    /** Column name. */
    column_name?: string;
    /** Comment. */
    comment?: string;
    /** Extra. */
    extra?: string;
    /** length. */
    length?: string;
    /** scale. */
    scale?: string;
    /** Data type. */
    type?: string;
  }

  /**
   * list of columns in a table.
   */
  export interface ColumnCollection {
    /** List of the columns present in the table. */
    columns?: Column[];
  }

  /**
   * Activate bucket.
   */
  export interface CreateActivateBucketCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * Pause.
   */
  export interface CreateEnginePauseCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * restart engine.
   */
  export interface CreateEngineRestartCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * resume.
   */
  export interface CreateEngineResumeCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * scale engine.
   */
  export interface CreateEngineScaleCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * success response.
   */
  export interface CreateSchemaCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * database catalog.
   */
  export interface DatabaseCatalog {
    /** catalog name. */
    catalog_name?: string;
    /** catalog tags. */
    catalog_tags?: string[];
    /** catalog type. */
    catalog_type?: string;
  }

  /**
   * database details.
   */
  export interface DatabaseDetails {
    /** contents of a pem/crt file. */
    certificate?: string;
    /** extension of the certificate file. */
    certificate_extension?: string;
    /** Database name. */
    database_name?: string;
    /** Host name. */
    hostname: string;
    /** Hostname in certificate. */
    hostname_in_certificate?: string;
    /** String of hostname:port. */
    hosts?: string;
    /** Psssword. */
    password?: string;
    /** Port. */
    port: number;
    /** SASL Mode. */
    sasl?: boolean;
    /** SSL Mode. */
    ssl?: boolean;
    /** Only for Kafka - Add kafka tables. */
    tables?: string;
    /** Username. */
    username?: string;
    /** Verify certificate. */
    validate_server_certificate?: boolean;
  }

  /**
   * database registration object.
   */
  export interface DatabaseRegistration {
    /** actions. */
    actions?: string[];
    /** database catalog. */
    associated_catalog?: DatabaseCatalog;
    /** Catalog name. */
    catalog_name?: string;
    /** Created by. */
    created_by?: string;
    /** Created on. */
    created_on?: string;
    /** database details. */
    database_details: DatabaseDetails;
    /** Database display name. */
    database_display_name: string;
    /** Database ID. */
    database_id?: string;
    /** This will hold all the properties for a custom database. */
    database_properties?: DatabaseRegistrationDatabasePropertiesItems[];
    /** Connector type. */
    database_type: string;
    /** Database description. */
    description?: string;
    /** tags. */
    tags?: string[];
  }

  /**
   * list database registrations.
   */
  export interface DatabaseRegistrationCollection {
    /** Database body. */
    database_registrations?: DatabaseRegistration[];
  }

  /**
   * Key value object.
   */
  export interface DatabaseRegistrationDatabasePropertiesItems {
    /** Wether the value is to be encrypted before storing. */
    encrypt: boolean;
    /** Key of the database property. */
    key: string;
    /** Value of the database property. */
    value: string;
  }

  /**
   * New database details.
   */
  export interface DatabaseRegistrationPatchDatabaseDetails {
    /** New password. */
    password?: string;
    /** New username. */
    username?: string;
  }

  /**
   * Key value object.
   */
  export interface DatabaseRegistrationPrototypeDatabasePropertiesItems {
    /** Wether the value is to be encrypted before storing. */
    encrypt: boolean;
    /** Key of the database property. */
    key: string;
    /** Value of the database property. */
    value: string;
  }

  /**
   * Db2 engine details.
   */
  export interface Db2Engine {
    /** Actions. */
    actions?: string[];
    /** watsonx.data build version. */
    build_version?: string;
    /** Created user name. */
    created_by?: string;
    /** Created time in epoch format. */
    created_on?: number;
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engine_details?: Db2EngineDetails;
    /** Engine display name. */
    engine_display_name?: string;
    /** Engine programmatic name. */
    engine_id?: string;
    /** Engine host name. In case of OCP based clusters, this is internal hostname. */
    host_name?: string;
    /** Origin - place holder. */
    origin?: string;
    /** Engine port. */
    port?: number;
    /** Engine status. */
    status?: string;
    /** Tags. */
    tags?: string[];
    /** Engine type. */
    type?: string;
  }

  /**
   * list db2 engines.
   */
  export interface Db2EngineCollection {
    /** list db2 engines. */
    db2_engines?: Db2Engine[];
  }

  /**
   * External engine details.
   */
  export interface Db2EngineDetails {
    /** External engine connection string. */
    connection_string?: string;
    /** Metastore host. */
    metastore_host?: string;
  }

  /**
   * External engine details.
   */
  export interface Db2EngineDetailsBody {
    /** External engine connection string. */
    connection_string?: string;
  }

  /**
   * DisplayNameInfoResponse.
   */
  export interface DisplayNameInfoResponse {
    /** Display name. */
    display_name: string;
  }

  /**
   * Driver.
   */
  export interface Driver {
    /** Connection type. */
    connection_type?: string;
    /** Driver name. */
    driver_id?: string;
    /** Driver name. */
    driver_name?: string;
    /** Driver version. */
    driver_version?: string;
  }

  /**
   * Node details.
   */
  export interface EngineDetailsBody {
    /** api key to work with the saas IAE instance. */
    api_key?: string;
    /** External engine connection string. */
    connection_string?: string;
    /** coordinator/worker property settings. */
    coordinator?: NodeDescriptionBody;
    /** Instance to access the instance. */
    instance_id?: string;
    /** How is the spark instance managed. */
    managed_by?: string;
    /** Size config. */
    size_config?: EngineDetailsBody.Constants.SizeConfig | string;
    /** coordinator/worker property settings. */
    worker?: NodeDescriptionBody;
  }
  export namespace EngineDetailsBody {
    export namespace Constants {
      /** Size config. */
      export enum SizeConfig {
        STARTER = 'starter',
        CACHE_OPTIMIZED = 'cache_optimized',
        COMPUTE_OPTIMIZED = 'compute_optimized',
        SMALL = 'small',
        MEDIUM = 'medium',
        LARGE = 'large',
        CUSTOM = 'custom',
      }
    }
  }

  /**
   * Configuration settings.
   */
  export interface EnginePropertiesOaiGen1Configuration {
    /** coordinator/worker property settings. */
    coordinator?: NodeDescriptionBody;
    /** coordinator/worker property settings. */
    worker?: NodeDescriptionBody;
  }

  /**
   * JVM settings.
   */
  export interface EnginePropertiesOaiGen1Jvm {
    /** coordinator/worker property settings. */
    coordinator?: NodeDescriptionBody;
    /** coordinator/worker property settings. */
    worker?: NodeDescriptionBody;
  }

  /**
   * Configuration settings for the engine properties.
   */
  export interface EnginePropertiesOaiGenConfiguration {
    /** Node details. */
    coordinator?: PrestissimoNodeDescriptionBody;
    /** Node details. */
    worker?: PrestissimoNodeDescriptionBody;
  }

  /**
   * Ingestion job.
   */
  export interface IngestionJob {
    /** Create new target table (if True); Insert into pre-existing target table (if False). */
    create_if_not_exist?: boolean;
    /** Ingestion CSV properties. */
    csv_property?: IngestionJobCsvProperty;
    /** Error messages of failed ingestion job. */
    details?: string;
    /** Unix timestamp of ingestion job completing. */
    end_timestamp?: string;
    /** ID of the spark engine to be used for ingestion. */
    engine_id?: string;
    /** Name of the spark engine to be used for ingestion. */
    engine_name?: string;
    /** Ingestion engine configuration. */
    execute_config?: IngestionJobExecuteConfig;
    /** Instance ID of the lakehouse where ingestion job is executed. */
    instance_id?: string;
    /** Job ID of the ingestion job. */
    job_id?: string;
    /** partition by expression of the target table. */
    partition_by?: string;
    /** Schema definition of the source table. */
    schema?: string;
    /** Source data location of the ingestion job. */
    source_data_files?: string;
    /** Source file types (parquet or csv). */
    source_file_type?: IngestionJob.Constants.SourceFileType | string;
    /** Unix timestamp of ingestion job starting. */
    start_timestamp?: string;
    /** Current state of ingestion job. */
    status?: string;
    /** Target table name in format catalog.schema.table. */
    target_table?: string;
    /** Ingestion job user. */
    username?: string;
    /** Validate CSV header if the target table exist. */
    validate_csv_header?: boolean;
  }
  export namespace IngestionJob {
    export namespace Constants {
      /** Source file types (parquet or csv). */
      export enum SourceFileType {
        CSV = 'csv',
        PARQUET = 'parquet',
      }
    }
  }

  /**
   * List ingestion jobs.
   */
  export interface IngestionJobCollection {
    /** Ingestion jobs. */
    ingestion_jobs?: IngestionJob[];
    /** A page in a pagination collection. */
    first?: IngestionJobCollectionPage;
    /** A page in a pagination collection. */
    next?: IngestionJobCollectionPage;
  }

  /**
   * A page in a pagination collection.
   */
  export interface IngestionJobCollectionPage {
    /** Link to the a page in the collection. */
    href?: string;
  }

  /**
   * Ingestion CSV properties.
   */
  export interface IngestionJobCsvProperty {
    /** Encoding used in CSV file. */
    encoding?: string;
    /** Escape character of CSV file. */
    escape_character?: string;
    /** Field delimiter of CSV file. */
    field_delimiter?: string;
    /** Identify if header exists in CSV file. */
    header?: boolean;
    /** Line delimiter of CSV file. */
    line_delimiter?: string;
  }

  /**
   * Ingestion engine configuration.
   */
  export interface IngestionJobExecuteConfig {
    /** Driver core(s) configuration for Spark engine. */
    driver_cores?: number;
    /** Driver memory configuration (in GB) for Spark engine. */
    driver_memory?: string;
    /** Executor core(s) configuration for Spark engine. */
    executor_cores?: number;
    /** Executor memory configuration (in GB) for Spark engine. */
    executor_memory?: string;
    /** Number of executors to assign for Spark engine. */
    num_executors?: number;
  }

  /**
   * GetSchemas OK.
   */
  export interface ListSchemasOKBody {
    /** Response of success. */
    response: SuccessResponse;
    /** Schemas. */
    schemas: string[];
  }

  /**
   * List spark version.
   */
  export interface ListSparkVersionsOKBody {
    /** Response of success. */
    response: SuccessResponse;
    /** Spark versions list. */
    spark_versions: DisplayNameInfoResponse[];
  }

  /**
   * milvus service details.
   */
  export interface MilvusService {
    /** Actions. */
    actions?: string[];
    /** Created user name. */
    created_by?: string;
    /** Created time in epoch format. */
    created_on?: number;
    /** Service description. */
    description?: string;
    /** milvus grpc_host. */
    grpc_host?: string;
    /** milvus port. */
    grpc_port?: number;
    /** milvus display name. */
    host_name?: string;
    /** milvus https_host. */
    https_host?: string;
    /** milvus port. */
    https_port?: number;
    /** Origin - place holder. */
    origin?: string;
    /** Service display name. */
    service_display_name?: string;
    /** Service programmatic name. */
    service_id?: string;
    /** milvus status. */
    status?: MilvusService.Constants.Status | string;
    /** milvus status code. */
    status_code: number;
    /** Tags. */
    tags?: string[];
    /** service type. */
    type?: string;
  }
  export namespace MilvusService {
    export namespace Constants {
      /** milvus status. */
      export enum Status {
        RUNNING = 'running',
        PENDING = 'pending',
        STOPPED = 'stopped',
      }
    }
  }

  /**
   * List milvus services.
   */
  export interface MilvusServiceCollection {
    /** milvus service body. */
    milvus_services?: MilvusService[];
  }

  /**
   * Netezza engine details.
   */
  export interface NetezzaEngine {
    /** Actions. */
    actions?: string[];
    /** watsonx.data build version. */
    build_version?: string;
    /** Created user name. */
    created_by?: string;
    /** Created time in epoch format. */
    created_on?: number;
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engine_details?: NetezzaEngineDetails;
    /** Engine display name. */
    engine_display_name?: string;
    /** Engine programmatic name. */
    engine_id?: string;
    /** Engine host name. In case of OCP based clusters, this is internal hostname. */
    host_name?: string;
    /** Origin - place holder. */
    origin?: string;
    /** Engine port. */
    port?: number;
    /** Engine status. */
    status?: string;
    /** Tags. */
    tags?: string[];
    /** Engine type. */
    type?: string;
  }

  /**
   * list Netezza engines.
   */
  export interface NetezzaEngineCollection {
    /** list Netezza engines. */
    netezza_engines?: NetezzaEngine[];
  }

  /**
   * External engine details.
   */
  export interface NetezzaEngineDetails {
    /** External engine connection string. */
    connection_string?: string;
    /** Metastore host. */
    metastore_host?: string;
  }

  /**
   * External engine details.
   */
  export interface NetezzaEngineDetailsBody {
    /** External engine connection string. */
    connection_string?: string;
  }

  /**
   * NodeDescription.
   */
  export interface NodeDescription {
    /** Node type. */
    node_type?: string;
    /** Quantity. */
    quantity?: number;
  }

  /**
   * coordinator/worker property settings.
   */
  export interface NodeDescriptionBody {
    /** Node Type, r5, m, i.. */
    node_type?: string;
    /** Number of nodes. */
    quantity?: number;
  }

  /**
   * external engine details.
   */
  export interface OtherEngine {
    /** Actions. */
    actions?: string[];
    /** created user name. */
    created_by?: string;
    /** created time in epoch format. */
    created_on?: number;
    /** engine description. */
    description?: string;
    /** External engine details. */
    engine_details?: OtherEngineDetails;
    /** Engine display name. */
    engine_display_name?: string;
    /** engine programmatic name. */
    engine_id?: string;
    /** Engine host name. In case of OCP based clusters, this is internal hostname. */
    host_name?: string;
    /** origin. */
    origin?: string;
    /** Engine port. */
    port?: number;
    /** engine status. */
    status?: string;
    /** Tags. */
    tags?: string[];
    /** Type like presto, netezza, external,.. */
    type?: string;
  }

  /**
   * list other engines.
   */
  export interface OtherEngineCollection {
    /** list other engines. */
    other_engines?: OtherEngine[];
  }

  /**
   * External engine details.
   */
  export interface OtherEngineDetails {
    /** external engine connection string. */
    connection_string: string;
    /** Actual engine type. */
    engine_type: string;
    /** metastore host - not required while registering an engine. */
    metastore_host?: string;
  }

  /**
   * External engine details.
   */
  export interface OtherEngineDetailsBody {
    /** External engine connection string. */
    connection_string: string;
    /** Actual engine type. */
    engine_type: string;
  }

  /**
   * Endpoints.
   */
  export interface PrestissimoEndpoints {
    /** Application API. */
    applications_api?: string;
    /** History server endpoint. */
    history_server_endpoint?: string;
    /** Spark kernel endpoint. */
    spark_access_endpoint?: string;
    /** Spark jobs V4 endpoint. */
    spark_jobs_v4_endpoint?: string;
    /** Spark kernel endpoint. */
    spark_kernel_endpoint?: string;
    /** View history server. */
    view_history_server?: string;
    /** Wxd application endpoint. */
    wxd_application_endpoint?: string;
  }

  /**
   * EngineDetail.
   */
  export interface PrestissimoEngine {
    /** Actions. */
    actions?: string[];
    /** Associated catalog. */
    associated_catalogs?: string[];
    /** watsonx.data build version. */
    build_version?: string;
    /** Node details. */
    coordinator?: PrestissimoNodeDescriptionBody;
    /** Created user name. */
    created_by?: string;
    /** Created time in epoch format. */
    created_on?: number;
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engine_details?: PrestissimoEngineDetails;
    /** Engine display name. */
    engine_display_name?: string;
    /** Engine programmatic name. */
    engine_id?: string;
    /** Engine properties. */
    engine_properties?: PrestissimoEngineEngineProperties;
    /** Triggers engine restart if value is force. */
    engine_restart?: PrestissimoEngine.Constants.EngineRestart | string;
    /** Applicable only for OCP based clusters.  This is typically  servicename+route. */
    external_host_name: string;
    /** Group ID. */
    group_id?: string;
    /** Engine host name. In case of OCP based clusters, this is internal hostname. */
    host_name?: string;
    /** Origin - place holder. */
    origin?: PrestissimoEngine.Constants.Origin | string;
    /** Engine port. */
    port?: number;
    /** Region - place holder. */
    region?: string;
    /** RemoveEngine properties. */
    remove_engine_properties?: RemoveEngineProperties;
    /** Size config. */
    size_config?: string;
    /** Engine status. */
    status?: PrestissimoEngine.Constants.Status | string;
    /** Engine status code. */
    status_code: number;
    /** Tags. */
    tags?: string[];
    /** Engine type. */
    type?: string;
    /** Version of the engine. */
    version?: string;
    /** Node details. */
    worker?: PrestissimoNodeDescriptionBody;
  }
  export namespace PrestissimoEngine {
    export namespace Constants {
      /** Triggers engine restart if value is force. */
      export enum EngineRestart {
        FORCE = 'force',
        FALSE = 'false',
      }
      /** Origin - place holder. */
      export enum Origin {
        NATIVE = 'native',
        EXTERNAL = 'external',
        DISCOVER = 'discover',
      }
      /** Engine status. */
      export enum Status {
        RUNNING = 'running',
        PENDING = 'pending',
        STOPPED = 'stopped',
      }
    }
  }

  /**
   * list Prestissimo Engines.
   */
  export interface PrestissimoEngineCollection {
    /** list prestissimo engines. */
    prestissimo_engines?: PrestissimoEngine[];
  }

  /**
   * External engine details.
   */
  export interface PrestissimoEngineDetails {
    /** api key to work with the saas IAE instance. */
    api_key?: string;
    /** External engine connection string. */
    connection_string?: string;
    /** Node details. */
    coordinator?: PrestissimoNodeDescriptionBody;
    /** Endpoints. */
    endpoints?: PrestissimoEndpoints;
    /** Instance to access the instance. */
    instance_id?: string;
    /** How is the spark instance managed. */
    managed_by?: string;
    /** Metastore host. */
    metastore_host?: string;
    /** Size config. */
    size_config?: PrestissimoEngineDetails.Constants.SizeConfig | string;
    /** Node details. */
    worker?: PrestissimoNodeDescriptionBody;
  }
  export namespace PrestissimoEngineDetails {
    export namespace Constants {
      /** Size config. */
      export enum SizeConfig {
        STARTER = 'starter',
        CACHE_OPTIMIZED = 'cache_optimized',
        COMPUTE_OPTIMIZED = 'compute_optimized',
        SMALL = 'small',
        MEDIUM = 'medium',
        LARGE = 'large',
        CUSTOM = 'custom',
      }
    }
  }

  /**
   * Engine properties.
   */
  export interface PrestissimoEngineEngineProperties {
    /** catalog properties. */
    catalog?: PrestissimoEnginePropertiesCatalog;
    /** Configuration settings for the engine properties. */
    configuration?: EnginePropertiesOaiGenConfiguration;
    /** velox properties. */
    velox?: PrestissimoEnginePropertiesVelox;
    /** JVM settings. */
    jvm?: PrestissimoEnginePropertiesOaiGen1Jvm;
  }

  /**
   * catalog properties.
   */
  export interface PrestissimoEnginePropertiesCatalog {
    /** catalog name. */
    catalog_name?: string[];
  }

  /**
   * JVM settings.
   */
  export interface PrestissimoEnginePropertiesOaiGen1Jvm {
    /** coordinator/worker property settings. */
    coordinator?: NodeDescriptionBody;
  }

  /**
   * velox properties.
   */
  export interface PrestissimoEnginePropertiesVelox {
    /** velox property. */
    velox_property?: string[];
  }

  /**
   * Node details.
   */
  export interface PrestissimoNodeDescriptionBody {
    /** Node Type, r5, m, i.. */
    node_type?: string;
    /** Number of nodes. */
    quantity?: number;
  }

  /**
   * EngineDetail.
   */
  export interface PrestoEngine {
    /** Actions. */
    actions?: string[];
    /** Associated catalogs. */
    associated_catalogs?: string[];
    /** watsonx.data build version. */
    build_version?: string;
    /** NodeDescription. */
    coordinator?: NodeDescription;
    /** Created user name. */
    created_by?: string;
    /** Created time in epoch format. */
    created_on?: number;
    /** Engine description. */
    description?: string;
    /** Driver details. */
    drivers?: Driver[];
    /** Node details. */
    engine_details?: EngineDetailsBody;
    /** Engine display name. */
    engine_display_name?: string;
    /** Engine programmatic name. */
    engine_id?: string;
    /** Engine properties. */
    engine_properties?: PrestoEngineEngineProperties;
    /** Triggers engine restart if value is force. */
    engine_restart?: PrestoEngine.Constants.EngineRestart | string;
    /** Applicable only for OCP based clusters.  This is typically  servicename+route. */
    external_host_name: string;
    /** Group ID. */
    group_id?: string;
    /** Engine host name. In case of OCP based clusters, this is internal hostname. */
    host_name?: string;
    /** Origin - created or registered. */
    origin?: PrestoEngine.Constants.Origin | string;
    /** Engine port. */
    port?: number;
    /** Region (cloud). */
    region?: string;
    /** RemoveEngine properties. */
    remove_engine_properties?: PrestoEnginePatchRemoveEngineProperties;
    /** Size config. */
    size_config?: string;
    /** Engine status. */
    status?: PrestoEngine.Constants.Status | string;
    /** Engine status code. */
    status_code: number;
    /** Tags. */
    tags?: string[];
    /** Engine type presto. */
    type?: string;
    /** Version of the engine. */
    version?: string;
    /** NodeDescription. */
    worker?: NodeDescription;
  }
  export namespace PrestoEngine {
    export namespace Constants {
      /** Triggers engine restart if value is force. */
      export enum EngineRestart {
        FORCE = 'force',
        FALSE = 'false',
      }
      /** Origin - created or registered. */
      export enum Origin {
        NATIVE = 'native',
        EXTERNAL = 'external',
        DISCOVER = 'discover',
      }
      /** Engine status. */
      export enum Status {
        RUNNING = 'running',
        PENDING = 'pending',
        STOPPED = 'stopped',
      }
    }
  }

  /**
   * List Presto engines.
   */
  export interface PrestoEngineCollection {
    /** Presto engine. */
    presto_engines?: PrestoEngine[];
  }

  /**
   * Engine properties.
   */
  export interface PrestoEngineEngineProperties {
    /** Catalog configuration settings. */
    catalog?: PrestoEnginePropertiesCatalog;
    /** Configuration settings. */
    configuration?: EnginePropertiesOaiGen1Configuration;
    /** Global session is to accomodate all the custom properties that can be applicable for both coordinator and
     *  worker.
     */
    global?: PrestoEnginePropertiesGlobal;
    /** JVM settings. */
    jvm?: EnginePropertiesOaiGen1Jvm;
  }

  /**
   * RemoveEngine properties.
   */
  export interface PrestoEnginePatchRemoveEngineProperties {
    /** Configuration settings for removing engine properties. */
    configuration?: RemoveEnginePropertiesOaiGenConfiguration;
    /** JVM properties. */
    jvm?: RemoveEnginePropertiesOaiGenJvm;
    /** Catalog configuration settings. */
    catalog?: PrestoEnginePropertiesCatalog;
  }

  /**
   * Catalog configuration settings.
   */
  export interface PrestoEnginePropertiesCatalog {
    /** Name of the catalog. */
    catalog_name?: string;
  }

  /**
   * Global session is to accomodate all the custom properties that can be applicable for both coordinator and worker.
   */
  export interface PrestoEnginePropertiesGlobal {
    /** Global property settings. */
    global_property?: string;
  }

  /**
   * RemoveEngine properties.
   */
  export interface RemoveEngineProperties {
    /** catalog properties. */
    catalog?: PrestissimoEnginePropertiesCatalog;
    /** remove engine properties configuration. */
    configuration?: RemoveEnginePropertiesConfiguration;
    /** remove engine properties configuration. */
    jvm?: RemoveEnginePropertiesConfiguration;
    /** velox description. */
    velox?: string[];
  }

  /**
   * remove engine properties configuration.
   */
  export interface RemoveEnginePropertiesConfiguration {
    /** description for coordinator property. */
    coordinator?: string[];
    /** description for worker property. */
    worker?: string[];
  }

  /**
   * Configuration settings for removing engine properties.
   */
  export interface RemoveEnginePropertiesOaiGenConfiguration {
    /** List of coordinator properties. */
    coordinator?: string[];
    /** List of worker properties. */
    worker?: string[];
  }

  /**
   * JVM properties.
   */
  export interface RemoveEnginePropertiesOaiGenJvm {
    /** List of coordinator properties. */
    coordinator?: string[];
    /** List of worker properties. */
    worker?: string[];
  }

  /**
   * success response.
   */
  export interface ReplaceSnapshotCreatedBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /**
   * ExplainStatement OK.
   */
  export interface ResultPrestissimoExplainStatement {
    /** Result. */
    result?: string;
  }

  /**
   * explainAnalyzeStatement OK.
   */
  export interface ResultRunPrestissimoExplainAnalyzeStatement {
    /** explainAnalyzeStatement result. */
    result?: string;
  }

  /**
   * explainAnalyzeStatement OK.
   */
  export interface RunExplainAnalyzeStatementOKBody {
    /** Response of success. */
    response: SuccessResponse;
    /** explainAnalyzeStatement result. */
    result: string;
  }

  /**
   * ExplainStatement OK.
   */
  export interface RunExplainStatementOKBody {
    /** Response of success. */
    response: SuccessResponse;
    /** Result. */
    result: string;
  }

  /**
   * Spark applications details configuration.
   */
  export interface SparkApplicationConfig {
    /** spark_sample_config_properpty. */
    spark_sample_config_properpty?: string;
  }

  /**
   * Application details.
   */
  export interface SparkApplicationDetails {
    /** Application. */
    application?: string;
    /** List of arguments. */
    arguments?: string[];
    /** Class. */
    class?: string;
    /** Spark applications details configuration. */
    conf?: SparkApplicationConfig;
    /** Spark applications details env samples. */
    env?: SparkApplicationEnv;
    /** Files. */
    files?: string;
    /** Jars. */
    jars?: string;
    /** Display name of the spark application. */
    name?: string;
    /** Packages. */
    packages?: string;
    /** Repositories. */
    repositories?: string;
    /** Spark Version. */
    spark_version?: string;
  }

  /**
   * Spark applications details env samples.
   */
  export interface SparkApplicationEnv {
    /** sample. */
    sample_env_key?: string;
  }

  /**
   * Spark Default Config details.
   */
  export interface SparkDefaultConfig {
    /** config1. */
    config1?: string;
    /** config2. */
    config2?: string;
  }

  /**
   * Application Endpoints.
   */
  export interface SparkEndpoints {
    /** Application API. */
    applications_api?: string;
    /** History server endpoint. */
    history_server_endpoint?: string;
    /** Spark kernel endpoint. */
    spark_access_endpoint?: string;
    /** Spark jobs V4 endpoint. */
    spark_jobs_v4_endpoint?: string;
    /** Spark kernel endpoint. */
    spark_kernel_endpoint?: string;
    /** View history server. */
    view_history_server?: string;
    /** Wxd application endpoint. */
    wxd_application_endpoint?: string;
    /** Wxd engine endpoint. */
    wxd_engine_endpoint?: string;
    /** Wxd history_server endpoint. */
    wxd_history_server_endpoint?: string;
    /** Wxd history_server endpoint. */
    wxd_history_server_ui_endpoint?: string;
  }

  /**
   * EngineDetail.
   */
  export interface SparkEngine {
    /** Actions. */
    actions?: string[];
    /** Associated catalogs. */
    associated_catalogs?: string[];
    /** watsonx.data build version. */
    build_version?: string;
    /** Created user name. */
    created_by?: string;
    /** Created time in epoch format. */
    created_on?: number;
    /** Engine description. */
    description?: string;
    /** External engine details. */
    engine_details?: SparkEngineDetails;
    /** Engine display name. */
    engine_display_name?: string;
    /** Engine programmatic name. */
    engine_id?: string;
    /** Origin - created or registered. */
    origin?: SparkEngine.Constants.Origin | string;
    /** Engine status. */
    status?: string;
    /** Tags. */
    tags?: string[];
    /** Type like spark, netezza,.. */
    type?: SparkEngine.Constants.Type | string;
  }
  export namespace SparkEngine {
    export namespace Constants {
      /** Origin - created or registered. */
      export enum Origin {
        EXTERNAL = 'external',
        DISCOVER = 'discover',
        NATIVE = 'native',
      }
      /** Type like spark, netezza,.. */
      export enum Type {
        SPARK = 'spark',
      }
    }
  }

  /**
   * Engine Application Status.
   */
  export interface SparkEngineApplicationStatus {
    /** Application details. */
    application_details?: SparkApplicationDetails;
    /** Application ID. */
    application_id?: string;
    /** Auto Termination Time. */
    auto_termination_time?: string;
    /** Creation time. */
    creation_time?: string;
    /** Deployment mode. */
    deploy_mode?: string;
    /** End Time. */
    end_time?: string;
    /** Failed time. */
    failed_time?: string;
    /** Finish time. */
    finish_time?: string;
    /** Application ID. */
    id?: string;
    /** Job endpoint. */
    job_endpoint?: string;
    /** Return code. */
    return_code?: string;
    /** application run time. */
    runtime?: SparkEngineApplicationStatusRuntime;
    /** Service Instance ID for POST. */
    service_instance_id?: string;
    /** Spark application ID. */
    spark_application_id?: string;
    /** Spark application name. */
    spark_application_name?: string;
    /** Spark Version. */
    spark_version?: string;
    /** Start time. */
    start_time?: string;
    /** Application state. */
    state?: string;
    /** Application state details. */
    state_details?: SparkEngineApplicationStatusStateDetailsItems[];
    /** Application submission time. */
    submission_time?: string;
    /** Template ID. */
    template_id?: string;
    /** Engine Type. */
    type?: SparkEngineApplicationStatus.Constants.Type | string;
    /** Spark application volumes to mount. */
    volumes?: SparkVolumeDetails[];
    /** Wxd history_server endpoint. */
    wxd_application_ui_endpoint?: string;
  }
  export namespace SparkEngineApplicationStatus {
    export namespace Constants {
      /** Engine Type. */
      export enum Type {
        IAE = 'iae',
        EMR = 'emr',
      }
    }
  }

  /**
   * Engine Application Detail.
   */
  export interface SparkEngineApplicationStatusCollection {
    /** Application body. */
    applications?: SparkEngineApplicationStatus[];
  }

  /**
   * application run time.
   */
  export interface SparkEngineApplicationStatusRuntime {
    /** Spark Version. */
    spark_version?: string;
  }

  /**
   * State details.
   */
  export interface SparkEngineApplicationStatusStateDetailsItems {
    /** State details code. */
    code?: string;
    /** State details message. */
    message?: string;
    /** State details type. */
    type?: string;
  }

  /**
   * List spark engines.
   */
  export interface SparkEngineCollection {
    /** List spark engines. */
    spark_engines?: SparkEngine[];
  }

  /**
   * External engine details.
   */
  export interface SparkEngineDetails {
    /** api key to work with the saas IAE instance. */
    api_key?: string;
    /** External engine connection string. */
    connection_string?: string;
    /** Spark Default Config details. */
    default_config?: SparkDefaultConfig;
    /** The default spark version for the native engine. */
    default_version?: string;
    /** Application Endpoints. */
    endpoints?: SparkEndpoints;
    /** Default bucket for spark. */
    engine_home_bucket_display_name?: string;
    /** Default bucket for spark. */
    engine_home_bucket_name?: string;
    /** Path for spark. */
    engine_home_path?: string;
    /** Default volume for spark. */
    engine_home_volume?: string;
    /** Default volume for spark. */
    engine_home_volume_id?: string;
    /** Name of the volume. */
    engine_home_volume_name?: string;
    /** Storage class of the volume. */
    engine_home_volume_storage_class?: string;
    /** Storage size of the volume. */
    engine_home_volume_storage_size?: string;
    /** Instance to access the instance. */
    instance_id?: string;
    /** How is the spark instance managed. */
    managed_by?: string;
    /** Spark instance scale configuration. */
    scale_config?: SparkScaleConfig;
  }

  /**
   * Node details.
   */
  export interface SparkEngineDetailsPrototype {
    /** api key to work with the saas IAE instance. */
    api_key?: string;
    /** External engine connection string. */
    connection_string?: string;
    /** Spark Default Config details. */
    default_config?: SparkDefaultConfig;
    /** The default spark version for the native engine. */
    default_version?: string;
    /** Default bucket name for spark. */
    engine_home_bucket_display_name?: string;
    /** Default bucket for spark. */
    engine_home_bucket_name?: string;
    /** Path for spark. */
    engine_home_path?: string;
    /** Default volume for spark. */
    engine_home_volume_id?: string;
    /** Name of the volume. */
    engine_home_volume_name?: string;
    /** Storage class of the volume. */
    engine_home_volume_storage_class?: string;
    /** Storage size of the volume. */
    engine_home_volume_storage_size?: string;
    /** Instance to access the instance. */
    instance_id?: string;
    /** How is the spark instance managed. */
    managed_by?: string;
    /** Spark instance scale configuration. */
    scale_config?: SparkScaleConfig;
  }

  /**
   * Native spark history server.
   */
  export interface SparkHistoryServer {
    /** History server start time. */
    auto_termination_time?: string;
    /** History server cores. */
    cores?: string;
    /** History server memory. */
    memory?: string;
    /** History server start time. */
    start_time?: string;
    /** History server state. */
    state?: string;
  }

  /**
   * Spark instance scale configuration.
   */
  export interface SparkScaleConfig {
    /** Enable/disable autoscaling. */
    auto_scale_enabled?: boolean;
    /** Current node count. */
    current_number_of_nodes?: number;
    /** Maximum node count. */
    maximum_number_of_nodes?: number;
    /** Minimum node count. */
    minimum_number_of_nodes?: number;
    /** Spark instance node type. */
    node_type?: string;
    /** Node count. */
    number_of_nodes?: number;
  }

  /**
   * Spark application volume.
   */
  export interface SparkVolumeDetails {
    /** Path in the spark cluster for the mounted volume. */
    mount_path?: string;
    /** volume name. */
    name?: string;
    /** Read only flag. */
    read_only?: boolean;
    /** Path in the volume to be mounted. */
    source_sub_path?: string;
  }

  /**
   * Response of success.
   */
  export interface SuccessResponse {
    /** Message. */
    message?: string;
    /** Message code. */
    message_code?: string;
  }

  /**
   * GetColumns OK.
   */
  export interface Table {
    /** Columns. */
    columns?: Column[];
    /** Table name. */
    table_name?: string;
  }

  /**
   * tables list.
   */
  export interface TableCollection {
    /** List of the tables present in the schema. */
    tables?: string[];
  }

  /**
   * TableSnapshot.
   */
  export interface TableSnapshot {
    /** Committed at. */
    committed_at?: string;
    /** Operation. */
    operation?: string;
    /** Snapshot id. */
    snapshot_id?: string;
    /** Summary. */
    summary?: string;
  }

  /**
   * TableSnapshot OK.
   */
  export interface TableSnapshotCollection {
    /** Snapshots. */
    snapshots?: TableSnapshot[];
  }

  /**
   * Engine details.
   */
  export interface UpdateSparkEngineBodyEngineDetails {
    /** Dynamic dict. */
    default_config?: JsonObject;
    /** The default spark version for the native engine. */
    default_version?: string;
  }

  /**
   * success response.
   */
  export interface UpdateSyncCatalogOKBody {
    /** Response of success. */
    response?: SuccessResponse;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * IngestionJobsPager can be used to simplify the use of listIngestionJobs().
   */
  export class IngestionJobsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: WatsonxDataV2;

    protected params: WatsonxDataV2.ListIngestionJobsParams;

    /**
     * Construct a IngestionJobsPager object.
     *
     * @param {WatsonxDataV2}  client - The service client instance used to invoke listIngestionJobs()
     * @param {Object} params - The parameters to be passed to listIngestionJobs()
     * @constructor
     * @returns {IngestionJobsPager}
     */
    constructor(client: WatsonxDataV2, params: WatsonxDataV2.ListIngestionJobsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listIngestionJobs().
     * @returns {Promise<WatsonxDataV2.IngestionJob[]>}
     */
    public async getNext(): Promise<WatsonxDataV2.IngestionJob[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listIngestionJobs(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'start');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.ingestion_jobs;
    }

    /**
     * Returns all results by invoking listIngestionJobs() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<WatsonxDataV2.IngestionJob[]>}
     */
    public async getAll(): Promise<WatsonxDataV2.IngestionJob[]> {
      const results: IngestionJob[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = WatsonxDataV2;
