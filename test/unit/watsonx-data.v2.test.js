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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const WatsonxDataV2 = require('../../dist/watsonx-data/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const watsonxDataServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://region.lakehouse.cloud.ibm.com/lakehouse/api/v2',
};

const watsonxDataService = new WatsonxDataV2(watsonxDataServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(watsonxDataService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('WatsonxDataV2', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = WatsonxDataV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(WatsonxDataV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(WatsonxDataV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(WatsonxDataV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = WatsonxDataV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(WatsonxDataV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new WatsonxDataV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new WatsonxDataV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(WatsonxDataV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('listBucketRegistrations', () => {
    describe('positive tests', () => {
      function __listBucketRegistrationsTest() {
        // Construct the params object for operation listBucketRegistrations
        const authInstanceId = 'testString';
        const listBucketRegistrationsParams = {
          authInstanceId,
        };

        const listBucketRegistrationsResult = watsonxDataService.listBucketRegistrations(listBucketRegistrationsParams);

        // all methods should return a Promise
        expectToBePromise(listBucketRegistrationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBucketRegistrationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listBucketRegistrationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listBucketRegistrationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBucketRegistrationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listBucketRegistrations(listBucketRegistrationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listBucketRegistrations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createBucketRegistration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BucketDetails
      const bucketDetailsModel = {
        access_key: 'b9cbf248ea5c4c96947e64407108559j',
        bucket_name: 'sample-bucket',
        endpoint: 'https://s3.<region>.cloud-object-storage.appdomain.cloud/',
        secret_key: '13b4045cac1a0be54c9fjbe53cb22df5fn397cd2c45b66c87',
      };

      // BucketCatalog
      const bucketCatalogModel = {
        catalog_name: 'sampleCatalog',
        catalog_tags: ['catalog_tag_1', 'catalog_tag_2'],
        catalog_type: 'iceberg',
      };

      function __createBucketRegistrationTest() {
        // Construct the params object for operation createBucketRegistration
        const bucketDetails = bucketDetailsModel;
        const bucketType = 'ibm_cos';
        const description = 'COS bucket for customer data';
        const managedBy = 'ibm';
        const associatedCatalog = bucketCatalogModel;
        const bucketDisplayName = 'sample-bucket-displayname';
        const region = 'us-south';
        const tags = ['bucket-tag1', 'bucket-tag2'];
        const authInstanceId = 'testString';
        const createBucketRegistrationParams = {
          bucketDetails,
          bucketType,
          description,
          managedBy,
          associatedCatalog,
          bucketDisplayName,
          region,
          tags,
          authInstanceId,
        };

        const createBucketRegistrationResult = watsonxDataService.createBucketRegistration(createBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(createBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.bucket_details).toEqual(bucketDetails);
        expect(mockRequestOptions.body.bucket_type).toEqual(bucketType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.managed_by).toEqual(managedBy);
        expect(mockRequestOptions.body.associated_catalog).toEqual(associatedCatalog);
        expect(mockRequestOptions.body.bucket_display_name).toEqual(bucketDisplayName);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketDetails = bucketDetailsModel;
        const bucketType = 'ibm_cos';
        const description = 'COS bucket for customer data';
        const managedBy = 'ibm';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createBucketRegistrationParams = {
          bucketDetails,
          bucketType,
          description,
          managedBy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createBucketRegistration(createBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBucketRegistration', () => {
    describe('positive tests', () => {
      function __getBucketRegistrationTest() {
        // Construct the params object for operation getBucketRegistration
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const getBucketRegistrationParams = {
          bucketId,
          authInstanceId,
        };

        const getBucketRegistrationResult = watsonxDataService.getBucketRegistration(getBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(getBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBucketRegistrationParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getBucketRegistration(getBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deregisterBucket', () => {
    describe('positive tests', () => {
      function __deregisterBucketTest() {
        // Construct the params object for operation deregisterBucket
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const deregisterBucketParams = {
          bucketId,
          authInstanceId,
        };

        const deregisterBucketResult = watsonxDataService.deregisterBucket(deregisterBucketParams);

        // all methods should return a Promise
        expectToBePromise(deregisterBucketResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deregisterBucketTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deregisterBucketTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deregisterBucketTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deregisterBucketParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deregisterBucket(deregisterBucketParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deregisterBucket({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deregisterBucket();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateBucketRegistration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BucketDetails
      const bucketDetailsModel = {
        access_key: 'b9cbf248ea5c4c96947e64407108559j',
        bucket_name: 'sample-bucket',
        endpoint: 'https://s3.<region>.cloud-object-storage.appdomain.cloud/',
        secret_key: '13b4045cac1a0be54c9fjbe53cb22df5fn397cd2c45b66c87',
      };

      function __updateBucketRegistrationTest() {
        // Construct the params object for operation updateBucketRegistration
        const bucketId = 'testString';
        const bucketDetails = bucketDetailsModel;
        const bucketDisplayName = 'sample-bucket-displayname';
        const description = 'COS bucket for customer data';
        const tags = ['testbucket', 'userbucket'];
        const authInstanceId = 'testString';
        const updateBucketRegistrationParams = {
          bucketId,
          bucketDetails,
          bucketDisplayName,
          description,
          tags,
          authInstanceId,
        };

        const updateBucketRegistrationResult = watsonxDataService.updateBucketRegistration(updateBucketRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(updateBucketRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.bucket_details).toEqual(bucketDetails);
        expect(mockRequestOptions.body.bucket_display_name).toEqual(bucketDisplayName);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBucketRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateBucketRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateBucketRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBucketRegistrationParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateBucketRegistration(updateBucketRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateBucketRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateBucketRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createActivateBucket', () => {
    describe('positive tests', () => {
      function __createActivateBucketTest() {
        // Construct the params object for operation createActivateBucket
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const createActivateBucketParams = {
          bucketId,
          authInstanceId,
        };

        const createActivateBucketResult = watsonxDataService.createActivateBucket(createActivateBucketParams);

        // all methods should return a Promise
        expectToBePromise(createActivateBucketResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}/activate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createActivateBucketTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createActivateBucketTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createActivateBucketTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createActivateBucketParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createActivateBucket(createActivateBucketParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createActivateBucket({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createActivateBucket();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDeactivateBucket', () => {
    describe('positive tests', () => {
      function __deleteDeactivateBucketTest() {
        // Construct the params object for operation deleteDeactivateBucket
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const deleteDeactivateBucketParams = {
          bucketId,
          authInstanceId,
        };

        const deleteDeactivateBucketResult = watsonxDataService.deleteDeactivateBucket(deleteDeactivateBucketParams);

        // all methods should return a Promise
        expectToBePromise(deleteDeactivateBucketResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}/deactivate', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDeactivateBucketTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteDeactivateBucketTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteDeactivateBucketTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDeactivateBucketParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteDeactivateBucket(deleteDeactivateBucketParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteDeactivateBucket({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteDeactivateBucket();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listBucketObjects', () => {
    describe('positive tests', () => {
      function __listBucketObjectsTest() {
        // Construct the params object for operation listBucketObjects
        const bucketId = 'testString';
        const authInstanceId = 'testString';
        const listBucketObjectsParams = {
          bucketId,
          authInstanceId,
        };

        const listBucketObjectsResult = watsonxDataService.listBucketObjects(listBucketObjectsParams);

        // all methods should return a Promise
        expectToBePromise(listBucketObjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bucket_registrations/{bucket_id}/objects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.bucket_id).toEqual(bucketId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBucketObjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listBucketObjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listBucketObjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bucketId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBucketObjectsParams = {
          bucketId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listBucketObjects(listBucketObjectsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listBucketObjects({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listBucketObjects();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDatabaseRegistrations', () => {
    describe('positive tests', () => {
      function __listDatabaseRegistrationsTest() {
        // Construct the params object for operation listDatabaseRegistrations
        const authInstanceId = 'testString';
        const listDatabaseRegistrationsParams = {
          authInstanceId,
        };

        const listDatabaseRegistrationsResult = watsonxDataService.listDatabaseRegistrations(listDatabaseRegistrationsParams);

        // all methods should return a Promise
        expectToBePromise(listDatabaseRegistrationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDatabaseRegistrationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listDatabaseRegistrationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listDatabaseRegistrationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDatabaseRegistrationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listDatabaseRegistrations(listDatabaseRegistrationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listDatabaseRegistrations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createDatabaseRegistration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DatabaseCatalog
      const databaseCatalogModel = {
        catalog_name: 'sampleCatalog',
        catalog_tags: ['catalog_tag_1', 'catalog_tag_2'],
        catalog_type: 'iceberg',
      };

      // DatabaseDetails
      const databaseDetailsModel = {
        certificate: 'contents of a pem/crt file',
        certificate_extension: 'pem/crt',
        database_name: 'new_database',
        hostname: 'db2@<hostname>.com',
        hostname_in_certificate: 'samplehostname',
        hosts: 'abc.com:1234,xyz.com:4321',
        password: 'samplepassword',
        port: 4553,
        sasl: true,
        ssl: true,
        tables: 'kafka_table_name',
        username: 'sampleuser',
        validate_server_certificate: true,
      };

      // DatabaseRegistrationPrototypeDatabasePropertiesItems
      const databaseRegistrationPrototypeDatabasePropertiesItemsModel = {
        encrypt: true,
        key: 'abc',
        value: 'xyz',
      };

      function __createDatabaseRegistrationTest() {
        // Construct the params object for operation createDatabaseRegistration
        const databaseDisplayName = 'new_database';
        const databaseType = 'db2';
        const associatedCatalog = databaseCatalogModel;
        const createdOn = '1686792721';
        const databaseDetails = databaseDetailsModel;
        const databaseProperties = [databaseRegistrationPrototypeDatabasePropertiesItemsModel];
        const description = 'db2 extenal database description';
        const tags = ['testdatabase', 'userdatabase'];
        const authInstanceId = 'testString';
        const createDatabaseRegistrationParams = {
          databaseDisplayName,
          databaseType,
          associatedCatalog,
          createdOn,
          databaseDetails,
          databaseProperties,
          description,
          tags,
          authInstanceId,
        };

        const createDatabaseRegistrationResult = watsonxDataService.createDatabaseRegistration(createDatabaseRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(createDatabaseRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.database_display_name).toEqual(databaseDisplayName);
        expect(mockRequestOptions.body.database_type).toEqual(databaseType);
        expect(mockRequestOptions.body.associated_catalog).toEqual(associatedCatalog);
        expect(mockRequestOptions.body.created_on).toEqual(createdOn);
        expect(mockRequestOptions.body.database_details).toEqual(databaseDetails);
        expect(mockRequestOptions.body.database_properties).toEqual(databaseProperties);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDatabaseRegistrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createDatabaseRegistrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createDatabaseRegistrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseDisplayName = 'new_database';
        const databaseType = 'db2';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDatabaseRegistrationParams = {
          databaseDisplayName,
          databaseType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createDatabaseRegistration(createDatabaseRegistrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createDatabaseRegistration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createDatabaseRegistration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDatabase', () => {
    describe('positive tests', () => {
      function __getDatabaseTest() {
        // Construct the params object for operation getDatabase
        const databaseId = 'testString';
        const authInstanceId = 'testString';
        const getDatabaseParams = {
          databaseId,
          authInstanceId,
        };

        const getDatabaseResult = watsonxDataService.getDatabase(getDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(getDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations/{database_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.database_id).toEqual(databaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDatabaseParams = {
          databaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getDatabase(getDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDatabaseCatalog', () => {
    describe('positive tests', () => {
      function __deleteDatabaseCatalogTest() {
        // Construct the params object for operation deleteDatabaseCatalog
        const databaseId = 'testString';
        const authInstanceId = 'testString';
        const deleteDatabaseCatalogParams = {
          databaseId,
          authInstanceId,
        };

        const deleteDatabaseCatalogResult = watsonxDataService.deleteDatabaseCatalog(deleteDatabaseCatalogParams);

        // all methods should return a Promise
        expectToBePromise(deleteDatabaseCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations/{database_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.database_id).toEqual(databaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDatabaseCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteDatabaseCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteDatabaseCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDatabaseCatalogParams = {
          databaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteDatabaseCatalog(deleteDatabaseCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteDatabaseCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteDatabaseCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDatabase', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DatabaseRegistrationPatchDatabaseDetails
      const databaseRegistrationPatchDatabaseDetailsModel = {
        password: 'samplepassword',
        username: 'sampleuser',
      };

      function __updateDatabaseTest() {
        // Construct the params object for operation updateDatabase
        const databaseId = 'testString';
        const databaseDetails = databaseRegistrationPatchDatabaseDetailsModel;
        const databaseDisplayName = 'new_database';
        const description = 'External database description';
        const tags = ['testdatabase', 'userdatabase'];
        const authInstanceId = 'testString';
        const updateDatabaseParams = {
          databaseId,
          databaseDetails,
          databaseDisplayName,
          description,
          tags,
          authInstanceId,
        };

        const updateDatabaseResult = watsonxDataService.updateDatabase(updateDatabaseParams);

        // all methods should return a Promise
        expectToBePromise(updateDatabaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/database_registrations/{database_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.database_details).toEqual(databaseDetails);
        expect(mockRequestOptions.body.database_display_name).toEqual(databaseDisplayName);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.database_id).toEqual(databaseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDatabaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateDatabaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateDatabaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const databaseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDatabaseParams = {
          databaseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateDatabase(updateDatabaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateDatabase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateDatabase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listOtherEngines', () => {
    describe('positive tests', () => {
      function __listOtherEnginesTest() {
        // Construct the params object for operation listOtherEngines
        const authInstanceId = 'testString';
        const listOtherEnginesParams = {
          authInstanceId,
        };

        const listOtherEnginesResult = watsonxDataService.listOtherEngines(listOtherEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listOtherEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/other_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOtherEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listOtherEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listOtherEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listOtherEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listOtherEngines(listOtherEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listOtherEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createOtherEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // OtherEngineDetailsBody
      const otherEngineDetailsBodyModel = {
        connection_string: '1.2.3.4',
        engine_type: 'netezza',
      };

      function __createOtherEngineTest() {
        // Construct the params object for operation createOtherEngine
        const engineDetails = otherEngineDetailsBodyModel;
        const engineDisplayName = 'sampleEngine01';
        const description = 'external engine description';
        const origin = 'external';
        const tags = ['tag1', 'tag2'];
        const type = 'netezza';
        const authInstanceId = 'testString';
        const createOtherEngineParams = {
          engineDetails,
          engineDisplayName,
          description,
          origin,
          tags,
          type,
          authInstanceId,
        };

        const createOtherEngineResult = watsonxDataService.createOtherEngine(createOtherEngineParams);

        // all methods should return a Promise
        expectToBePromise(createOtherEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/other_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.type).toEqual(type);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createOtherEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createOtherEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createOtherEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineDetails = otherEngineDetailsBodyModel;
        const engineDisplayName = 'sampleEngine01';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createOtherEngineParams = {
          engineDetails,
          engineDisplayName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createOtherEngine(createOtherEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createOtherEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createOtherEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteOtherEngine', () => {
    describe('positive tests', () => {
      function __deleteOtherEngineTest() {
        // Construct the params object for operation deleteOtherEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteOtherEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteOtherEngineResult = watsonxDataService.deleteOtherEngine(deleteOtherEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteOtherEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/other_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOtherEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteOtherEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteOtherEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteOtherEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteOtherEngine(deleteOtherEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteOtherEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteOtherEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDb2Engines', () => {
    describe('positive tests', () => {
      function __listDb2EnginesTest() {
        // Construct the params object for operation listDb2Engines
        const authInstanceId = 'testString';
        const listDb2EnginesParams = {
          authInstanceId,
        };

        const listDb2EnginesResult = watsonxDataService.listDb2Engines(listDb2EnginesParams);

        // all methods should return a Promise
        expectToBePromise(listDb2EnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDb2EnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listDb2EnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listDb2EnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDb2EnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listDb2Engines(listDb2EnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listDb2Engines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createDb2Engine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Db2EngineDetailsBody
      const db2EngineDetailsBodyModel = {
        connection_string: '1.2.3.4',
      };

      function __createDb2EngineTest() {
        // Construct the params object for operation createDb2Engine
        const origin = 'external';
        const description = 'db2 engine description';
        const engineDetails = db2EngineDetailsBodyModel;
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createDb2EngineParams = {
          origin,
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const createDb2EngineResult = watsonxDataService.createDb2Engine(createDb2EngineParams);

        // all methods should return a Promise
        expectToBePromise(createDb2EngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDb2EngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createDb2EngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createDb2EngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'external';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDb2EngineParams = {
          origin,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createDb2Engine(createDb2EngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createDb2Engine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createDb2Engine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDb2Engine', () => {
    describe('positive tests', () => {
      function __deleteDb2EngineTest() {
        // Construct the params object for operation deleteDb2Engine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteDb2EngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteDb2EngineResult = watsonxDataService.deleteDb2Engine(deleteDb2EngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteDb2EngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDb2EngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteDb2EngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteDb2EngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDb2EngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteDb2Engine(deleteDb2EngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteDb2Engine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteDb2Engine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDb2Engine', () => {
    describe('positive tests', () => {
      function __updateDb2EngineTest() {
        // Construct the params object for operation updateDb2Engine
        const engineId = 'testString';
        const description = 'db2 engine updated description';
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const updateDb2EngineParams = {
          engineId,
          description,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const updateDb2EngineResult = watsonxDataService.updateDb2Engine(updateDb2EngineParams);

        // all methods should return a Promise
        expectToBePromise(updateDb2EngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/db2_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDb2EngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateDb2EngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateDb2EngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDb2EngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateDb2Engine(updateDb2EngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateDb2Engine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateDb2Engine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listNetezzaEngines', () => {
    describe('positive tests', () => {
      function __listNetezzaEnginesTest() {
        // Construct the params object for operation listNetezzaEngines
        const authInstanceId = 'testString';
        const listNetezzaEnginesParams = {
          authInstanceId,
        };

        const listNetezzaEnginesResult = watsonxDataService.listNetezzaEngines(listNetezzaEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listNetezzaEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNetezzaEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listNetezzaEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listNetezzaEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNetezzaEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listNetezzaEngines(listNetezzaEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listNetezzaEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createNetezzaEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NetezzaEngineDetailsBody
      const netezzaEngineDetailsBodyModel = {
        connection_string: '1.2.3.4',
      };

      function __createNetezzaEngineTest() {
        // Construct the params object for operation createNetezzaEngine
        const origin = 'external';
        const description = 'netezza engine description';
        const engineDetails = netezzaEngineDetailsBodyModel;
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createNetezzaEngineParams = {
          origin,
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const createNetezzaEngineResult = watsonxDataService.createNetezzaEngine(createNetezzaEngineParams);

        // all methods should return a Promise
        expectToBePromise(createNetezzaEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createNetezzaEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createNetezzaEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createNetezzaEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'external';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createNetezzaEngineParams = {
          origin,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createNetezzaEngine(createNetezzaEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createNetezzaEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createNetezzaEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteNetezzaEngine', () => {
    describe('positive tests', () => {
      function __deleteNetezzaEngineTest() {
        // Construct the params object for operation deleteNetezzaEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteNetezzaEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteNetezzaEngineResult = watsonxDataService.deleteNetezzaEngine(deleteNetezzaEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteNetezzaEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNetezzaEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteNetezzaEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteNetezzaEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNetezzaEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteNetezzaEngine(deleteNetezzaEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteNetezzaEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteNetezzaEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateNetezzaEngine', () => {
    describe('positive tests', () => {
      function __updateNetezzaEngineTest() {
        // Construct the params object for operation updateNetezzaEngine
        const engineId = 'testString';
        const description = 'netezza engine updated description';
        const engineDisplayName = 'sampleEngine';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const updateNetezzaEngineParams = {
          engineId,
          description,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const updateNetezzaEngineResult = watsonxDataService.updateNetezzaEngine(updateNetezzaEngineParams);

        // all methods should return a Promise
        expectToBePromise(updateNetezzaEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/netezza_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateNetezzaEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateNetezzaEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateNetezzaEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateNetezzaEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateNetezzaEngine(updateNetezzaEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateNetezzaEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateNetezzaEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPrestissimoEngines', () => {
    describe('positive tests', () => {
      function __listPrestissimoEnginesTest() {
        // Construct the params object for operation listPrestissimoEngines
        const authInstanceId = 'testString';
        const listPrestissimoEnginesParams = {
          authInstanceId,
        };

        const listPrestissimoEnginesResult = watsonxDataService.listPrestissimoEngines(listPrestissimoEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listPrestissimoEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPrestissimoEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listPrestissimoEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listPrestissimoEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPrestissimoEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listPrestissimoEngines(listPrestissimoEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listPrestissimoEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createPrestissimoEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PrestissimoNodeDescriptionBody
      const prestissimoNodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      // PrestissimoEndpoints
      const prestissimoEndpointsModel = {
        applications_api: '$HOST/v4/analytics_engines/c7b3fccf-badb-46b0-b1ef-9b3154424021/spark_applications/<application_id>',
        history_server_endpoint: '$HOST/v2/spark/v3/instances/c7b3fccf-badb-46b0-b1ef-9b3154424021/spark_history_server',
        spark_access_endpoint: '$HOST/analytics-engine/details/spark-<instance_id>',
        spark_jobs_v4_endpoint: '$HOST/v4/analytics_engines/c7b3fccf-badb-46b0-b1ef-9b3154424021/spark_applications',
        spark_kernel_endpoint: '$HOST/v4/analytics_engines/c7b3fccf-badb-46b0-b1ef-9b3154424021/jkg/api/kernels',
        view_history_server: 'testString',
        wxd_application_endpoint: '$HOST/v1/1698311655308796/engines/spark817/applications',
      };

      // PrestissimoEngineDetails
      const prestissimoEngineDetailsModel = {
        api_key: '<api_key>',
        connection_string: '1.2.3.4',
        coordinator: prestissimoNodeDescriptionBodyModel,
        endpoints: prestissimoEndpointsModel,
        instance_id: 'instance_id',
        managed_by: 'fully/self',
        metastore_host: '1.2.3.4',
        size_config: 'starter',
        worker: prestissimoNodeDescriptionBodyModel,
      };

      function __createPrestissimoEngineTest() {
        // Construct the params object for operation createPrestissimoEngine
        const origin = 'native';
        const associatedCatalogs = ['hive_data'];
        const description = 'prestissimo engine description';
        const engineDetails = prestissimoEngineDetailsModel;
        const engineDisplayName = 'sampleEngine';
        const region = 'us-south';
        const tags = ['tag1', 'tag2'];
        const version = '1.2.3';
        const authInstanceId = 'testString';
        const createPrestissimoEngineParams = {
          origin,
          associatedCatalogs,
          description,
          engineDetails,
          engineDisplayName,
          region,
          tags,
          version,
          authInstanceId,
        };

        const createPrestissimoEngineResult = watsonxDataService.createPrestissimoEngine(createPrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(createPrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.associated_catalogs).toEqual(associatedCatalogs);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createPrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createPrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'native';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPrestissimoEngineParams = {
          origin,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createPrestissimoEngine(createPrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createPrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createPrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPrestissimoEngine', () => {
    describe('positive tests', () => {
      function __getPrestissimoEngineTest() {
        // Construct the params object for operation getPrestissimoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getPrestissimoEngineParams = {
          engineId,
          authInstanceId,
        };

        const getPrestissimoEngineResult = watsonxDataService.getPrestissimoEngine(getPrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(getPrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getPrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getPrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getPrestissimoEngine(getPrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getPrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getPrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePrestissimoEngine', () => {
    describe('positive tests', () => {
      function __deletePrestissimoEngineTest() {
        // Construct the params object for operation deletePrestissimoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deletePrestissimoEngineParams = {
          engineId,
          authInstanceId,
        };

        const deletePrestissimoEngineResult = watsonxDataService.deletePrestissimoEngine(deletePrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(deletePrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deletePrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deletePrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deletePrestissimoEngine(deletePrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updatePrestissimoEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PrestissimoEnginePropertiesCatalog
      const prestissimoEnginePropertiesCatalogModel = {
        catalog_name: ['testString'],
      };

      // PrestissimoNodeDescriptionBody
      const prestissimoNodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      // EnginePropertiesOaiGenConfiguration
      const enginePropertiesOaiGenConfigurationModel = {
        coordinator: prestissimoNodeDescriptionBodyModel,
        worker: prestissimoNodeDescriptionBodyModel,
      };

      // PrestissimoEnginePropertiesVelox
      const prestissimoEnginePropertiesVeloxModel = {
        velox_property: ['testString'],
      };

      // NodeDescriptionBody
      const nodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      // PrestissimoEnginePropertiesOaiGen1Jvm
      const prestissimoEnginePropertiesOaiGen1JvmModel = {
        coordinator: nodeDescriptionBodyModel,
      };

      // PrestissimoEngineEngineProperties
      const prestissimoEngineEnginePropertiesModel = {
        catalog: prestissimoEnginePropertiesCatalogModel,
        configuration: enginePropertiesOaiGenConfigurationModel,
        velox: prestissimoEnginePropertiesVeloxModel,
        jvm: prestissimoEnginePropertiesOaiGen1JvmModel,
      };

      // RemoveEnginePropertiesConfiguration
      const removeEnginePropertiesConfigurationModel = {
        coordinator: ['testString'],
        worker: ['testString'],
      };

      // RemoveEngineProperties
      const removeEnginePropertiesModel = {
        catalog: prestissimoEnginePropertiesCatalogModel,
        configuration: removeEnginePropertiesConfigurationModel,
        jvm: removeEnginePropertiesConfigurationModel,
        velox: ['testString'],
      };

      function __updatePrestissimoEngineTest() {
        // Construct the params object for operation updatePrestissimoEngine
        const engineId = 'testString';
        const description = 'updated description for prestissimo engine';
        const engineDisplayName = 'sampleEngine';
        const engineProperties = prestissimoEngineEnginePropertiesModel;
        const engineRestart = 'force';
        const removeEngineProperties = removeEnginePropertiesModel;
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const updatePrestissimoEngineParams = {
          engineId,
          description,
          engineDisplayName,
          engineProperties,
          engineRestart,
          removeEngineProperties,
          tags,
          authInstanceId,
        };

        const updatePrestissimoEngineResult = watsonxDataService.updatePrestissimoEngine(updatePrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(updatePrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.engine_properties).toEqual(engineProperties);
        expect(mockRequestOptions.body.engine_restart).toEqual(engineRestart);
        expect(mockRequestOptions.body.remove_engine_properties).toEqual(removeEngineProperties);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updatePrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updatePrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updatePrestissimoEngine(updatePrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updatePrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updatePrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPrestissimoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __listPrestissimoEngineCatalogsTest() {
        // Construct the params object for operation listPrestissimoEngineCatalogs
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listPrestissimoEngineCatalogsParams = {
          engineId,
          authInstanceId,
        };

        const listPrestissimoEngineCatalogsResult = watsonxDataService.listPrestissimoEngineCatalogs(listPrestissimoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(listPrestissimoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPrestissimoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listPrestissimoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listPrestissimoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPrestissimoEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listPrestissimoEngineCatalogs(listPrestissimoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listPrestissimoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listPrestissimoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addPrestissimoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __addPrestissimoEngineCatalogsTest() {
        // Construct the params object for operation addPrestissimoEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const addPrestissimoEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const addPrestissimoEngineCatalogsResult = watsonxDataService.addPrestissimoEngineCatalogs(addPrestissimoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(addPrestissimoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/catalogs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addPrestissimoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __addPrestissimoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __addPrestissimoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addPrestissimoEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.addPrestissimoEngineCatalogs(addPrestissimoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.addPrestissimoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.addPrestissimoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePrestissimoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __deletePrestissimoEngineCatalogsTest() {
        // Construct the params object for operation deletePrestissimoEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const deletePrestissimoEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const deletePrestissimoEngineCatalogsResult = watsonxDataService.deletePrestissimoEngineCatalogs(deletePrestissimoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(deletePrestissimoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/catalogs', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePrestissimoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deletePrestissimoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deletePrestissimoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogNames = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePrestissimoEngineCatalogsParams = {
          engineId,
          catalogNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deletePrestissimoEngineCatalogs(deletePrestissimoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestissimoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestissimoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPrestissimoEngineCatalog', () => {
    describe('positive tests', () => {
      function __getPrestissimoEngineCatalogTest() {
        // Construct the params object for operation getPrestissimoEngineCatalog
        const engineId = 'testString';
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const getPrestissimoEngineCatalogParams = {
          engineId,
          catalogId,
          authInstanceId,
        };

        const getPrestissimoEngineCatalogResult = watsonxDataService.getPrestissimoEngineCatalog(getPrestissimoEngineCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getPrestissimoEngineCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/catalogs/{catalog_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrestissimoEngineCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getPrestissimoEngineCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getPrestissimoEngineCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrestissimoEngineCatalogParams = {
          engineId,
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getPrestissimoEngineCatalog(getPrestissimoEngineCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getPrestissimoEngineCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getPrestissimoEngineCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('pausePrestissimoEngine', () => {
    describe('positive tests', () => {
      function __pausePrestissimoEngineTest() {
        // Construct the params object for operation pausePrestissimoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const pausePrestissimoEngineParams = {
          engineId,
          authInstanceId,
        };

        const pausePrestissimoEngineResult = watsonxDataService.pausePrestissimoEngine(pausePrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(pausePrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/pause', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __pausePrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __pausePrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __pausePrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const pausePrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.pausePrestissimoEngine(pausePrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.pausePrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.pausePrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runPrestissimoExplainStatement', () => {
    describe('positive tests', () => {
      function __runPrestissimoExplainStatementTest() {
        // Construct the params object for operation runPrestissimoExplainStatement
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const format = 'json';
        const type = 'io';
        const authInstanceId = 'testString';
        const runPrestissimoExplainStatementParams = {
          engineId,
          statement,
          format,
          type,
          authInstanceId,
        };

        const runPrestissimoExplainStatementResult = watsonxDataService.runPrestissimoExplainStatement(runPrestissimoExplainStatementParams);

        // all methods should return a Promise
        expectToBePromise(runPrestissimoExplainStatementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/query_explain', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.statement).toEqual(statement);
        expect(mockRequestOptions.body.format).toEqual(format);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runPrestissimoExplainStatementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __runPrestissimoExplainStatementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __runPrestissimoExplainStatementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runPrestissimoExplainStatementParams = {
          engineId,
          statement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.runPrestissimoExplainStatement(runPrestissimoExplainStatementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.runPrestissimoExplainStatement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.runPrestissimoExplainStatement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runPrestissimoExplainAnalyzeStatement', () => {
    describe('positive tests', () => {
      function __runPrestissimoExplainAnalyzeStatementTest() {
        // Construct the params object for operation runPrestissimoExplainAnalyzeStatement
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const verbose = true;
        const authInstanceId = 'testString';
        const runPrestissimoExplainAnalyzeStatementParams = {
          engineId,
          statement,
          verbose,
          authInstanceId,
        };

        const runPrestissimoExplainAnalyzeStatementResult = watsonxDataService.runPrestissimoExplainAnalyzeStatement(runPrestissimoExplainAnalyzeStatementParams);

        // all methods should return a Promise
        expectToBePromise(runPrestissimoExplainAnalyzeStatementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/query_explain_analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.statement).toEqual(statement);
        expect(mockRequestOptions.body.verbose).toEqual(verbose);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runPrestissimoExplainAnalyzeStatementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __runPrestissimoExplainAnalyzeStatementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __runPrestissimoExplainAnalyzeStatementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runPrestissimoExplainAnalyzeStatementParams = {
          engineId,
          statement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.runPrestissimoExplainAnalyzeStatement(runPrestissimoExplainAnalyzeStatementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.runPrestissimoExplainAnalyzeStatement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.runPrestissimoExplainAnalyzeStatement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('restartPrestissimoEngine', () => {
    describe('positive tests', () => {
      function __restartPrestissimoEngineTest() {
        // Construct the params object for operation restartPrestissimoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const restartPrestissimoEngineParams = {
          engineId,
          authInstanceId,
        };

        const restartPrestissimoEngineResult = watsonxDataService.restartPrestissimoEngine(restartPrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(restartPrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/restart', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restartPrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __restartPrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __restartPrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restartPrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.restartPrestissimoEngine(restartPrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.restartPrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.restartPrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('resumePrestissimoEngine', () => {
    describe('positive tests', () => {
      function __resumePrestissimoEngineTest() {
        // Construct the params object for operation resumePrestissimoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const resumePrestissimoEngineParams = {
          engineId,
          authInstanceId,
        };

        const resumePrestissimoEngineResult = watsonxDataService.resumePrestissimoEngine(resumePrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(resumePrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/resume', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __resumePrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __resumePrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __resumePrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const resumePrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.resumePrestissimoEngine(resumePrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.resumePrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.resumePrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('scalePrestissimoEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PrestissimoNodeDescriptionBody
      const prestissimoNodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      function __scalePrestissimoEngineTest() {
        // Construct the params object for operation scalePrestissimoEngine
        const engineId = 'testString';
        const coordinator = prestissimoNodeDescriptionBodyModel;
        const worker = prestissimoNodeDescriptionBodyModel;
        const authInstanceId = 'testString';
        const scalePrestissimoEngineParams = {
          engineId,
          coordinator,
          worker,
          authInstanceId,
        };

        const scalePrestissimoEngineResult = watsonxDataService.scalePrestissimoEngine(scalePrestissimoEngineParams);

        // all methods should return a Promise
        expectToBePromise(scalePrestissimoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/prestissimo_engines/{engine_id}/scale', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.coordinator).toEqual(coordinator);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __scalePrestissimoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __scalePrestissimoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __scalePrestissimoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const scalePrestissimoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.scalePrestissimoEngine(scalePrestissimoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.scalePrestissimoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.scalePrestissimoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPrestoEngines', () => {
    describe('positive tests', () => {
      function __listPrestoEnginesTest() {
        // Construct the params object for operation listPrestoEngines
        const authInstanceId = 'testString';
        const listPrestoEnginesParams = {
          authInstanceId,
        };

        const listPrestoEnginesResult = watsonxDataService.listPrestoEngines(listPrestoEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listPrestoEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPrestoEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listPrestoEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listPrestoEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPrestoEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listPrestoEngines(listPrestoEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listPrestoEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createPrestoEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NodeDescriptionBody
      const nodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      // EngineDetailsBody
      const engineDetailsBodyModel = {
        api_key: '<api_key>',
        connection_string: '1.2.3.4',
        coordinator: nodeDescriptionBodyModel,
        instance_id: 'instance_id',
        managed_by: 'fully/self',
        size_config: 'starter',
        worker: nodeDescriptionBodyModel,
      };

      function __createPrestoEngineTest() {
        // Construct the params object for operation createPrestoEngine
        const origin = 'native';
        const associatedCatalogs = ['iceberg_data', 'hive_data'];
        const description = 'presto engine for running sql queries';
        const engineDetails = engineDetailsBodyModel;
        const engineDisplayName = 'sampleEngine';
        const region = 'us-south';
        const tags = ['tag1', 'tag2'];
        const version = '1.2.3';
        const authInstanceId = 'testString';
        const createPrestoEngineParams = {
          origin,
          associatedCatalogs,
          description,
          engineDetails,
          engineDisplayName,
          region,
          tags,
          version,
          authInstanceId,
        };

        const createPrestoEngineResult = watsonxDataService.createPrestoEngine(createPrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(createPrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.associated_catalogs).toEqual(associatedCatalogs);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createPrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createPrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'native';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPrestoEngineParams = {
          origin,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createPrestoEngine(createPrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createPrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createPrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPrestoEngine', () => {
    describe('positive tests', () => {
      function __getPrestoEngineTest() {
        // Construct the params object for operation getPrestoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getPrestoEngineParams = {
          engineId,
          authInstanceId,
        };

        const getPrestoEngineResult = watsonxDataService.getPrestoEngine(getPrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(getPrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getPrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getPrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getPrestoEngine(getPrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteEngine', () => {
    describe('positive tests', () => {
      function __deleteEngineTest() {
        // Construct the params object for operation deleteEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteEngineResult = watsonxDataService.deleteEngine(deleteEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteEngine(deleteEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updatePrestoEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PrestoEnginePropertiesCatalog
      const prestoEnginePropertiesCatalogModel = {
        catalog_name: 'testString',
      };

      // NodeDescriptionBody
      const nodeDescriptionBodyModel = {
        node_type: 'worker',
        quantity: 38,
      };

      // EnginePropertiesOaiGen1Configuration
      const enginePropertiesOaiGen1ConfigurationModel = {
        coordinator: nodeDescriptionBodyModel,
        worker: nodeDescriptionBodyModel,
      };

      // PrestoEnginePropertiesGlobal
      const prestoEnginePropertiesGlobalModel = {
        global_property: 'enable-mixed-case-support:true',
      };

      // EnginePropertiesOaiGen1Jvm
      const enginePropertiesOaiGen1JvmModel = {
        coordinator: nodeDescriptionBodyModel,
        worker: nodeDescriptionBodyModel,
      };

      // PrestoEngineEngineProperties
      const prestoEngineEnginePropertiesModel = {
        catalog: prestoEnginePropertiesCatalogModel,
        configuration: enginePropertiesOaiGen1ConfigurationModel,
        global: prestoEnginePropertiesGlobalModel,
        jvm: enginePropertiesOaiGen1JvmModel,
      };

      // RemoveEnginePropertiesOaiGenConfiguration
      const removeEnginePropertiesOaiGenConfigurationModel = {
        coordinator: ['testString'],
        worker: ['testString'],
      };

      // RemoveEnginePropertiesOaiGenJvm
      const removeEnginePropertiesOaiGenJvmModel = {
        coordinator: ['testString'],
        worker: ['testString'],
      };

      // PrestoEnginePatchRemoveEngineProperties
      const prestoEnginePatchRemoveEnginePropertiesModel = {
        configuration: removeEnginePropertiesOaiGenConfigurationModel,
        jvm: removeEnginePropertiesOaiGenJvmModel,
        catalog: prestoEnginePropertiesCatalogModel,
      };

      function __updatePrestoEngineTest() {
        // Construct the params object for operation updatePrestoEngine
        const engineId = 'testString';
        const description = 'updated description for presto engine';
        const engineDisplayName = 'sampleEngine';
        const engineProperties = prestoEngineEnginePropertiesModel;
        const engineRestart = 'force';
        const removeEngineProperties = prestoEnginePatchRemoveEnginePropertiesModel;
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const updatePrestoEngineParams = {
          engineId,
          description,
          engineDisplayName,
          engineProperties,
          engineRestart,
          removeEngineProperties,
          tags,
          authInstanceId,
        };

        const updatePrestoEngineResult = watsonxDataService.updatePrestoEngine(updatePrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(updatePrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.engine_properties).toEqual(engineProperties);
        expect(mockRequestOptions.body.engine_restart).toEqual(engineRestart);
        expect(mockRequestOptions.body.remove_engine_properties).toEqual(removeEngineProperties);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updatePrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updatePrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updatePrestoEngine(updatePrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updatePrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updatePrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPrestoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __listPrestoEngineCatalogsTest() {
        // Construct the params object for operation listPrestoEngineCatalogs
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listPrestoEngineCatalogsParams = {
          engineId,
          authInstanceId,
        };

        const listPrestoEngineCatalogsResult = watsonxDataService.listPrestoEngineCatalogs(listPrestoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(listPrestoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPrestoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listPrestoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listPrestoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPrestoEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listPrestoEngineCatalogs(listPrestoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listPrestoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listPrestoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addPrestoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __addPrestoEngineCatalogsTest() {
        // Construct the params object for operation addPrestoEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const addPrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const addPrestoEngineCatalogsResult = watsonxDataService.addPrestoEngineCatalogs(addPrestoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(addPrestoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addPrestoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __addPrestoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __addPrestoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addPrestoEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.addPrestoEngineCatalogs(addPrestoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.addPrestoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.addPrestoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePrestoEngineCatalogs', () => {
    describe('positive tests', () => {
      function __deletePrestoEngineCatalogsTest() {
        // Construct the params object for operation deletePrestoEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const deletePrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const deletePrestoEngineCatalogsResult = watsonxDataService.deletePrestoEngineCatalogs(deletePrestoEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(deletePrestoEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePrestoEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deletePrestoEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deletePrestoEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogNames = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePrestoEngineCatalogsParams = {
          engineId,
          catalogNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deletePrestoEngineCatalogs(deletePrestoEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestoEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deletePrestoEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPrestoEngineCatalog', () => {
    describe('positive tests', () => {
      function __getPrestoEngineCatalogTest() {
        // Construct the params object for operation getPrestoEngineCatalog
        const engineId = 'testString';
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const getPrestoEngineCatalogParams = {
          engineId,
          catalogId,
          authInstanceId,
        };

        const getPrestoEngineCatalogResult = watsonxDataService.getPrestoEngineCatalog(getPrestoEngineCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getPrestoEngineCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/catalogs/{catalog_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrestoEngineCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getPrestoEngineCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getPrestoEngineCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrestoEngineCatalogParams = {
          engineId,
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getPrestoEngineCatalog(getPrestoEngineCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngineCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getPrestoEngineCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('pausePrestoEngine', () => {
    describe('positive tests', () => {
      function __pausePrestoEngineTest() {
        // Construct the params object for operation pausePrestoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const pausePrestoEngineParams = {
          engineId,
          authInstanceId,
        };

        const pausePrestoEngineResult = watsonxDataService.pausePrestoEngine(pausePrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(pausePrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/pause', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __pausePrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __pausePrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __pausePrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const pausePrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.pausePrestoEngine(pausePrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.pausePrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.pausePrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runExplainStatement', () => {
    describe('positive tests', () => {
      function __runExplainStatementTest() {
        // Construct the params object for operation runExplainStatement
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const format = 'json';
        const type = 'io';
        const authInstanceId = 'testString';
        const runExplainStatementParams = {
          engineId,
          statement,
          format,
          type,
          authInstanceId,
        };

        const runExplainStatementResult = watsonxDataService.runExplainStatement(runExplainStatementParams);

        // all methods should return a Promise
        expectToBePromise(runExplainStatementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/query_explain', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.statement).toEqual(statement);
        expect(mockRequestOptions.body.format).toEqual(format);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runExplainStatementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __runExplainStatementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __runExplainStatementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runExplainStatementParams = {
          engineId,
          statement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.runExplainStatement(runExplainStatementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.runExplainStatement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.runExplainStatement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runExplainAnalyzeStatement', () => {
    describe('positive tests', () => {
      function __runExplainAnalyzeStatementTest() {
        // Construct the params object for operation runExplainAnalyzeStatement
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const verbose = true;
        const authInstanceId = 'testString';
        const runExplainAnalyzeStatementParams = {
          engineId,
          statement,
          verbose,
          authInstanceId,
        };

        const runExplainAnalyzeStatementResult = watsonxDataService.runExplainAnalyzeStatement(runExplainAnalyzeStatementParams);

        // all methods should return a Promise
        expectToBePromise(runExplainAnalyzeStatementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/query_explain_analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.statement).toEqual(statement);
        expect(mockRequestOptions.body.verbose).toEqual(verbose);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runExplainAnalyzeStatementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __runExplainAnalyzeStatementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __runExplainAnalyzeStatementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const statement = 'show schemas in catalog_name';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runExplainAnalyzeStatementParams = {
          engineId,
          statement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.runExplainAnalyzeStatement(runExplainAnalyzeStatementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.runExplainAnalyzeStatement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.runExplainAnalyzeStatement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('restartPrestoEngine', () => {
    describe('positive tests', () => {
      function __restartPrestoEngineTest() {
        // Construct the params object for operation restartPrestoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const restartPrestoEngineParams = {
          engineId,
          authInstanceId,
        };

        const restartPrestoEngineResult = watsonxDataService.restartPrestoEngine(restartPrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(restartPrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/restart', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restartPrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __restartPrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __restartPrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restartPrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.restartPrestoEngine(restartPrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.restartPrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.restartPrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('resumePrestoEngine', () => {
    describe('positive tests', () => {
      function __resumePrestoEngineTest() {
        // Construct the params object for operation resumePrestoEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const resumePrestoEngineParams = {
          engineId,
          authInstanceId,
        };

        const resumePrestoEngineResult = watsonxDataService.resumePrestoEngine(resumePrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(resumePrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/resume', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __resumePrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __resumePrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __resumePrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const resumePrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.resumePrestoEngine(resumePrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.resumePrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.resumePrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('scalePrestoEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NodeDescription
      const nodeDescriptionModel = {
        node_type: 'worker',
        quantity: 38,
      };

      function __scalePrestoEngineTest() {
        // Construct the params object for operation scalePrestoEngine
        const engineId = 'testString';
        const coordinator = nodeDescriptionModel;
        const worker = nodeDescriptionModel;
        const authInstanceId = 'testString';
        const scalePrestoEngineParams = {
          engineId,
          coordinator,
          worker,
          authInstanceId,
        };

        const scalePrestoEngineResult = watsonxDataService.scalePrestoEngine(scalePrestoEngineParams);

        // all methods should return a Promise
        expectToBePromise(scalePrestoEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/presto_engines/{engine_id}/scale', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.coordinator).toEqual(coordinator);
        expect(mockRequestOptions.body.worker).toEqual(worker);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __scalePrestoEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __scalePrestoEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __scalePrestoEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const scalePrestoEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.scalePrestoEngine(scalePrestoEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.scalePrestoEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.scalePrestoEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSparkEngines', () => {
    describe('positive tests', () => {
      function __listSparkEnginesTest() {
        // Construct the params object for operation listSparkEngines
        const authInstanceId = 'testString';
        const listSparkEnginesParams = {
          authInstanceId,
        };

        const listSparkEnginesResult = watsonxDataService.listSparkEngines(listSparkEnginesParams);

        // all methods should return a Promise
        expectToBePromise(listSparkEnginesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSparkEnginesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSparkEnginesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSparkEnginesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSparkEnginesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSparkEngines(listSparkEnginesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listSparkEngines({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createSparkEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SparkDefaultConfig
      const sparkDefaultConfigModel = {
        config1: 'testString',
        config2: 'testString',
      };

      // SparkScaleConfig
      const sparkScaleConfigModel = {
        auto_scale_enabled: true,
        current_number_of_nodes: 2,
        maximum_number_of_nodes: 5,
        minimum_number_of_nodes: 1,
        node_type: 'small',
        number_of_nodes: 5,
      };

      // SparkEngineDetailsPrototype
      const sparkEngineDetailsPrototypeModel = {
        api_key: 'apikey',
        connection_string: '1.2.3.4',
        default_config: sparkDefaultConfigModel,
        default_version: '3.3',
        engine_home_bucket_display_name: 'test-spark-bucket',
        engine_home_bucket_name: '4fec0f8b-888a-4c16-8f38-250c8499e6ce-customer',
        engine_home_path: 'spark/spark1234',
        engine_home_volume_id: '1704979825978585',
        engine_home_volume_name: 'my-volume',
        engine_home_volume_storage_class: 'nfs-client',
        engine_home_volume_storage_size: '5Gi',
        instance_id: 'spark-id',
        managed_by: 'fully/self',
        scale_config: sparkScaleConfigModel,
      };

      function __createSparkEngineTest() {
        // Construct the params object for operation createSparkEngine
        const origin = 'native';
        const associatedCatalogs = ['iceberg_data'];
        const description = 'testString';
        const engineDetails = sparkEngineDetailsPrototypeModel;
        const engineDisplayName = 'test-native';
        const status = 'testString';
        const tags = ['testString'];
        const authInstanceId = 'testString';
        const createSparkEngineParams = {
          origin,
          associatedCatalogs,
          description,
          engineDetails,
          engineDisplayName,
          status,
          tags,
          authInstanceId,
        };

        const createSparkEngineResult = watsonxDataService.createSparkEngine(createSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.associated_catalogs).toEqual(associatedCatalogs);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'native';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEngineParams = {
          origin,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEngine(createSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSparkEngine', () => {
    describe('positive tests', () => {
      function __getSparkEngineTest() {
        // Construct the params object for operation getSparkEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getSparkEngineParams = {
          engineId,
          authInstanceId,
        };

        const getSparkEngineResult = watsonxDataService.getSparkEngine(getSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(getSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSparkEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getSparkEngine(getSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSparkEngine', () => {
    describe('positive tests', () => {
      function __deleteSparkEngineTest() {
        // Construct the params object for operation deleteSparkEngine
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteSparkEngineParams = {
          engineId,
          authInstanceId,
        };

        const deleteSparkEngineResult = watsonxDataService.deleteSparkEngine(deleteSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(deleteSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSparkEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSparkEngine(deleteSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSparkEngine', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UpdateSparkEngineBodyEngineDetails
      const updateSparkEngineBodyEngineDetailsModel = {
        default_config: { 'key1': 'testString' },
        default_version: '3.4',
      };

      function __updateSparkEngineTest() {
        // Construct the params object for operation updateSparkEngine
        const engineId = 'testString';
        const description = 'Updated Description';
        const engineDetails = updateSparkEngineBodyEngineDetailsModel;
        const engineDisplayName = 'Updated Display Name';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const updateSparkEngineParams = {
          engineId,
          description,
          engineDetails,
          engineDisplayName,
          tags,
          authInstanceId,
        };

        const updateSparkEngineResult = watsonxDataService.updateSparkEngine(updateSparkEngineParams);

        // all methods should return a Promise
        expectToBePromise(updateSparkEngineResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.engine_details).toEqual(engineDetails);
        expect(mockRequestOptions.body.engine_display_name).toEqual(engineDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSparkEngineTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateSparkEngineTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateSparkEngineTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSparkEngineParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateSparkEngine(updateSparkEngineParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateSparkEngine({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateSparkEngine();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSparkEngineApplications', () => {
    describe('positive tests', () => {
      function __listSparkEngineApplicationsTest() {
        // Construct the params object for operation listSparkEngineApplications
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const state = ['testString'];
        const listSparkEngineApplicationsParams = {
          engineId,
          authInstanceId,
          state,
        };

        const listSparkEngineApplicationsResult = watsonxDataService.listSparkEngineApplications(listSparkEngineApplicationsParams);

        // all methods should return a Promise
        expectToBePromise(listSparkEngineApplicationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSparkEngineApplicationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSparkEngineApplicationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSparkEngineApplicationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSparkEngineApplicationsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSparkEngineApplications(listSparkEngineApplicationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listSparkEngineApplications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listSparkEngineApplications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSparkEngineApplication', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SparkApplicationConfig
      const sparkApplicationConfigModel = {
        spark_sample_config_properpty: 'testString',
      };

      // SparkApplicationEnv
      const sparkApplicationEnvModel = {
        sample_env_key: 'testString',
      };

      // SparkApplicationDetails
      const sparkApplicationDetailsModel = {
        application: '/opt/ibm/spark/examples/src/main/python/wordcount.py',
        arguments: ['/opt/ibm/spark/examples/src/main/resources/people.txt'],
        class: 'org.apache.spark.examples.SparkPi',
        conf: sparkApplicationConfigModel,
        env: sparkApplicationEnvModel,
        files: 's3://mybucket/myfile.txt',
        jars: 'testString',
        name: 'SparkApplicaton1',
        packages: 'org.apache.spark:example_1.2.3',
        repositories: 'https://repo1.maven.org/maven2/',
        spark_version: '3.3',
      };

      // SparkVolumeDetails
      const sparkVolumeDetailsModel = {
        mount_path: '/mount/path',
        name: 'my-volume',
        read_only: true,
        source_sub_path: '/source/path',
      };

      function __createSparkEngineApplicationTest() {
        // Construct the params object for operation createSparkEngineApplication
        const engineId = 'testString';
        const applicationDetails = sparkApplicationDetailsModel;
        const jobEndpoint = 'testString';
        const serviceInstanceId = 'testString';
        const type = 'iae';
        const volumes = [sparkVolumeDetailsModel];
        const authInstanceId = 'testString';
        const state = ['testString'];
        const createSparkEngineApplicationParams = {
          engineId,
          applicationDetails,
          jobEndpoint,
          serviceInstanceId,
          type,
          volumes,
          authInstanceId,
          state,
        };

        const createSparkEngineApplicationResult = watsonxDataService.createSparkEngineApplication(createSparkEngineApplicationParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEngineApplicationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.application_details).toEqual(applicationDetails);
        expect(mockRequestOptions.body.job_endpoint).toEqual(jobEndpoint);
        expect(mockRequestOptions.body.service_instance_id).toEqual(serviceInstanceId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.volumes).toEqual(volumes);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEngineApplicationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEngineApplicationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEngineApplicationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const applicationDetails = sparkApplicationDetailsModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEngineApplicationParams = {
          engineId,
          applicationDetails,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEngineApplication(createSparkEngineApplicationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineApplication({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineApplication();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSparkEngineApplications', () => {
    describe('positive tests', () => {
      function __deleteSparkEngineApplicationsTest() {
        // Construct the params object for operation deleteSparkEngineApplications
        const engineId = 'testString';
        const applicationId = 'testString';
        const authInstanceId = 'testString';
        const state = ['testString'];
        const deleteSparkEngineApplicationsParams = {
          engineId,
          applicationId,
          authInstanceId,
          state,
        };

        const deleteSparkEngineApplicationsResult = watsonxDataService.deleteSparkEngineApplications(deleteSparkEngineApplicationsParams);

        // all methods should return a Promise
        expectToBePromise(deleteSparkEngineApplicationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.application_id).toEqual(applicationId);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSparkEngineApplicationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSparkEngineApplicationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSparkEngineApplicationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const applicationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSparkEngineApplicationsParams = {
          engineId,
          applicationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSparkEngineApplications(deleteSparkEngineApplicationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineApplications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineApplications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSparkEngineApplicationStatus', () => {
    describe('positive tests', () => {
      function __getSparkEngineApplicationStatusTest() {
        // Construct the params object for operation getSparkEngineApplicationStatus
        const engineId = 'testString';
        const applicationId = 'testString';
        const authInstanceId = 'testString';
        const getSparkEngineApplicationStatusParams = {
          engineId,
          applicationId,
          authInstanceId,
        };

        const getSparkEngineApplicationStatusResult = watsonxDataService.getSparkEngineApplicationStatus(getSparkEngineApplicationStatusParams);

        // all methods should return a Promise
        expectToBePromise(getSparkEngineApplicationStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/applications/{application_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.application_id).toEqual(applicationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSparkEngineApplicationStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getSparkEngineApplicationStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getSparkEngineApplicationStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const applicationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSparkEngineApplicationStatusParams = {
          engineId,
          applicationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getSparkEngineApplicationStatus(getSparkEngineApplicationStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineApplicationStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineApplicationStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSparkEngineCatalogs', () => {
    describe('positive tests', () => {
      function __listSparkEngineCatalogsTest() {
        // Construct the params object for operation listSparkEngineCatalogs
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listSparkEngineCatalogsParams = {
          engineId,
          authInstanceId,
        };

        const listSparkEngineCatalogsResult = watsonxDataService.listSparkEngineCatalogs(listSparkEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(listSparkEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSparkEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSparkEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSparkEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSparkEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSparkEngineCatalogs(listSparkEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listSparkEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listSparkEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addSparkEngineCatalogs', () => {
    describe('positive tests', () => {
      function __addSparkEngineCatalogsTest() {
        // Construct the params object for operation addSparkEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const addSparkEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const addSparkEngineCatalogsResult = watsonxDataService.addSparkEngineCatalogs(addSparkEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(addSparkEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/catalogs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addSparkEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __addSparkEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __addSparkEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addSparkEngineCatalogsParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.addSparkEngineCatalogs(addSparkEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.addSparkEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.addSparkEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSparkEngineCatalogs', () => {
    describe('positive tests', () => {
      function __deleteSparkEngineCatalogsTest() {
        // Construct the params object for operation deleteSparkEngineCatalogs
        const engineId = 'testString';
        const catalogNames = 'testString';
        const authInstanceId = 'testString';
        const deleteSparkEngineCatalogsParams = {
          engineId,
          catalogNames,
          authInstanceId,
        };

        const deleteSparkEngineCatalogsResult = watsonxDataService.deleteSparkEngineCatalogs(deleteSparkEngineCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(deleteSparkEngineCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/catalogs', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.catalog_names).toEqual(catalogNames);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSparkEngineCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSparkEngineCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSparkEngineCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogNames = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSparkEngineCatalogsParams = {
          engineId,
          catalogNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSparkEngineCatalogs(deleteSparkEngineCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineCatalogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineCatalogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSparkEngineCatalog', () => {
    describe('positive tests', () => {
      function __getSparkEngineCatalogTest() {
        // Construct the params object for operation getSparkEngineCatalog
        const engineId = 'testString';
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const getSparkEngineCatalogParams = {
          engineId,
          catalogId,
          authInstanceId,
        };

        const getSparkEngineCatalogResult = watsonxDataService.getSparkEngineCatalog(getSparkEngineCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getSparkEngineCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/catalogs/{catalog_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSparkEngineCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getSparkEngineCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getSparkEngineCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSparkEngineCatalogParams = {
          engineId,
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getSparkEngineCatalog(getSparkEngineCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSparkEngineHistoryServer', () => {
    describe('positive tests', () => {
      function __getSparkEngineHistoryServerTest() {
        // Construct the params object for operation getSparkEngineHistoryServer
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getSparkEngineHistoryServerParams = {
          engineId,
          authInstanceId,
        };

        const getSparkEngineHistoryServerResult = watsonxDataService.getSparkEngineHistoryServer(getSparkEngineHistoryServerParams);

        // all methods should return a Promise
        expectToBePromise(getSparkEngineHistoryServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/history_server', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSparkEngineHistoryServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getSparkEngineHistoryServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getSparkEngineHistoryServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSparkEngineHistoryServerParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getSparkEngineHistoryServer(getSparkEngineHistoryServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineHistoryServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getSparkEngineHistoryServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('startSparkEngineHistoryServer', () => {
    describe('positive tests', () => {
      function __startSparkEngineHistoryServerTest() {
        // Construct the params object for operation startSparkEngineHistoryServer
        const engineId = 'testString';
        const cores = '1';
        const memory = '4G';
        const authInstanceId = 'testString';
        const startSparkEngineHistoryServerParams = {
          engineId,
          cores,
          memory,
          authInstanceId,
        };

        const startSparkEngineHistoryServerResult = watsonxDataService.startSparkEngineHistoryServer(startSparkEngineHistoryServerParams);

        // all methods should return a Promise
        expectToBePromise(startSparkEngineHistoryServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/history_server', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.cores).toEqual(cores);
        expect(mockRequestOptions.body.memory).toEqual(memory);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __startSparkEngineHistoryServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __startSparkEngineHistoryServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __startSparkEngineHistoryServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const startSparkEngineHistoryServerParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.startSparkEngineHistoryServer(startSparkEngineHistoryServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.startSparkEngineHistoryServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.startSparkEngineHistoryServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSparkEngineHistoryServer', () => {
    describe('positive tests', () => {
      function __deleteSparkEngineHistoryServerTest() {
        // Construct the params object for operation deleteSparkEngineHistoryServer
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteSparkEngineHistoryServerParams = {
          engineId,
          authInstanceId,
        };

        const deleteSparkEngineHistoryServerResult = watsonxDataService.deleteSparkEngineHistoryServer(deleteSparkEngineHistoryServerParams);

        // all methods should return a Promise
        expectToBePromise(deleteSparkEngineHistoryServerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/history_server', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSparkEngineHistoryServerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSparkEngineHistoryServerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSparkEngineHistoryServerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSparkEngineHistoryServerParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSparkEngineHistoryServer(deleteSparkEngineHistoryServerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineHistoryServer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSparkEngineHistoryServer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSparkEnginePause', () => {
    describe('positive tests', () => {
      function __createSparkEnginePauseTest() {
        // Construct the params object for operation createSparkEnginePause
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const createSparkEnginePauseParams = {
          engineId,
          authInstanceId,
        };

        const createSparkEnginePauseResult = watsonxDataService.createSparkEnginePause(createSparkEnginePauseParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEnginePauseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/pause', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEnginePauseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEnginePauseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEnginePauseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEnginePauseParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEnginePause(createSparkEnginePauseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEnginePause({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEnginePause();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSparkEngineResume', () => {
    describe('positive tests', () => {
      function __createSparkEngineResumeTest() {
        // Construct the params object for operation createSparkEngineResume
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const createSparkEngineResumeParams = {
          engineId,
          authInstanceId,
        };

        const createSparkEngineResumeResult = watsonxDataService.createSparkEngineResume(createSparkEngineResumeParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEngineResumeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/resume', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEngineResumeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEngineResumeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEngineResumeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEngineResumeParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEngineResume(createSparkEngineResumeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineResume({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineResume();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSparkEngineScale', () => {
    describe('positive tests', () => {
      function __createSparkEngineScaleTest() {
        // Construct the params object for operation createSparkEngineScale
        const engineId = 'testString';
        const numberOfNodes = 2;
        const authInstanceId = 'testString';
        const createSparkEngineScaleParams = {
          engineId,
          numberOfNodes,
          authInstanceId,
        };

        const createSparkEngineScaleResult = watsonxDataService.createSparkEngineScale(createSparkEngineScaleParams);

        // all methods should return a Promise
        expectToBePromise(createSparkEngineScaleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_engines/{engine_id}/scale', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.number_of_nodes).toEqual(numberOfNodes);
        expect(mockRequestOptions.path.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSparkEngineScaleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSparkEngineScaleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSparkEngineScaleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSparkEngineScaleParams = {
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSparkEngineScale(createSparkEngineScaleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineScale({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSparkEngineScale();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSparkVersions', () => {
    describe('positive tests', () => {
      function __listSparkVersionsTest() {
        // Construct the params object for operation listSparkVersions
        const authInstanceId = 'testString';
        const listSparkVersionsParams = {
          authInstanceId,
        };

        const listSparkVersionsResult = watsonxDataService.listSparkVersions(listSparkVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listSparkVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/spark_versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSparkVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSparkVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSparkVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSparkVersionsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSparkVersions(listSparkVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listSparkVersions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listCatalogs', () => {
    describe('positive tests', () => {
      function __listCatalogsTest() {
        // Construct the params object for operation listCatalogs
        const authInstanceId = 'testString';
        const listCatalogsParams = {
          authInstanceId,
        };

        const listCatalogsResult = watsonxDataService.listCatalogs(listCatalogsParams);

        // all methods should return a Promise
        expectToBePromise(listCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCatalogsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listCatalogs(listCatalogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listCatalogs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCatalog', () => {
    describe('positive tests', () => {
      function __getCatalogTest() {
        // Construct the params object for operation getCatalog
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const getCatalogParams = {
          catalogId,
          authInstanceId,
        };

        const getCatalogResult = watsonxDataService.getCatalog(getCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCatalogParams = {
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getCatalog(getCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSchemas', () => {
    describe('positive tests', () => {
      function __listSchemasTest() {
        // Construct the params object for operation listSchemas
        const engineId = 'testString';
        const catalogId = 'testString';
        const authInstanceId = 'testString';
        const listSchemasParams = {
          engineId,
          catalogId,
          authInstanceId,
        };

        const listSchemasResult = watsonxDataService.listSchemas(listSchemasParams);

        // all methods should return a Promise
        expectToBePromise(listSchemasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSchemasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listSchemasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listSchemasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSchemasParams = {
          engineId,
          catalogId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listSchemas(listSchemasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listSchemas({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listSchemas();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSchema', () => {
    describe('positive tests', () => {
      function __createSchemaTest() {
        // Construct the params object for operation createSchema
        const engineId = 'testString';
        const catalogId = 'testString';
        const customPath = 'sample-path';
        const schemaName = 'SampleSchema1';
        const bucketName = 'sample-bucket';
        const authInstanceId = 'testString';
        const createSchemaParams = {
          engineId,
          catalogId,
          customPath,
          schemaName,
          bucketName,
          authInstanceId,
        };

        const createSchemaResult = watsonxDataService.createSchema(createSchemaParams);

        // all methods should return a Promise
        expectToBePromise(createSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.custom_path).toEqual(customPath);
        expect(mockRequestOptions.body.schema_name).toEqual(schemaName);
        expect(mockRequestOptions.body.bucket_name).toEqual(bucketName);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const customPath = 'sample-path';
        const schemaName = 'SampleSchema1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSchemaParams = {
          engineId,
          catalogId,
          customPath,
          schemaName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createSchema(createSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSchema', () => {
    describe('positive tests', () => {
      function __deleteSchemaTest() {
        // Construct the params object for operation deleteSchema
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const authInstanceId = 'testString';
        const deleteSchemaParams = {
          engineId,
          catalogId,
          schemaId,
          authInstanceId,
        };

        const deleteSchemaResult = watsonxDataService.deleteSchema(deleteSchemaParams);

        // all methods should return a Promise
        expectToBePromise(deleteSchemaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSchemaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteSchemaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteSchemaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSchemaParams = {
          engineId,
          catalogId,
          schemaId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteSchema(deleteSchemaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteSchema({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteSchema();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTables', () => {
    describe('positive tests', () => {
      function __listTablesTest() {
        // Construct the params object for operation listTables
        const catalogId = 'testString';
        const schemaId = 'testString';
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const listTablesParams = {
          catalogId,
          schemaId,
          engineId,
          authInstanceId,
        };

        const listTablesResult = watsonxDataService.listTables(listTablesParams);

        // all methods should return a Promise
        expectToBePromise(listTablesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTablesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listTablesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listTablesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTablesParams = {
          catalogId,
          schemaId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listTables(listTablesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listTables({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listTables();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTable', () => {
    describe('positive tests', () => {
      function __getTableTest() {
        // Construct the params object for operation getTable
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const getTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          authInstanceId,
        };

        const getTableResult = watsonxDataService.getTable(getTableParams);

        // all methods should return a Promise
        expectToBePromise(getTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getTable(getTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTable', () => {
    describe('positive tests', () => {
      function __deleteTableTest() {
        // Construct the params object for operation deleteTable
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const authInstanceId = 'testString';
        const deleteTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          authInstanceId,
        };

        const deleteTableResult = watsonxDataService.deleteTable(deleteTableParams);

        // all methods should return a Promise
        expectToBePromise(deleteTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteTable(deleteTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('renameTable', () => {
    describe('positive tests', () => {
      function __renameTableTest() {
        // Construct the params object for operation renameTable
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const tableName = 'updated_table_name';
        const authInstanceId = 'testString';
        const renameTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          tableName,
          authInstanceId,
        };

        const renameTableResult = watsonxDataService.renameTable(renameTableParams);

        // all methods should return a Promise
        expectToBePromise(renameTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.table_name).toEqual(tableName);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __renameTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __renameTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __renameTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const engineId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const renameTableParams = {
          catalogId,
          schemaId,
          tableId,
          engineId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.renameTable(renameTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.renameTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.renameTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listColumns', () => {
    describe('positive tests', () => {
      function __listColumnsTest() {
        // Construct the params object for operation listColumns
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const authInstanceId = 'testString';
        const listColumnsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          authInstanceId,
        };

        const listColumnsResult = watsonxDataService.listColumns(listColumnsParams);

        // all methods should return a Promise
        expectToBePromise(listColumnsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listColumnsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listColumnsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listColumnsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listColumnsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listColumns(listColumnsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listColumns({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listColumns();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createColumns', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Column
      const columnModel = {
        column_name: 'expenses',
        comment: 'expenses column',
        extra: 'varchar',
        length: '30',
        scale: '2',
        type: 'varchar',
      };

      function __createColumnsTest() {
        // Construct the params object for operation createColumns
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const columns = [columnModel];
        const authInstanceId = 'testString';
        const createColumnsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          columns,
          authInstanceId,
        };

        const createColumnsResult = watsonxDataService.createColumns(createColumnsParams);

        // all methods should return a Promise
        expectToBePromise(createColumnsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.columns).toEqual(columns);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createColumnsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createColumnsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createColumnsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createColumnsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createColumns(createColumnsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createColumns({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createColumns();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteColumn', () => {
    describe('positive tests', () => {
      function __deleteColumnTest() {
        // Construct the params object for operation deleteColumn
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const columnId = 'testString';
        const authInstanceId = 'testString';
        const deleteColumnParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          columnId,
          authInstanceId,
        };

        const deleteColumnResult = watsonxDataService.deleteColumn(deleteColumnParams);

        // all methods should return a Promise
        expectToBePromise(deleteColumnResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns/{column_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
        expect(mockRequestOptions.path.column_id).toEqual(columnId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteColumnTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteColumnTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteColumnTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const columnId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteColumnParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          columnId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteColumn(deleteColumnParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteColumn({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteColumn();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateColumn', () => {
    describe('positive tests', () => {
      function __updateColumnTest() {
        // Construct the params object for operation updateColumn
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const columnId = 'testString';
        const columnName = 'expenses';
        const authInstanceId = 'testString';
        const updateColumnParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          columnId,
          columnName,
          authInstanceId,
        };

        const updateColumnResult = watsonxDataService.updateColumn(updateColumnParams);

        // all methods should return a Promise
        expectToBePromise(updateColumnResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/columns/{column_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.column_name).toEqual(columnName);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
        expect(mockRequestOptions.path.column_id).toEqual(columnId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateColumnTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateColumnTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateColumnTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const columnId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateColumnParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          columnId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateColumn(updateColumnParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateColumn({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateColumn();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTableSnapshots', () => {
    describe('positive tests', () => {
      function __listTableSnapshotsTest() {
        // Construct the params object for operation listTableSnapshots
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const authInstanceId = 'testString';
        const listTableSnapshotsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          authInstanceId,
        };

        const listTableSnapshotsResult = watsonxDataService.listTableSnapshots(listTableSnapshotsParams);

        // all methods should return a Promise
        expectToBePromise(listTableSnapshotsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/snapshots', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTableSnapshotsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listTableSnapshotsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listTableSnapshotsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTableSnapshotsParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listTableSnapshots(listTableSnapshotsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listTableSnapshots({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listTableSnapshots();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('rollbackTable', () => {
    describe('positive tests', () => {
      function __rollbackTableTest() {
        // Construct the params object for operation rollbackTable
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const snapshotId = 'testString';
        const authInstanceId = 'testString';
        const rollbackTableParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          snapshotId,
          authInstanceId,
        };

        const rollbackTableResult = watsonxDataService.rollbackTable(rollbackTableParams);

        // all methods should return a Promise
        expectToBePromise(rollbackTableResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/schemas/{schema_id}/tables/{table_id}/rollback', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.snapshot_id).toEqual(snapshotId);
        expect(mockRequestOptions.qs.engine_id).toEqual(engineId);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.path.schema_id).toEqual(schemaId);
        expect(mockRequestOptions.path.table_id).toEqual(tableId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __rollbackTableTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __rollbackTableTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __rollbackTableTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const engineId = 'testString';
        const catalogId = 'testString';
        const schemaId = 'testString';
        const tableId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const rollbackTableParams = {
          engineId,
          catalogId,
          schemaId,
          tableId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.rollbackTable(rollbackTableParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.rollbackTable({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.rollbackTable();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSyncCatalog', () => {
    describe('positive tests', () => {
      function __updateSyncCatalogTest() {
        // Construct the params object for operation updateSyncCatalog
        const catalogId = 'testString';
        const autoAddNewTables = true;
        const syncIcebergMd = true;
        const authInstanceId = 'testString';
        const updateSyncCatalogParams = {
          catalogId,
          autoAddNewTables,
          syncIcebergMd,
          authInstanceId,
        };

        const updateSyncCatalogResult = watsonxDataService.updateSyncCatalog(updateSyncCatalogParams);

        // all methods should return a Promise
        expectToBePromise(updateSyncCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_id}/sync', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.auto_add_new_tables).toEqual(autoAddNewTables);
        expect(mockRequestOptions.body.sync_iceberg_md).toEqual(syncIcebergMd);
        expect(mockRequestOptions.path.catalog_id).toEqual(catalogId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSyncCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateSyncCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateSyncCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogId = 'testString';
        const autoAddNewTables = true;
        const syncIcebergMd = true;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSyncCatalogParams = {
          catalogId,
          autoAddNewTables,
          syncIcebergMd,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateSyncCatalog(updateSyncCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateSyncCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateSyncCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listMilvusServices', () => {
    describe('positive tests', () => {
      function __listMilvusServicesTest() {
        // Construct the params object for operation listMilvusServices
        const authInstanceId = 'testString';
        const listMilvusServicesParams = {
          authInstanceId,
        };

        const listMilvusServicesResult = watsonxDataService.listMilvusServices(listMilvusServicesParams);

        // all methods should return a Promise
        expectToBePromise(listMilvusServicesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/milvus_services', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listMilvusServicesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listMilvusServicesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listMilvusServicesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listMilvusServicesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listMilvusServices(listMilvusServicesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        watsonxDataService.listMilvusServices({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createMilvusService', () => {
    describe('positive tests', () => {
      function __createMilvusServiceTest() {
        // Construct the params object for operation createMilvusService
        const origin = 'native';
        const description = 'milvus service for running sql queries';
        const serviceDisplayName = 'sampleService';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const createMilvusServiceParams = {
          origin,
          description,
          serviceDisplayName,
          tags,
          authInstanceId,
        };

        const createMilvusServiceResult = watsonxDataService.createMilvusService(createMilvusServiceParams);

        // all methods should return a Promise
        expectToBePromise(createMilvusServiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/milvus_services', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.origin).toEqual(origin);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.service_display_name).toEqual(serviceDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createMilvusServiceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createMilvusServiceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createMilvusServiceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const origin = 'native';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createMilvusServiceParams = {
          origin,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createMilvusService(createMilvusServiceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createMilvusService({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createMilvusService();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getMilvusService', () => {
    describe('positive tests', () => {
      function __getMilvusServiceTest() {
        // Construct the params object for operation getMilvusService
        const serviceId = 'testString';
        const authInstanceId = 'testString';
        const getMilvusServiceParams = {
          serviceId,
          authInstanceId,
        };

        const getMilvusServiceResult = watsonxDataService.getMilvusService(getMilvusServiceParams);

        // all methods should return a Promise
        expectToBePromise(getMilvusServiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/milvus_services/{service_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.service_id).toEqual(serviceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMilvusServiceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getMilvusServiceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getMilvusServiceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const serviceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMilvusServiceParams = {
          serviceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getMilvusService(getMilvusServiceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getMilvusService({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getMilvusService();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteMilvusService', () => {
    describe('positive tests', () => {
      function __deleteMilvusServiceTest() {
        // Construct the params object for operation deleteMilvusService
        const serviceId = 'testString';
        const authInstanceId = 'testString';
        const deleteMilvusServiceParams = {
          serviceId,
          authInstanceId,
        };

        const deleteMilvusServiceResult = watsonxDataService.deleteMilvusService(deleteMilvusServiceParams);

        // all methods should return a Promise
        expectToBePromise(deleteMilvusServiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/milvus_services/{service_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.service_id).toEqual(serviceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteMilvusServiceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteMilvusServiceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteMilvusServiceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const serviceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteMilvusServiceParams = {
          serviceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteMilvusService(deleteMilvusServiceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteMilvusService({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteMilvusService();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateMilvusService', () => {
    describe('positive tests', () => {
      function __updateMilvusServiceTest() {
        // Construct the params object for operation updateMilvusService
        const serviceId = 'testString';
        const description = 'updated description for milvus service';
        const serviceDisplayName = 'sampleService';
        const tags = ['tag1', 'tag2'];
        const authInstanceId = 'testString';
        const updateMilvusServiceParams = {
          serviceId,
          description,
          serviceDisplayName,
          tags,
          authInstanceId,
        };

        const updateMilvusServiceResult = watsonxDataService.updateMilvusService(updateMilvusServiceParams);

        // all methods should return a Promise
        expectToBePromise(updateMilvusServiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/milvus_services/{service_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.service_display_name).toEqual(serviceDisplayName);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.path.service_id).toEqual(serviceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateMilvusServiceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __updateMilvusServiceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __updateMilvusServiceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const serviceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateMilvusServiceParams = {
          serviceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.updateMilvusService(updateMilvusServiceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.updateMilvusService({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.updateMilvusService();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listIngestionJobs', () => {
    describe('positive tests', () => {
      function __listIngestionJobsTest() {
        // Construct the params object for operation listIngestionJobs
        const authInstanceId = 'testString';
        const page = 1;
        const jobsPerPage = 1;
        const listIngestionJobsParams = {
          authInstanceId,
          page,
          jobsPerPage,
        };

        const listIngestionJobsResult = watsonxDataService.listIngestionJobs(listIngestionJobsParams);

        // all methods should return a Promise
        expectToBePromise(listIngestionJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ingestion_jobs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.qs.page).toEqual(page);
        expect(mockRequestOptions.qs.jobs_per_page).toEqual(jobsPerPage);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIngestionJobsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __listIngestionJobsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __listIngestionJobsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIngestionJobsParams = {
          authInstanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.listIngestionJobs(listIngestionJobsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.listIngestionJobs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.listIngestionJobs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createIngestionJobs', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // IngestionJobPrototypeCsvProperty
      const ingestionJobPrototypeCsvPropertyModel = {
        encoding: 'utf-8',
        escape_character: '\\\\',
        field_delimiter: ',',
        header: true,
        line_delimiter: '\\n',
      };

      // IngestionJobPrototypeExecuteConfig
      const ingestionJobPrototypeExecuteConfigModel = {
        driver_cores: 1,
        driver_memory: '2G',
        executor_cores: 1,
        executor_memory: '2G',
        num_executors: 1,
      };

      function __createIngestionJobsTest() {
        // Construct the params object for operation createIngestionJobs
        const authInstanceId = 'testString';
        const jobId = 'ingestion-1699459946935';
        const sourceDataFiles = 's3://demobucket/data/yellow_tripdata_2022-01.parquet';
        const targetTable = 'demodb.test.targettable';
        const username = 'user1';
        const createIfNotExist = false;
        const csvProperty = ingestionJobPrototypeCsvPropertyModel;
        const engineId = 'spark123';
        const executeConfig = ingestionJobPrototypeExecuteConfigModel;
        const partitionBy = 'col1, col2';
        const schema = '{"type":"struct","schema-id":0,"fields":[{"id":1,"name":"ID","required":true,"type":"int"},{"id":2,"name":"Name","required":true,"type":"string"}]}';
        const sourceFileType = 'csv';
        const validateCsvHeader = false;
        const createIngestionJobsParams = {
          authInstanceId,
          jobId,
          sourceDataFiles,
          targetTable,
          username,
          createIfNotExist,
          csvProperty,
          engineId,
          executeConfig,
          partitionBy,
          schema,
          sourceFileType,
          validateCsvHeader,
        };

        const createIngestionJobsResult = watsonxDataService.createIngestionJobs(createIngestionJobsParams);

        // all methods should return a Promise
        expectToBePromise(createIngestionJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ingestion_jobs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.job_id).toEqual(jobId);
        expect(mockRequestOptions.body.source_data_files).toEqual(sourceDataFiles);
        expect(mockRequestOptions.body.target_table).toEqual(targetTable);
        expect(mockRequestOptions.body.username).toEqual(username);
        expect(mockRequestOptions.body.create_if_not_exist).toEqual(createIfNotExist);
        expect(mockRequestOptions.body.csv_property).toEqual(csvProperty);
        expect(mockRequestOptions.body.engine_id).toEqual(engineId);
        expect(mockRequestOptions.body.execute_config).toEqual(executeConfig);
        expect(mockRequestOptions.body.partition_by).toEqual(partitionBy);
        expect(mockRequestOptions.body.schema).toEqual(schema);
        expect(mockRequestOptions.body.source_file_type).toEqual(sourceFileType);
        expect(mockRequestOptions.body.validate_csv_header).toEqual(validateCsvHeader);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createIngestionJobsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createIngestionJobsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createIngestionJobsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authInstanceId = 'testString';
        const jobId = 'ingestion-1699459946935';
        const sourceDataFiles = 's3://demobucket/data/yellow_tripdata_2022-01.parquet';
        const targetTable = 'demodb.test.targettable';
        const username = 'user1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createIngestionJobsParams = {
          authInstanceId,
          jobId,
          sourceDataFiles,
          targetTable,
          username,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createIngestionJobs(createIngestionJobsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createIngestionJobs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createIngestionJobs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createIngestionJobsLocalFiles', () => {
    describe('positive tests', () => {
      function __createIngestionJobsLocalFilesTest() {
        // Construct the params object for operation createIngestionJobsLocalFiles
        const authInstanceId = 'testString';
        const sourceDataFile = Buffer.from('This is a mock file.');
        const targetTable = 'testString';
        const jobId = 'testString';
        const username = 'testString';
        const sourceDataFileContentType = 'testString';
        const sourceFileType = 'csv';
        const csvProperty = 'testString';
        const createIfNotExist = false;
        const validateCsvHeader = false;
        const executeConfig = 'testString';
        const engineId = 'testString';
        const createIngestionJobsLocalFilesParams = {
          authInstanceId,
          sourceDataFile,
          targetTable,
          jobId,
          username,
          sourceDataFileContentType,
          sourceFileType,
          csvProperty,
          createIfNotExist,
          validateCsvHeader,
          executeConfig,
          engineId,
        };

        const createIngestionJobsLocalFilesResult = watsonxDataService.createIngestionJobsLocalFiles(createIngestionJobsLocalFilesParams);

        // all methods should return a Promise
        expectToBePromise(createIngestionJobsLocalFilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ingestion_jobs_local_files', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.formData.source_data_file.data).toEqual(sourceDataFile);
        expect(mockRequestOptions.formData.source_data_file.contentType).toEqual(sourceDataFileContentType);
        expect(mockRequestOptions.formData.target_table).toEqual(targetTable);
        expect(mockRequestOptions.formData.job_id).toEqual(jobId);
        expect(mockRequestOptions.formData.username).toEqual(username);
        expect(mockRequestOptions.formData.source_file_type).toEqual(sourceFileType);
        expect(mockRequestOptions.formData.csv_property).toEqual(csvProperty);
        expect(mockRequestOptions.formData.create_if_not_exist).toEqual(createIfNotExist);
        expect(mockRequestOptions.formData.validate_csv_header).toEqual(validateCsvHeader);
        expect(mockRequestOptions.formData.execute_config).toEqual(executeConfig);
        expect(mockRequestOptions.formData.engine_id).toEqual(engineId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createIngestionJobsLocalFilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createIngestionJobsLocalFilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createIngestionJobsLocalFilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authInstanceId = 'testString';
        const sourceDataFile = Buffer.from('This is a mock file.');
        const targetTable = 'testString';
        const jobId = 'testString';
        const username = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createIngestionJobsLocalFilesParams = {
          authInstanceId,
          sourceDataFile,
          targetTable,
          jobId,
          username,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createIngestionJobsLocalFiles(createIngestionJobsLocalFilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createIngestionJobsLocalFiles({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createIngestionJobsLocalFiles();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getIngestionJob', () => {
    describe('positive tests', () => {
      function __getIngestionJobTest() {
        // Construct the params object for operation getIngestionJob
        const jobId = 'testString';
        const authInstanceId = 'testString';
        const getIngestionJobParams = {
          jobId,
          authInstanceId,
        };

        const getIngestionJobResult = watsonxDataService.getIngestionJob(getIngestionJobParams);

        // all methods should return a Promise
        expectToBePromise(getIngestionJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ingestion_jobs/{job_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIngestionJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __getIngestionJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __getIngestionJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const authInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIngestionJobParams = {
          jobId,
          authInstanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.getIngestionJob(getIngestionJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.getIngestionJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.getIngestionJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteIngestionJobs', () => {
    describe('positive tests', () => {
      function __deleteIngestionJobsTest() {
        // Construct the params object for operation deleteIngestionJobs
        const jobId = 'testString';
        const authInstanceId = 'testString';
        const deleteIngestionJobsParams = {
          jobId,
          authInstanceId,
        };

        const deleteIngestionJobsResult = watsonxDataService.deleteIngestionJobs(deleteIngestionJobsParams);

        // all methods should return a Promise
        expectToBePromise(deleteIngestionJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ingestion_jobs/{job_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteIngestionJobsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __deleteIngestionJobsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __deleteIngestionJobsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const authInstanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteIngestionJobsParams = {
          jobId,
          authInstanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.deleteIngestionJobs(deleteIngestionJobsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.deleteIngestionJobs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.deleteIngestionJobs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createPreviewIngestionFile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PreviewIngestionFilePrototypeCsvProperty
      const previewIngestionFilePrototypeCsvPropertyModel = {
        encoding: 'utf-8',
        escape_character: '\\\\',
        field_delimiter: ',',
        header: true,
        line_delimiter: '\\n',
      };

      function __createPreviewIngestionFileTest() {
        // Construct the params object for operation createPreviewIngestionFile
        const authInstanceId = 'testString';
        const sourceDataFiles = 's3://demobucket/data/yellow_tripdata_2022-01.parquet';
        const csvProperty = previewIngestionFilePrototypeCsvPropertyModel;
        const sourceFileType = 'csv';
        const createPreviewIngestionFileParams = {
          authInstanceId,
          sourceDataFiles,
          csvProperty,
          sourceFileType,
        };

        const createPreviewIngestionFileResult = watsonxDataService.createPreviewIngestionFile(createPreviewIngestionFileParams);

        // all methods should return a Promise
        expectToBePromise(createPreviewIngestionFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/preview_ingestion_file', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'AuthInstanceId', authInstanceId);
        expect(mockRequestOptions.body.source_data_files).toEqual(sourceDataFiles);
        expect(mockRequestOptions.body.csv_property).toEqual(csvProperty);
        expect(mockRequestOptions.body.source_file_type).toEqual(sourceFileType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPreviewIngestionFileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.enableRetries();
        __createPreviewIngestionFileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        watsonxDataService.disableRetries();
        __createPreviewIngestionFileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const authInstanceId = 'testString';
        const sourceDataFiles = 's3://demobucket/data/yellow_tripdata_2022-01.parquet';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPreviewIngestionFileParams = {
          authInstanceId,
          sourceDataFiles,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        watsonxDataService.createPreviewIngestionFile(createPreviewIngestionFileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await watsonxDataService.createPreviewIngestionFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await watsonxDataService.createPreviewIngestionFile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
