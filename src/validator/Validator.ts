/**
 * Copyright 2018-2019 Symlink GmbH
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



import {injectable} from "inversify";
import {PkApi} from "@symlinkde/eco-os-pk-models";
import { CustomRestError } from "../error";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";
import { apiResponseCodes } from "../util";

@injectable()
export class Validator implements PkApi.IValidator {

    public validate<T extends any>(target: T, pattern: PkApi.IValidatorPattern): void | PkApi.ICustomRestError {
        Object.keys(pattern).map((key) => {
            const check: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, key);
            if(check === undefined || check === null) {
                Log.log(`missing ${key} in request`, LogLevel.error);
                throw new CustomRestError({
                    code: apiResponseCodes.C826.code,
                    message: `missing ${key} in request`,
                },400);
            }

            if(target[key] === undefined || target[key] === null || target[key].length < 1) {
                throw new CustomRestError({
                    code: apiResponseCodes.C826.code,
                    message: `missing value for ${key} in request`,
                },400);
            }
        });
        return;
    }
}
