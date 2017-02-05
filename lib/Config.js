var base = require('./Base.js');

class AddNewUserRequest extends base.BaseRequest {
    constructor(provider, authToken, linnworksUniqueIdentifier, email, accountName) {
        super(provider, authToken);
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
    constructor(provider, authToken) {
        super(provider, authToken);
        this.StepName = "";
        this.ConfigItems = [];
    }
};

class UserConfigResponse extends base.BaseResponse {
    constructor(stepName, wizardStepTitle, wizardStepDescription, configItems, error) {
        super(error);
        this.StepName = stepName;
        this.WizardStepTitle = wizardStepTitle;
        this.WizardStepDescription = wizardStepDescription;
        this.ConfigItems = configItems;
    }
};

module.exports = {
    AddNewUserRequest,
    AddNewUserResponse,
    SaveUserConfigRequest,
    UserConfigResponse
}
