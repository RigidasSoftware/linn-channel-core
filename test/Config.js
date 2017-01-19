var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    chaiAsPromised = require("chai-as-promised");
    Config = require('../lib/Config.js')

chai.use(chaiAsPromised)

//--debug-brk" add this to the test script to hit breakpoints

describe('Config', function(){
    describe('AddNewUserResponse()', function() {

        it("should set properties", function() {
            var addNewUserResponse = new Config.AddNewUserResponse("token");
            expect(addNewUserResponse.AuthorisationToken).to.equal("token");
        });

    });

    describe('SaveUserConfigRequest()', function() {

        it("should set default properties", function() {

            var saveUserConfigRequest = new Config.SaveUserConfigRequest();

            expect(saveUserConfigRequest.StepName).to.equal("");
            expect(saveUserConfigRequest.ConfigItems.length).to.equal(0);
        });

    });
})
