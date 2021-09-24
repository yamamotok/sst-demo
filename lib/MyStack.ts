import * as sst from '@serverless-stack/resources';

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a table
    const table = new sst.Table(this, 'Data', {
      fields: {
        pk: sst.TableFieldType.STRING,
        sk: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
      secondaryIndexes: {
        Reference: { partitionKey: 'sk', sortKey: 'pk' },
      },
    });

    // Create functions
    const testFunc = new sst.Function(this, 'Test', {
      handler: 'src/lambda.handler',
    });
    const mainFunc = new sst.Function(this, 'Main', {
      handler: 'src/lambda.handler',
      environment: {
        tableName: table.dynamodbTable.tableName,
      },
    });

    // Create a HTTP API
    const api = new sst.Api(this, 'Api', {
      routes: {
        'GET /': testFunc,
        'GET /boards': mainFunc,
        'POST /boards': mainFunc,
        'GET /boards/{boardId}': mainFunc,
        'POST /boards/{boardId}': mainFunc,
      },
    });
    api.attachPermissions([table]);

    // Place for a React app
    const site = new sst.ReactStaticSite(this, 'ReactSite', {
      path: 'frontend',
      buildOutput: 'build',
      buildCommand: 'npm run build',
      environment: {
        // Pass in the API endpoint to our app
        REACT_APP_API_URL: api.url,
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      SiteUrl: site.url,
    });
  }
}
