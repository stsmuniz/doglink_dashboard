import type {iSection} from "@/interfaces/iSection";

const sectionsHasNullItems = (sections: Array<iSection>) => Object.values(sections)
    // @ts-ignore
    .some(section => Object.values(section)
        // @ts-ignore
        .some(element =>
            typeof element == 'object' && Object.values(element)
                // @ts-ignore
                .some(item => item === null || item === '')
        )
    )

export default sectionsHasNullItems;
