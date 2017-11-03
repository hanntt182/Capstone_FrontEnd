import {Injectable} from "@angular/core";

@Injectable()
export class Constants{
public HTTP = 'http://';
public SERVER_IP = 'localhost';
public SERVER_PORT = ':8080';
public SERVER_PATH= '/SWP49X/api';

// API
public LOGIN = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/login/";
public REGISTRATION = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/registration/";
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
public GETLISTSHIP = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListShip/";




public CREATEORDER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/createOrder/";
public SEARCHORDERSUPPLIER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchOrderSupplier/";
public SEARCHORDERBUYER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchOrderBuyer/";
public SEARCHORDER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchOrder/";
public CONFIRMORDER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/confirmOrder/";
public VIEWORDERDETAIL = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/viewOrderDetail/";
public PAYMENTBUYER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/paymentBuyer/";
public CANCELORDER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/cancleOrder/";
public CONFIRMSHIPPING = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/confirmShipping/";
public GETLISTCITY = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListCity/";
public GETLISTDISTRICT = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListDistrict/";
public GETLISTWARD = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListWard/";



public CREATENEGOTIATION = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/createNegotiation/";
public SEARCHLISTNEGOTIATIONBUYER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchListNegotiationBuyer/";
public SEARCHLISTNEGOTIATIONSUPPLIER = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/searchListNegotiationSupplier/";
public VIEWNEGOTIATIONDETAIL = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/viewNegotiationDetail/";
public GETLISTMESSAGE = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/getListMessage/";
public SENDMESSAGE = this.HTTP + this.SERVER_IP + this.SERVER_PORT + this.SERVER_PATH + "/sendMessage/";



constructor(){}
}
