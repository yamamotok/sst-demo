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

    // Create a HTTP API
    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        environment: {
          tableName: table.dynamodbTable.tableName,
        },
      },
      routes: {
        'GET /': 'src/lambda.handler',
        'GET /boards': 'src/lambda.handler',
        'POST /boards': 'src/lambda.handler',
        'GET /boards/{boardId}': 'src/lambda.handler',
        'POST /boards/{boardId}': 'src/lambda.handler',
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
