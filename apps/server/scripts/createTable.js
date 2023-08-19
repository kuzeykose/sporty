const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const createTable = () => {
  const params = {
    TableName: 'Sporty',
    AttributeDefinitions: [
      {
        AttributeName: 'PK',
        AttributeType: 'S',
      },
      {
        AttributeName: 'SK',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'PK',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'SK',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  ddb.createTable(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Table Created', data);
    }
  });
};

createTable();
