import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

interface PasswordDto {
  password: string;
  confirmPassword: string;
}

@ValidatorConstraint({name : 'PasswordMatch' ,  async : false})
export class PasswordMatchConstraint implements ValidatorConstraintInterface{
    validate(confirmPassword : any , args: ValidationArguments){
        const object = args.object as PasswordDto;
        return object.password === confirmPassword;
    }


    defaultMessage(args: ValidationArguments): string {
        return 'password do not match'
    }
}


export function PasswordMatch(validationOption? : ValidationOptions){
    return function (object : any , propertyName : string){
        registerDecorator({
            target : object.constructor,
            propertyName : propertyName,
            options: validationOption,
            constraints: [],
            validator: PasswordMatchConstraint
        });
    };
}
