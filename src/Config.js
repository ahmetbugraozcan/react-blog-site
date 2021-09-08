
import { inject, observer } from "mobx-react";

@inject("LanguageStore")
@observer
class Config {
    constructor(props) {
        super(props)
        this.default();
    }

    default() {
        this.LANG = this.props.LanguageStore.language;
    }

}

export default (new Config());
