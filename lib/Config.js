var base = require('./Base.js');

class AddNewUserRequest extends base.BaseRequest {
    constructor() {
        super();
        this.LinnworksUniqueIdentifier = "";
        this.Email = "";
        this.AccountName = "";
    }
}

class AddNewUserResponse extends base.BaseResponse {
    constructor(authorisationToken) {
        super();
        this.AuthorisationToken = authorisationToken;
    }
}

class SaveUserConfigRequest extends base.BaseRequest {
    constructor() {
        super();
        this.StepName = "";
        this.ConfigItems = [];
    }
};

class UserConfigResponse extends base.BaseResponse {
    constructor(stepName, wizardStepTitle, wizardStepDescription, configItems) {
        super();
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
