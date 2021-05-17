import { environment } from 'environments/environment';

export class ApiConstants {
    public static ENDPOINT = environment.ENDPOINT;
    public static AUTHENTICATION = 'auth/';
    public static RESERVATION = 'reservation/';
    public static PAYMENT = 'payment/';
    
    public static ID = 'id';
    public static LOGOUT = 'logout';
}
