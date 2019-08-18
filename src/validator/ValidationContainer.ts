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



import "reflect-metadata";
import {Container} from "inversify";
import {PkApi} from "@symlinkde/eco-os-pk-models";
import { VALIDATOR_TYPES } from "./ValiatorType";
import { Validator } from "./Validator";

const validationContainer = new Container();
validationContainer.bind<PkApi.IValidator>(VALIDATOR_TYPES.IValidator).to(Validator).inSingletonScope();
export{validationContainer};
