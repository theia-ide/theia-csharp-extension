/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";
import { injectable } from "inversify";
import { CSHARP_LANGUAGE_ID } from "../common";

@injectable()
export class CSharpGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
        "comments": {
            "lineComment": "//",
            "blockComment": ["/*", "*/"]
        },
        "brackets": [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        "autoClosingPairs": [
            { open:"{", close:"}"},
            { open:"[", close:"]"},
            { open:"(", close:")"},
            { "open": "'", "close": "'", "notIn": ["string", "comment"] },
            { "open": "\"", "close": "\"", "notIn": ["string", "comment"] },
            { "open": "/*", "close": " */", "notIn": ["string"] }
        ],
        "surroundingPairs": [
            { open:"{", close:"}"},
            { open:"[", close:"]"},
            { open:"(", close:")"},
            { open:"<", close:">"},
            { open:"'", close:"'"},
            { open:"\"", close:"\""}
        ],
        "folding": {
            "markers": {
                "start": new RegExp("^\\s*#region\\b"),
                "end": new RegExp("^\\s*#endregion\\b")
            }
        }
    };

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: CSHARP_LANGUAGE_ID,
            "extensions": [
                ".cs",
                ".csx",
                ".cake"
            ],
            "aliases": [
                "C#",
                "csharp"
            ]
        });

        monaco.languages.setLanguageConfiguration(CSHARP_LANGUAGE_ID, this.config);

        const cSharpGrammar = require('../../data/csharp.tmLanguage.json');
        registry.registerTextMateGrammarScope('source.cs', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: cSharpGrammar
                };
            }
        });

        registry.mapLanguageIdToTextmateGrammar(CSHARP_LANGUAGE_ID, 'source.cs');
    }
}