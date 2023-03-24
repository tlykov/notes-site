export enum Tag { None = "None", Important = "Important" };

export interface Note {
    title: string;
    text: string;
    tag: Tag;
    last_modified: Date;
}