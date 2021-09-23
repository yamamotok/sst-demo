# Serverless Stack (SST) demo

_Japanese follows (日本語は後半に)_

[Serverless Stack (SST)](https://docs.serverless-stack.com/) is a very useful framework.
I can deploy my serverless app on AWS without editing any complex YAML or other config files.
This is a simple demo using my favorite tech stack.

## TypeScript

Thankfully, in SST, TypeScript is supported without adding any plugin.
(However to use it on frontend side, you might need another effort. Please see React section)


## AWS DynamoDB

SST is very friendly with AWS DynamoDB out of the box. Please refer to [lib/MyStack.ts](lib/MyStack.ts)
I added one table with primary index (pair of partition key and sort key) and also one GSI.


## Fastify

I implemented all handlers in a Fastify application.
Please check [src/app.ts](src/app.ts) which is the entry point.

- [Fastify](https://www.fastify.io/)
- [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify)


## React

This [SST React Example](https://serverless-stack.com/examples/how-to-create-a-reactjs-app-with-serverless.html)
is using [Create React App](https://github.com/facebook/create-react-app) and JavaScript.
However, I want to use TypeScript.

Since CRA has a strong opinion on "tsconfig.json", I thought this might be a problem in this demo project.
So now I am using [Parcel](https://parceljs.org/) for development and making bundle.


## Note

- We can install aws-sdk with `--save-dev` option because Lambda will be able to provide the actual library.  
  e.g. `npm install --save-dev aws-sdk`


====================================================================

[Serverless Stack (SST)](https://docs.serverless-stack.com/) はとても便利なフレームワークです。
複雑なYAMLや設定ファイルなどを編集することなく、サーバーレスアプリをAWSにデプロイすることができます。

## TypeScript

TypeScriptは最初からサポートされています。
(ただし、フロントエンドでもTypeScriptを使う場合、工夫が必要かもしれません。Reactのセクションを見てください)

## AWS DynamoDB

SSTはDynamoDBとの親和性が高いので、とても簡単です。
私は１つのテーブル（Primary index と GSI）を追加しました。詳しくは [lib/MyStack.ts](lib/MyStack.ts) をみてください。

## Fastify

ハンドラはFastifyアプリとして実装しました。[src/app.ts](src/app.ts) こちらがエントリポイントとなりますので、みてください。

- [Fastify](https://www.fastify.io/)
- [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify)


## React

こちらの例 [SST React Example](https://serverless-stack.com/examples/how-to-create-a-reactjs-app-with-serverless.html)
では [Create React App](https://github.com/facebook/create-react-app) と JavaScript を使用しています。
しかし TypeScript を使いたいところです。

CRAは"tsconfig.json"を編集してしまうので、このデモプロジェクト（TypeScriptのプロジェクトがネストしている）では問題になりました。
それなので、[Parcel](https://parceljs.org/) を使用しました。


## Note

- aws-sdk は "--save-dev" オプションでインストールすれば十分です。Lambdaが本物を提供してくれます。  
  例) `npm install --save-dev aws-sdk`


====================================================================

## License (MIT)

Copyright (c) 2021 Keisuke Yamamoto
