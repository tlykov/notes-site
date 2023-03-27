import { Serializer } from "@angular/compiler";

export enum Tag { None = "None", Important = "Important" };

export interface Note {
    _id: number;
    title: string;
    text: string;
    tag: Tag;
    last_modified: Date;
}