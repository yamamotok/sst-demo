Japanese follows (日本語は後半に)

# Serverless Stack (SST) demo

[Serverless Stack (SST)](https://docs.serverless-stack.com/) is a very useful framework.
I can deploy my serverless app on AWS without any complex YAML or other config files.

This repo is a simple demo using my favorite tech stack,
**TypeScript**, **DynamoDB**, **Node.js**, **Fastify**, and **React**.

![image](https://user-images.githubusercontent.com/2731953/134549280-7fa6d3c2-5abe-4bd2-a4bc-04888aef4b3e.png)

- Message Board App in React.
- DynamoDB backed RESTful API with Node.js, Fastify.
- TypeScript.
- AWS.


## TypeScript

Thankfully, in SST, TypeScript is supported without adding any plugin.

However, if you want to create a backend and a frontend project in one repository, and they are in TypeScript, it may be a bit difficult
because you need to manage two "tsconfig.json" files with different characteristics.
Please check "React" section too.


## AWS DynamoDB

SST is very friendly with AWS DynamoDB out of the box. Please refer to [lib/MyStack.ts](lib/MyStack.ts)
I added one table with primary index (pair of partition key and sort key) and also one GSI.

![image](https://user-images.githubusercontent.com/2731953/134549759-b4a727a4-c7d1-4917-9420-9883f4276e51.png)


## Fastify

I implemented all handlers in a Fastify application.
Please check [src/app.ts](src/app.ts) which is the entry point.

- [Fastify](https://www.fastify.io/)
- [aws-lambda-fastify](https://github.com/fastify/aws-lambda-fastify)


Fastify should be excluded from the bundle, otherwise unexpected error occurs.
Let's add this setting, please see [lib/MyStack.ts](lib/MyStack.ts).

```javascript
bundle: {
  nodeModules: ['fastify'],
}
```

## React

This [SST React Example](https://serverless-stack.com/examples/how-to-create-a-reactjs-app-with-serverless.html)
is using [Create React App](https://github.com/facebook/create-react-app) and JavaScript.
However, I want to use TypeScript.

Since CRA has a strong opinion on "tsconfig.json", I thought this might be a problem in this demo project.
So now I am using [Parcel](https://parceljs.org/) for development and making bundle.


## Note

- We can install aws-sdk with `--save-dev` option because Lambda will be able to provide the actual library.  
  e.g. `npm install --save-dev aws-sdk`
- If you are changing your infrastructure repeatedly and get unexpected errors when deploying,
  `rm -f .build` may help you.


&nbsp;  
&nbsp;  
&nbsp;

# Serverless Stack (SST) のデモ

[Serverless Stack (SST)](https://docs.serverless-stack.com/) はとても便利なフレームワークです。
複雑なYAMLや設定ファイルなどを編集することなく、サーバーレスアプリをAWSにデプロイすることができます。

## TypeScript

TypeScriptは最初からサポートされています。
(ただし、バックエンドとフロントエンドとを同梱して両方でTypeScriptを使う場合、工夫が必要かもしれません。Reactのセクションを見てください)

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

&nbsp;  
&nbsp;  
&nbsp;  

## License (MIT)

Copyright (c) 2021 Keisuke Yamamoto
