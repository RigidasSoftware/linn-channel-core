var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Config = require('../lib/Config.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Config', function(){

     describe('AddNewUserRequest', function() {

        it("constructor should set properties", function() {
            var addNewUserRequest = new Config.AddNewUserRequest("provider", "token", "id", "email1", "accountA");
            expect(addNewUserRequest.Provider).to.equal("provider");
            expect(addNewUserRequest.AuthorisationToken).to.equal("token");
            expect(addNewUserRequest.LinnworksUniqueIdentifier).to.equal("id");
            expect(addNewUserRequest.Email).to.equal("email1");
            expect(addNewUserRequest.AccountName).to.equal("accountA");
        });

    })

    describe('AddNewUserResponse', function() {

        it("constructor should set properties", function() {
            var addNewUserResponse = new Config.AddNewUserResponse("token");
            expect(addNewUserResponse.Error).to.equal(undefined);
            expect(addNewUserResponse.AuthorisationToken).to.equal("token");
        });

    })

    describe('SaveUserConfigRequest', function() {

        it("constructor should set default properties", function() {

            var saveUserConfigRequest = new Config.SaveUserConfigRequest("provider", "token");

            expect(saveUserConfigRequest.Provider).to.equal("provider");
            expect(saveUserConfigRequest.AuthorisationToken).to.equal("token");
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

            var userConfigResponse = new Config.UserConfigResponse("step1", "titleAB", "a description", configItems, "error1");

            expect(userConfigResponse.Error).to.equal("error1");
            expect(userConfigResponse.StepName).to.equal('step1');
            expect(userConfigResponse.WizardStepTitle).to.equal('titleAB');
            expect(userConfigResponse.WizardStepDescription).to.equal('a description');
            expect(userConfigResponse.ConfigItems).to.equal(configItems);
        });

    })


});
