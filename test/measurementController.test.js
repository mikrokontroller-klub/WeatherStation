const { app, port } = require('../app');
const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const connectDB = require('../utils/connectDB');
const User = require('../models/user');
const Sensor = require('../models/sensor');

chai.use(chaiHttp);

describe('Measurement Controller', () => {
    before(async () => {
        await connectDB();
    });
    describe('store', () => {
        it('should check if a token is proved', (done) => {
            chai.request(app)
                .put('/api/measurement/new')
                .send({})
                .then((res) => {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.message, 'Property: token is required');
                    done();
                });
        });

        it('should return an error if the given token is invalid', (done) => {
            chai.request(app)
                .put('/api/measurement/new')
                .send({
                    token: 'invalid-token',
                })
                .then((response) => {
                    assert.equal(response.status, 400);
                    assert.equal(response.body.message, 'Invalid api token, please use the api token associated with a user account');
                    done();
                });
        });

        it('should check if a sensor id is provided', (done) => {
            User.findOne({}).then((sensor) => {
                chai.request(app)
                    .put('/api/measurement/new')
                    .send({
                        token: sensor.apiToken,
                    })
                    .then((res) => {
                        assert.equal(res.status, 400);
                        assert.equal(res.body.message, 'Property: sensorId is required');
                        done();
                    });
            });
        });

        it('should return an error if the given sensor id is invalid', (done) => {
            User.findOne({}).then((user) => {
                chai.request(app)
                    .put('/api/measurement/new')
                    .send({
                        token: user.apiToken,
                        sensorId: 'invalid-sensor-id',
                    })
                    .then((response) => {
                        assert.equal(response.status, 400);
                        assert.equal(response.body.message, 'Invalid sensor id, please use the sensor id associated with one of your sensors');
                        done();
                    });
            });
        });

        it('should check if a measurement is provided', (done) => {
            User.findOne({}).then((user) => {
                Sensor.findOne({}).then((sensor) => {
                    chai.request(app)
                        .put('/api/measurement/new')
                        .send({
                            token: user.apiToken,
                            sensorId: sensor._id,
                        })
                        .then((res) => {
                            assert.equal(res.status, 400);
                            assert.equal(res.body.message, 'Property: value is required');
                            done();
                        });
                });
            });
        });

        it('should create a new measurement', (done) => {
            User.findOne({}).then((user) => {
                Sensor.findOne({}).then((sensor) => {
                    chai.request(app)
                        .put('/api/measurement/new')
                        .send({
                            token: user.apiToken,
                            sensorId: sensor._id,
                            value: '12.5',
                        })
                        .then((response) => {
                            assert.equal(response.status, 200);
                            assert.equal(response.body.message, 'Measurement saved successfully');
                            done();
                        });
                });
            });
        });
    });
});
