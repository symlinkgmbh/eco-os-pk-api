/**
 * Copyright 2018-2020 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */




import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { logMiddleware } from "./log";
import { corsMiddleware } from "./cors";

export abstract class AbstractApi {

    private app: express.Application;

    public constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(corsMiddleware);
        this.app.use(logMiddleware);
        this.app.use(
          bodyParser.urlencoded({
            extended: false,
          }),
        );
    }

    public getApp(): express.Application {
        return this.app;
    }
}
