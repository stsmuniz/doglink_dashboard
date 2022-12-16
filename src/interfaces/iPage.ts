import type {iSocialNetwork} from "@/interfaces/iSocialNetwork";


export interface iPage{
    id: Number,
    primary_color: String,
    secondary_color: String,
    background_color: String,
    text_color: String,
    custom_url?: String,
    profile_pic?: String,
    title?: String,
    tagline?: String,
    theme: String,
    social_networks: Array<iSocialNetwork>|null,
    sections: Array<iPage>|null,
}
