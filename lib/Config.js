var base = require('./Base.js');

function ConfigValueType() { }
ConfigValueType.STRING = "STRING";
ConfigValueType.INT = "INT";
ConfigValueType.DOUBLE = "DOUBLE";
ConfigValueType.BOOLEAN = "BOOLEAN";
ConfigValueType.PASSWORD = "PASSWORD";
ConfigValueType.LIST = "LIST";

function ConfigItem(valueType, configItemId, name, description, groupName, sortOrder, selectedValue, mustBeSpecified, readOnly, listValues) {
    this.ValueType = valueType || ConfigValueType.STRING;
    this.ConfigItemId = configItemId;
    this.Name = name;
    this.Description = description;
    this.GroupName = groupName;
    this.SortOrder = sortOrder || 0;
    this.SelectedValue = selectedValue || "";
    this.MustBeSpecified = mustBeSpecified || false;
    this.ReadOnly = readOnly || false;
    this.ListValues = listValues || [];
}

function ConfigItemListItem (display, value) {
    this.Display = display;
    this.Value = value;
}

class UserConfig extends base.BaseRequest {
    //Currently untested
    constructor (provider, authToken, email, accountName, stepName) {
        super(provider, authToken);

        this.Email = email;
        this.AccountName = accountName;
        this.StepName = stepName || "AddCredentials";
    }
}

class AddNewUserRequest extends base.BaseRequest {
    constructor(provider, linnworksUniqueIdentifier, email, accountName) {
        super(provider);
        this.LinnworksUniqueIdentifier = linnworksUniqueIdentifier;
        this.Email = email;
        this.AccountName = accountName;
    }
}

class AddNewUserResponse extends base.BaseResponse {
    constructor(authorizationToken, error) {
        super(error);
        this.AuthorizationToken = authorizationToken;
    }
}

class SaveUserConfigRequest extends base.BaseRequest {
    constructor(provider, authToken, stepName, configItems) {
        super(provider, authToken);
        this.StepName = stepName;
        this.ConfigItems = configItems || [];
    }
};

class UserConfigResponse extends base.BaseResponse {
    constructor(stepName, wizardStepTitle, wizardStepDescription, configItems, error) {
        super(error);
        this.StepName = stepName;
        this.WizardStepTitle = wizardStepTitle;
        this.WizardStepDescription = wizardStepDescription;
        this.ConfigItems = configItems || [];
    }

    static error (error) {
        return new UserConfigResponse(null, null, null, null, error);
    }
};

module.exports = {
    ConfigValueType,
    ConfigItem,
    ConfigItemListItem,
    UserConfig,
    AddNewUserRequest,
    AddNewUserResponse,
    SaveUserConfigRequest,
    UserConfigResponse
}
