import { Time } from "@angular/common";

export class notification {
    notficationNumber: number;
    type: string;
    description: string;
    systemStatus: string;
    userStatus: string;

    equipmentNumber: string;
    functionallocation: string;

    dateCompletion: Date;
    dateIdentified: Date;

    mainWorkCenter: string;
    planningPlant: number;
    maintenancePlant: number;
    priority: number;
    reportedBy: string;
    requiredStartDate: Date;
    requiredEndDate: Date;
    ExtRef: string; // there are 3 in one xml example - is it specifically 3 or can there be any number

// Activities collection ?? 

    name: string;
}