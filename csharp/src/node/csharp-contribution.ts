/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { CSHARP_LANGUAGE_ID, CSHARP_LANGUAGE_NAME } from '../common';
const path = require('path');

@injectable()
export class CSharpContribution extends BaseLanguageServerContribution {

    readonly id = CSHARP_LANGUAGE_ID;
    readonly name = CSHARP_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        const command =  path.resolve(__dirname,'../../omnisharp/run');
        const args: string[] = [
            '-stdio',
            '-lsp'
        ];
        this.logger.info(`starting C# language server: ${command} ${args.join(' ')}`)
        const serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    }

    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        this.logger.error("Error starting C# language server.");
        this.logger.error("Please make sure it is installed on your system.");
    }
}
