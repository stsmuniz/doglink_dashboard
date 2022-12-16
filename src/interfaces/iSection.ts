import type Sections from "@/enums/Sections";

export interface iSection{
    id?: Number,
    type?: Sections|null,
    data: Object,
    order: Number
}
