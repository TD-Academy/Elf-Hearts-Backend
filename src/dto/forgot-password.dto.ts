export class RequestPasswordDto{
    userName: string;
    phone: string;
}

export class ForgotPasswordDto{
    id: string;
    newPassword: string; 
}