'use strict'

const { test } = use('Test/Suite')('Service Providers Test')

const RabbitMq = use('Robert/RabbitMq')
const ProtoBuffer = use('Robert/ProtoBuffer')

test('It should encode and decode the data using ProtoBuffer service provider', async ({ assert }) => {
  let jsonObj = { 
    "name": "everything is fine", 
    "dob": "2020-02-12", 
    "salary": 100,
    "age": 25 
  }

  const ProtoBufferEncodeRes = await ProtoBuffer.encode(jsonObj)

  const ProtoBufferDecodeRes = await ProtoBuffer.decode(ProtoBufferEncodeRes)

  assert.equal(ProtoBufferDecodeRes.age, jsonObj.age)
})


test('It should publish the data using RabbitMq service provider', async ({ assert }) => {
  let jsonObj = { 
    "name": "everything is fine", 
    "dob": "2020-02-12", 
    "salary": 100,
    "age": 25 
  }

  let options = {headers: {'filetype': 'csv', correlationId: 'df9e4ffa-bfb5-42a9-826d-28ad9fc48945'}}

  await RabbitMq.publish(await ProtoBuffer.encode(jsonObj), options)
})

