import { characteristic, notification } from './index';

export class asset {
    
    subNo:string;
    label:string;
    category:string;
    gisId:number;
    address:string;
    suburb:string;
    mtceZone:string;
    waspId:string;
    owner:string;
    equipmentId:string;
  
    lat:number;
    lon:number;
    
    characteristics:characteristic[];
    notifications:notification[];
}