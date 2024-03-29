import type Sections from "@/enums/Sections";

export interface iSection{
    id?: Number,
    type: Sections,
    data: Object,
    order: Number
}
