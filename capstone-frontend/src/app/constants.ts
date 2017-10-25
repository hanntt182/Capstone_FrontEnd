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
public GETLISTCATALOG = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListCatalog/";
public CREATEPOST = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/createPost/";
public GETLISTDESCRIPTION = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListDescription/";
public CREATEPOSTDESCRIPTION = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/createPostDescription/";
public GETLISTPOSTSUPPLIER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListPostSupplier/";
public SEARCHPOSTSUPPLIER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchPostSupplier/";
public GETLISTPOST = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListPost/";
public SEARCHPOST = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchPost/";
public SEARCHPOSTSTAFF = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchPostStaff/";
public VIEWPOSTDETAIL = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/viewPostDetail/";
public APPROVEPOST = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/approvePost/";
public REVIEWPOST = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/reviewPost/";
public GETLISTCOLOR = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListColor/";

constructor(){}
}
