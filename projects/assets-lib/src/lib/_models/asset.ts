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
  
    characteristics:characteristic[];
    notifications:notification[];
}