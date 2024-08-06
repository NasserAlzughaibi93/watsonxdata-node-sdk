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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const { readExternalSources } = require('ibm-cloud-sdk-core');
const WatsonxDataV2 = require('../../dist/watsonx-data/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'watsonx_data_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('WatsonxDataV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let watsonxDataService;

  test('Initialize service', async () => {
    watsonxDataService = WatsonxDataV2.newInstance();

    expect(watsonxDataService).not.toBeNull();

    const config = readExternalSources(WatsonxDataV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    watsonxDataService.enableRetries();
  });

  test('listBucketRegistrations()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listBucketRegistrations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createBucketRegistration()', async () => {
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

    const params = {
      bucketDetails: bucketDetailsModel,
      bucketType: 'ibm_cos',
      description: 'COS bucket for customer data',
      managedBy: 'ibm',
      associatedCatalog: bucketCatalogModel,
      bucketDisplayName: 'sample-bucket-displayname',
      region: 'us-south',
      tags: ['bucket-tag1', 'bucket-tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createBucketRegistration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getBucketRegistration()', async () => {
    const params = {
      bucketId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getBucketRegistration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateBucketRegistration()', async () => {
    // Request models needed by this operation.

    // BucketDetails
    const bucketDetailsModel = {
      access_key: 'b9cbf248ea5c4c96947e64407108559j',
      bucket_name: 'sample-bucket',
      endpoint: 'https://s3.<region>.cloud-object-storage.appdomain.cloud/',
      secret_key: '13b4045cac1a0be54c9fjbe53cb22df5fn397cd2c45b66c87',
    };

    const params = {
      bucketId: 'testString',
      bucketDetails: bucketDetailsModel,
      bucketDisplayName: 'sample-bucket-displayname',
      description: 'COS bucket for customer data',
      tags: ['testbucket', 'userbucket'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateBucketRegistration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createActivateBucket()', async () => {
    const params = {
      bucketId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createActivateBucket(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listBucketObjects()', async () => {
    const params = {
      bucketId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listBucketObjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listDatabaseRegistrations()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listDatabaseRegistrations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createDatabaseRegistration()', async () => {
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

    const params = {
      databaseDisplayName: 'new_database',
      databaseType: 'db2',
      associatedCatalog: databaseCatalogModel,
      createdOn: '1686792721',
      databaseDetails: databaseDetailsModel,
      databaseProperties: [databaseRegistrationPrototypeDatabasePropertiesItemsModel],
      description: 'db2 extenal database description',
      tags: ['testdatabase', 'userdatabase'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createDatabaseRegistration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getDatabase()', async () => {
    const params = {
      databaseId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getDatabase(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDatabase()', async () => {
    // Request models needed by this operation.

    // DatabaseRegistrationPatchDatabaseDetails
    const databaseRegistrationPatchDatabaseDetailsModel = {
      password: 'samplepassword',
      username: 'sampleuser',
    };

    const params = {
      databaseId: 'testString',
      databaseDetails: databaseRegistrationPatchDatabaseDetailsModel,
      databaseDisplayName: 'new_database',
      description: 'External database description',
      tags: ['testdatabase', 'userdatabase'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateDatabase(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOtherEngines()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listOtherEngines(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createOtherEngine()', async () => {
    // Request models needed by this operation.

    // OtherEngineDetailsBody
    const otherEngineDetailsBodyModel = {
      connection_string: '1.2.3.4',
      engine_type: 'netezza',
    };

    const params = {
      engineDetails: otherEngineDetailsBodyModel,
      engineDisplayName: 'sampleEngine01',
      description: 'external engine description',
      origin: 'external',
      tags: ['tag1', 'tag2'],
      type: 'netezza',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createOtherEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listDb2Engines()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listDb2Engines(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createDb2Engine()', async () => {
    // Request models needed by this operation.

    // Db2EngineDetailsBody
    const db2EngineDetailsBodyModel = {
      connection_string: '1.2.3.4',
    };

    const params = {
      origin: 'external',
      description: 'db2 engine description',
      engineDetails: db2EngineDetailsBodyModel,
      engineDisplayName: 'sampleEngine',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createDb2Engine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('updateDb2Engine()', async () => {
    const params = {
      engineId: 'testString',
      description: 'db2 engine updated description',
      engineDisplayName: 'sampleEngine',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateDb2Engine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listNetezzaEngines()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listNetezzaEngines(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createNetezzaEngine()', async () => {
    // Request models needed by this operation.

    // NetezzaEngineDetailsBody
    const netezzaEngineDetailsBodyModel = {
      connection_string: '1.2.3.4',
    };

    const params = {
      origin: 'external',
      description: 'netezza engine description',
      engineDetails: netezzaEngineDetailsBodyModel,
      engineDisplayName: 'sampleEngine',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createNetezzaEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('updateNetezzaEngine()', async () => {
    const params = {
      engineId: 'testString',
      description: 'netezza engine updated description',
      engineDisplayName: 'sampleEngine',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateNetezzaEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listPrestissimoEngines()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listPrestissimoEngines(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createPrestissimoEngine()', async () => {
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

    const params = {
      origin: 'native',
      associatedCatalogs: ['hive_data'],
      description: 'prestissimo engine description',
      engineDetails: prestissimoEngineDetailsModel,
      engineDisplayName: 'sampleEngine',
      region: 'us-south',
      tags: ['tag1', 'tag2'],
      version: '1.2.3',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createPrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getPrestissimoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getPrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updatePrestissimoEngine()', async () => {
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

    const params = {
      engineId: 'testString',
      description: 'updated description for prestissimo engine',
      engineDisplayName: 'sampleEngine',
      engineProperties: prestissimoEngineEnginePropertiesModel,
      engineRestart: 'force',
      removeEngineProperties: removeEnginePropertiesModel,
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updatePrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listPrestissimoEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listPrestissimoEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('addPrestissimoEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      catalogNames: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.addPrestissimoEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getPrestissimoEngineCatalog()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getPrestissimoEngineCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('pausePrestissimoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.pausePrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('runPrestissimoExplainStatement()', async () => {
    const params = {
      engineId: 'testString',
      statement: 'show schemas in catalog_name',
      format: 'json',
      type: 'io',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.runPrestissimoExplainStatement(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('runPrestissimoExplainAnalyzeStatement()', async () => {
    const params = {
      engineId: 'testString',
      statement: 'show schemas in catalog_name',
      verbose: true,
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.runPrestissimoExplainAnalyzeStatement(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('restartPrestissimoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.restartPrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('resumePrestissimoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.resumePrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('scalePrestissimoEngine()', async () => {
    // Request models needed by this operation.

    // PrestissimoNodeDescriptionBody
    const prestissimoNodeDescriptionBodyModel = {
      node_type: 'worker',
      quantity: 38,
    };

    const params = {
      engineId: 'testString',
      coordinator: prestissimoNodeDescriptionBodyModel,
      worker: prestissimoNodeDescriptionBodyModel,
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.scalePrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('listPrestoEngines()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listPrestoEngines(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createPrestoEngine()', async () => {
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

    const params = {
      origin: 'native',
      associatedCatalogs: ['iceberg_data', 'hive_data'],
      description: 'presto engine for running sql queries',
      engineDetails: engineDetailsBodyModel,
      engineDisplayName: 'sampleEngine',
      region: 'us-south',
      tags: ['tag1', 'tag2'],
      version: '1.2.3',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createPrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getPrestoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getPrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updatePrestoEngine()', async () => {
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

    const params = {
      engineId: 'testString',
      description: 'updated description for presto engine',
      engineDisplayName: 'sampleEngine',
      engineProperties: prestoEngineEnginePropertiesModel,
      engineRestart: 'force',
      removeEngineProperties: prestoEnginePatchRemoveEnginePropertiesModel,
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updatePrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listPrestoEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listPrestoEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('addPrestoEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      catalogNames: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.addPrestoEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getPrestoEngineCatalog()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getPrestoEngineCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('pausePrestoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.pausePrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('runExplainStatement()', async () => {
    const params = {
      engineId: 'testString',
      statement: 'show schemas in catalog_name',
      format: 'json',
      type: 'io',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.runExplainStatement(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('runExplainAnalyzeStatement()', async () => {
    const params = {
      engineId: 'testString',
      statement: 'show schemas in catalog_name',
      verbose: true,
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.runExplainAnalyzeStatement(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('restartPrestoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.restartPrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('resumePrestoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.resumePrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('scalePrestoEngine()', async () => {
    // Request models needed by this operation.

    // NodeDescription
    const nodeDescriptionModel = {
      node_type: 'worker',
      quantity: 38,
    };

    const params = {
      engineId: 'testString',
      coordinator: nodeDescriptionModel,
      worker: nodeDescriptionModel,
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.scalePrestoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('listSparkEngines()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listSparkEngines(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSparkEngine()', async () => {
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

    const params = {
      origin: 'native',
      associatedCatalogs: ['iceberg_data'],
      description: 'testString',
      engineDetails: sparkEngineDetailsPrototypeModel,
      engineDisplayName: 'test-native',
      status: 'testString',
      tags: ['testString'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createSparkEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getSparkEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getSparkEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateSparkEngine()', async () => {
    // Request models needed by this operation.

    // UpdateSparkEngineBodyEngineDetails
    const updateSparkEngineBodyEngineDetailsModel = {
      default_config: { config1: 'value1', config2: 'value2' },
      default_version: '3.4',
    };

    const params = {
      engineId: 'testString',
      description: 'Updated Description',
      engineDetails: updateSparkEngineBodyEngineDetailsModel,
      engineDisplayName: 'Updated Display Name',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateSparkEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSparkEngineApplications()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
      state: ['testString'],
    };

    const res = await watsonxDataService.listSparkEngineApplications(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSparkEngineApplication()', async () => {
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

    const params = {
      engineId: 'testString',
      applicationDetails: sparkApplicationDetailsModel,
      jobEndpoint: 'testString',
      serviceInstanceId: 'testString',
      type: 'iae',
      volumes: [sparkVolumeDetailsModel],
      authInstanceId: 'testString',
      state: ['testString'],
    };

    const res = await watsonxDataService.createSparkEngineApplication(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getSparkEngineApplicationStatus()', async () => {
    const params = {
      engineId: 'testString',
      applicationId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getSparkEngineApplicationStatus(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSparkEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listSparkEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('addSparkEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      catalogNames: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.addSparkEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getSparkEngineCatalog()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getSparkEngineCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getSparkEngineHistoryServer()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getSparkEngineHistoryServer(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('startSparkEngineHistoryServer()', async () => {
    const params = {
      engineId: 'testString',
      cores: '1',
      memory: '4G',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.startSparkEngineHistoryServer(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createSparkEnginePause()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createSparkEnginePause(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createSparkEngineResume()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createSparkEngineResume(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createSparkEngineScale()', async () => {
    const params = {
      engineId: 'testString',
      numberOfNodes: 2,
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createSparkEngineScale(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listSparkVersions()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listSparkVersions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listCatalogs()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCatalog()', async () => {
    const params = {
      catalogId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSchemas()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listSchemas(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSchema()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      customPath: 'sample-path',
      schemaName: 'SampleSchema1',
      bucketName: 'sample-bucket',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createSchema(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listTables()', async () => {
    const params = {
      catalogId: 'testString',
      schemaId: 'testString',
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listTables(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getTable()', async () => {
    const params = {
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getTable(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('renameTable()', async () => {
    const params = {
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      engineId: 'testString',
      tableName: 'updated_table_name',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.renameTable(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listColumns()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listColumns(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createColumns()', async () => {
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

    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      columns: [columnModel],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createColumns(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('updateColumn()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      columnId: 'testString',
      columnName: 'expenses',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateColumn(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listTableSnapshots()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listTableSnapshots(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('rollbackTable()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      snapshotId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.rollbackTable(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('updateSyncCatalog()', async () => {
    const params = {
      catalogId: 'testString',
      autoAddNewTables: true,
      syncIcebergMd: true,
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateSyncCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listMilvusServices()', async () => {
    const params = {
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.listMilvusServices(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createMilvusService()', async () => {
    const params = {
      origin: 'native',
      description: 'milvus service for running sql queries',
      serviceDisplayName: 'sampleService',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.createMilvusService(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getMilvusService()', async () => {
    const params = {
      serviceId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.getMilvusService(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateMilvusService()', async () => {
    const params = {
      serviceId: 'testString',
      description: 'updated description for milvus service',
      serviceDisplayName: 'sampleService',
      tags: ['tag1', 'tag2'],
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.updateMilvusService(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listIngestionJobs()', async () => {
    const params = {
      authInstanceId: 'testString',
      start: '1',
      jobsPerPage: 1,
    };

    const res = await watsonxDataService.listIngestionJobs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listIngestionJobs() via IngestionJobsPager', async () => {
    const params = {
      authInstanceId: 'testString',
      jobsPerPage: 1,
    };

    const allResults = [];

    // Test getNext().
    let pager = new WatsonxDataV2.IngestionJobsPager(watsonxDataService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new WatsonxDataV2.IngestionJobsPager(watsonxDataService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('deregisterBucket()', async () => {
    const params = {
      bucketId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deregisterBucket(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteDeactivateBucket()', async () => {
    const params = {
      bucketId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteDeactivateBucket(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteDatabaseCatalog()', async () => {
    const params = {
      databaseId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteDatabaseCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteOtherEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteOtherEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteDb2Engine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteDb2Engine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteNetezzaEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteNetezzaEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deletePrestissimoEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deletePrestissimoEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deletePrestissimoEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      catalogNames: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deletePrestissimoEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deletePrestoEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      catalogNames: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deletePrestoEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSparkEngine()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteSparkEngine(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSparkEngineApplications()', async () => {
    const params = {
      engineId: 'testString',
      applicationId: 'testString',
      authInstanceId: 'testString',
      state: ['testString'],
    };

    const res = await watsonxDataService.deleteSparkEngineApplications(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSparkEngineCatalogs()', async () => {
    const params = {
      engineId: 'testString',
      catalogNames: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteSparkEngineCatalogs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSparkEngineHistoryServer()', async () => {
    const params = {
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteSparkEngineHistoryServer(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSchema()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteSchema(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteTable()', async () => {
    const params = {
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      engineId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteTable(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteColumn()', async () => {
    const params = {
      engineId: 'testString',
      catalogId: 'testString',
      schemaId: 'testString',
      tableId: 'testString',
      columnId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteColumn(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteMilvusService()', async () => {
    const params = {
      serviceId: 'testString',
      authInstanceId: 'testString',
    };

    const res = await watsonxDataService.deleteMilvusService(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
