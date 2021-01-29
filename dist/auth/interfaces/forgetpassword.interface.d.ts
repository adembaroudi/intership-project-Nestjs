import { Document } from 'mongoose';
export interface ForgottenPassword extends Document {
    readonly email: string;
    readonly newPasswordToken: string;
}
