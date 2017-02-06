var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    Config = require('../lib/Config.js');

//--debug-brk" add this to the test script to hit breakpoints

describe('Config', function(){

    describe('ConfigValueType', function() {

        it("Expect correct values", function() {
            expect(Config.ConfigValueType.STRING).to.equal("STRING");
            expect(Config.ConfigValueType.INT).to.equal("INT");
            expect(Config.ConfigValueType.DOUBLE).to.equal("DOUBLE");
            expect(Config.ConfigValueType.BOOLEAN).to.equal("BOOLEAN");
            expect(Config.ConfigValueType.PASSWORD).to.equal("PASSWORD");
            expect(Config.ConfigValueType.LIST).to.equal("LIST");
        });

    })

    describe('ConfigItem', function() {

        it("constructor should set default properties", function() {
            var configItem = new Config.ConfigItem();
            expect(configItem.ValueType).to.equal(Config.ConfigValueType.STRING);
            expect(configItem.ConfigItemId).to.equal(undefined);
            expect(configItem.Name).to.equal(undefined);
            expect(configItem.Description).to.equal(undefined);
            expect(configItem.GroupName).to.equal(undefined);
            expect(configItem.SortOrder).to.equal(0);
            expect(configItem.SelectedValue).to.equal("");
            expect(configItem.MustBeSpecified).to.equal(false);
            expect(configItem.ReadOnly).to.equal(false);
            expect(configItem.ListValues.length).to.equal(0);
        });

        
        it("constructor should set properties", function() {
            var listValues = [
                new Config.ConfigItemListItem("DisplayMe", "Value1"),
                new Config.ConfigItemListItem("DisplayMeToo", "Value2"),
            ];

            var configItem = new Config.ConfigItem(Config.ConfigValueType.PASSWORD, "APIKey", "API Key", "An API Key", "API Credentials", 7, "52", true, true, listValues);
            expect(configItem.ValueType).to.equal(Config.ConfigValueType.PASSWORD);
            expect(configItem.ConfigItemId).to.equal("APIKey");
            expect(configItem.Name).to.equal("API Key");
            expect(configItem.Description).to.equal("An API Key");
            expect(configItem.GroupName).to.equal("API Credentials");
            expect(configItem.SortOrder).to.equal(7);
            expect(configItem.SelectedValue).to.equal("52");
            expect(configItem.MustBeSpecified).to.equal(true);
            expect(configItem.ReadOnly).to.equal(true);
            expect(configItem.ListValues).to.equal(listValues);
        });

    })

    describe('ConfigItemListItem', function() {

        it("constructor should set properties", function() {
            var configItemListItem = new Config.ConfigItemListItem("displayMe", "someValue");
            expect(configItemListItem.Display).to.equal("displayMe");
            expect(configItemListItem.Value).to.equal("someValue");
        });

    })


    describe('AddNewUserRequest', function() {

        it("constructor should set properties", function() {
            var addNewUserRequest = new Config.AddNewUserRequest("provider", "id", "email1", "accountA");
            expect(addNewUserRequest.Provider).to.equal("provider");
            expect(addNewUserRequest.AuthorizationToken).to.equal(undefined);
            expect(addNewUserRequest.LinnworksUniqueIdentifier).to.equal("id");
            expect(addNewUserRequest.Email).to.equal("email1");
            expect(addNewUserRequest.AccountName).to.equal("accountA");
        });

    })

    describe('AddNewUserResponse', function() {

        it("constructor should set properties", function() {
            var addNewUserResponse = new Config.AddNewUserResponse("token");
            expect(addNewUserResponse.Error).to.equal("");
            expect(addNewUserResponse.AuthorizationToken).to.equal("token");
        });

    })

    describe('SaveUserConfigRequest', function() {

        it("constructor should set default properties", function() {

            var configItems = [
                { 
                    one: "1"
                },
                {
                    two: "2"
                }
            ];

            var saveUserConfigRequest = new Config.SaveUserConfigRequest("provider", "token", "Step 1", configItems);

            expect(saveUserConfigRequest.Provider).to.equal("provider");
            expect(saveUserConfigRequest.AuthorizationToken).to.equal("token");
            expect(saveUserConfigRequest.StepName).to.equal("Step 1");
            expect(saveUserConfigRequest.ConfigItems).to.equal(configItems);
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

        describe('error', function() {

            it("Should return an error result", function() {

                var userConfigResponse = Config.UserConfigResponse.error("error1");

                expect(userConfigResponse.Error).to.equal("error1");
                expect(userConfigResponse.StepName).to.equal(null);
                expect(userConfigResponse.WizardStepTitle).to.equal(null);
                expect(userConfigResponse.WizardStepDescription).to.equal(null);
                expect(userConfigResponse.ConfigItems.length).to.equal(0);
            });
        });

    })


});
