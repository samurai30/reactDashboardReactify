export const ROLE_SUPERADMIN = 'ROLE_SUPERADMIN';
export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_SUBADMIN = 'ROLE_SUBADMIN';
export const ROLE_CLIENT = 'ROLE_CLIENT';
export const ROLE_SURVEYOR = 'ROLE_SURVEYOR';

export const parseApiErrors = (error)=>{
    return error.response.body.violations.reduce(
        (parsedErrors,violation)=>{
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    );
};