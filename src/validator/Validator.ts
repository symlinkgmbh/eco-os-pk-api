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



import { injectable } from "inversify";
import { PkApi } from "@symlinkde/eco-os-pk-models";
import { CustomRestError } from "../error";
import { apiResponseCodes } from "../util";
import { IValidatorTypes } from "@symlinkde/eco-os-pk-models/lib/models/packages/pk_api/Namespace";

@injectable()
export class Validator implements PkApi.IValidator {
  public validate<T extends any>(
    target: T,
    pattern: PkApi.IValidatorPattern,
    options?: Array<PkApi.IValidatorOption>,
  ): void | PkApi.ICustomRestError {
    Object.keys(pattern).map((key) => {
      const check: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, key);
      if (check === undefined || check === null) {
        throw new CustomRestError(
          {
            code: apiResponseCodes.C826.code,
            message: `missing ${key} in request`,
          },
          400,
        );
      }

      if (target[key] === undefined || target[key] === null || target[key].length < 1) {
        throw new CustomRestError(
          {
            code: apiResponseCodes.C826.code,
            message: `missing value for ${key} in request`,
          },
          400,
        );
      }

      if (options) {
        this.validateOptions<T>(target, options);
      }
    });
    return;
  }

  private validateOptions<T extends any>(target: T, options: Array<PkApi.IValidatorOption>): void {
    // tslint:disable-next-line:cyclomatic-complexity
    options.map((option: PkApi.IValidatorOption) => {
      if (option.typeCheck) {
        if (!this.performTypeCheck(target[option.field], option.targetType)) {
          throw new CustomRestError(
            {
              code: apiResponseCodes.C859.code,
              message: `wrong type in payload for field ${target[option.field]}`,
            },
            400,
          );
        }
      }
      if (option.minLength && String(target[option.field]).length < option.minLength) {
        throw new CustomRestError(
          {
            code: apiResponseCodes.C826.code,
            message: `min length error for ${target[option.field]} in request`,
          },
          400,
        );
      }
      if (option.maxLength && String(target[option.field]).length > option.maxLength) {
        throw new CustomRestError(
          {
            code: apiResponseCodes.C826.code,
            message: `max length error for ${target[option.field]} in request`,
          },
          400,
        );
      }
      if (option.onlyChars) {
        if (!/^[A-Za-z]+$/.test(String(target[option.field]))) {
          throw new CustomRestError(
            {
              code: apiResponseCodes.C826.code,
              message: `only characters allowed for ${target[option.field]} in request`,
            },
            400,
          );
        }
      }
      if (option.onlyNumber) {
        if (!/^\d+$/.test(String(target[option.field]))) {
          throw new CustomRestError(
            {
              code: apiResponseCodes.C826.code,
              message: `only numbers allowed for ${target[option.field]} in request`,
            },
            400,
          );
        }
      }
    });
    return;
  }

  private performTypeCheck(value: any, target: IValidatorTypes | undefined): boolean {
    if (typeof target === undefined) {
      return false;
    }

    if (typeof value !== target) {
      return false;
    }
    return true;
  }
}
