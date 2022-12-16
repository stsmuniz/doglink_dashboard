import type SocialNetworks from "@/enums/SocialNetworks";

export interface iSocialNetwork{
    id?: Number,
    network?: SocialNetworks|null,
    url: String,
    order: Number
}
