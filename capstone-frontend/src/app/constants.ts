import {Injectable} from "@angular/core";

@Injectable()
export class Constants{
public HTTP = 'http://';
public SERVER_IP = 'localhost';
public SERVER_PORT = ':8080';
public SERVER_PATH= '/SWP49X/api';

// API
public REGISTER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/registration/";
public LOGIN = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/login/";

constructor(){}
}
