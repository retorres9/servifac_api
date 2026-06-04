import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsEcuadorianId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isEcuadorianId",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') return false;

                    if (value.length !== 10 && value.length !== 13) return false;
                    if (!/^\d+$/.test(value)) return false;

                    const provinceCode = parseInt(value.substring(0, 2), 10);
                    if (provinceCode < 1 || provinceCode > 24) return false;

                    const thirdDigit = parseInt(value.charAt(2), 10);

                    if (thirdDigit < 6){
                        return validateModulo10(value.substring(0, 9), parseInt(value.charAt(9), 10), [2, 1, 2, 1, 2, 1, 2, 1, 2]);
                    }
                    else if (thirdDigit === 6){
                        return validateModulo10(value.substring(0, 9), parseInt(value.charAt(9), 10), [3, 2, 7, 6, 5, 4, 3, 2, 1]);
                    }
                    else if (thirdDigit === 9){
                        return validateModulo10(value.substring(0, 10), parseInt(value.charAt(10), 10), [4, 3, 2, 7, 6, 5, 4, 3, 2, 1]);
                    }
                    return false;
                }, defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid Ecuadorian ID (Cédula or RUC)`;
                }
            }
        });
    }
}

function validateModulo10(digits: string, lastDigit: number, coefficients: number[]): boolean {
    let total = 0;
    for (let i = 0; i < coefficients.length; i++) {
        let product = parseInt(digits.charAt(i), 10) * coefficients[i];
        if (product >= 10) product -= 9;
        total += product;
    }
    const calculatedDigit = (10 - (total % 10)) % 10;
    return calculatedDigit === lastDigit;
}