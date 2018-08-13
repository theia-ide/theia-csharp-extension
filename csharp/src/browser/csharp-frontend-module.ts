/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { CSharpClientContribution } from './csharp-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { CSharpGrammarContribution } from './csharp-grammar-contribution';

export default new ContainerModule(bind => {
    
    bind(CSharpClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(CSharpClientContribution);

    bind(LanguageGrammarDefinitionContribution).to(CSharpGrammarContribution).inSingletonScope();
});
