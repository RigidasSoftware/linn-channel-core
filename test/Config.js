var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Config = require('../lib/Config.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Config', function(){

     describe('AddNewUserRequest', function() {

        it("constructor should set properties", function() {
            var addNewUserRequest = new Config.AddNewUserRequest("token");
            expect(addNewUserRequest.AuthorisationToken).to.equal("");
            expect(addNewUserRequest.LinnworksUniqueIdentifier).to.equal("");
            expect(addNewUserRequest.Email).to.equal("");
            expect(addNewUserRequest.AccountName).to.equal("");
        });

    })

    describe('AddNewUserResponse', function() {

        it("constructor should set properties", function() {
            var addNewUserResponse = new Config.AddNewUserResponse("token");
            expect(addNewUserResponse.Error).to.equal(null);
            expect(addNewUserResponse.AuthorisationToken).to.equal("token");
        });

    })

    describe('SaveUserConfigRequest', function() {

        it("constructor should set default properties", function() {

            var saveUserConfigRequest = new Config.SaveUserConfigRequest();

            expect(saveUserConfigRequest.StepName).to.equal("");
            expect(saveUserConfigRequest.ConfigItems.length).to.equal(0);
        });

    })

    describe('UserConfigResponse', function() {

        it("constructor should set default properties", function() {

            var configItems = [
                { 
                    one: "1"
                },
                {
                    two: "2"
                }
            ];

            var userConfigResponse = new Config.UserConfigResponse("step1", "titleAB", "a description", configItems);

            expect(userConfigResponse.Error).to.equal(null);
            expect(userConfigResponse.StepName).to.equal('step1');
            expect(userConfigResponse.WizardStepTitle).to.equal('titleAB');
            expect(userConfigResponse.WizardStepDescription).to.equal('a description');
            expect(userConfigResponse.ConfigItems).to.equal(configItems);

        });

    })


});
