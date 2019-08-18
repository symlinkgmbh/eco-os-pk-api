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



const apiResponseCodes = {
    C801: {
        code: 801,
        message: "Account is locked",
    },
    C802: {
        code: 802,
        message: "Account is not active",
    },
    C803: {
        code: 803,
        message: "Account is already registered",
    },
    C804: {
        code: 804,
        message: "Passwords are not equal",
    },
    C805: {
        code: 805,
        message: "Password did not match the password policy",
    },
    C806: {
        code: 806,
        message: "Email is not valid",
    },
    C807: {
        code: 807,
        message: "Account could not be deactivated",
    },
    C808: {
        code: 808,
        message: "Account could not be activated",
    },
    C809: {
        code: 809,
        message: "Domain is not approved for registration",
    },
    C810: {
        code: 810,
        message: "DNS lookup for 2ndLock failed for requesting domain",
    },
    C811: {
        code: 811,
        message: "Account locked after to many authentication attemps",
    },
    C812: {
        code: 812,
        message: "Captcha is missing",
    },
    C813: {
        code: 813,
        message: "Call reject through ip filter",
    },
    C814: {
        code: 814,
        message: "OTP is invalid",
    },
    C815: {
        code: 815,
        message: "Account not found",
    },
    C816: {
        code: 816,
        message: "Config entry already exists",
    },
    C817: {
        code: 817,
        message: "Request email address for key is not active",
    },
    C818: {
        code: 818,
        message: "Requesting user is inactive or account is deleted",
    },
    C819: {
        code: 819,
        message: "Key not found",
    },
    C820: {
        code: 820,
        message: "Key and deviceId already registered",
    },
    C821: {
        code: 821,
        message: "Content not found",
    },
    C822: {
        code: 822,
        message: "Localization entry not found",
    },
    C823: {
        code: 823,
        message: "ip address not found",
    },
    C824: {
        code: 824,
        message: "problem in render mail template",
    },
    C825: {
        code: 825,
        message: "Job not found in queue",
    },
    C826: {
        code: 826,
        message: "Call reject. Missing params",
    },
    C827: {
        code: 827,
        message: "Captcha is not valid",
    },
    C828: {
        code: 828,
        message: "Unable to load private key from pem format",
    },
    C829: {
        code: 829,
        message: "Problem in write license to database",
    },
    C830: {
        code: 830,
        message: "There is only one license allowed. Please delete license first before insert a new one",
    },
    C831: {
        code: 831,
        message: "Unlicensed service detected",
    },
    C832: {
        code: 832,
        message: "Exceeded user limit",
    },
    C833: {
        code: 833,
        message: "No license found",
    },
    C834: {
        code: 834,
        message: "You can't set your old password as new password",
    },
};

export {apiResponseCodes};
