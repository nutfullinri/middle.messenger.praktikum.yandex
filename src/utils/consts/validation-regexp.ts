import { FormInputName } from '../../common/enums/form-input-name.enum';

export const nameValidation = /([А-Я]|[A-Z])([А-Я]|[A-Z]|[a-z]|[а-я]|-)*/;
export const loginValidation = /((([A-Z]|[a-z]|-|_)|([0-9])){3,20})(?<!([0-9]){3,20})/;
export const emailValidation = /([A-Z]|[a-z]|[0-9]|-)+@([A-Z]|[a-z]){1,}\.([A-Z]|[a-z])+/;
export const passwordValidation = /(.*[A-Z]+.*[0-9]+.*)|(.*[0-9]+.*[A-Z]+.*)/;
export const phoneValidation = /(\+([0-9]{9,14}))|([0-9]{10,15})/;

export const formInputValidationRegexpMap = new Map<FormInputName, RegExp>([
    [FormInputName.FIRST_NAME, nameValidation],
    [FormInputName.SECOND_NAME, nameValidation],
    [FormInputName.LOGIN, loginValidation],
    [FormInputName.EMAIL, emailValidation],
    [FormInputName.PASSWORD, passwordValidation],
    [FormInputName.PHONE, phoneValidation],
]);
