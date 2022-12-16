const sessionsHasNullItems = (sections) => Object.values(sections)
    .some(section => Object.values(section)
        .some(element =>
            typeof element == 'object' && Object.values(element)
                .some(item => item === null || item === '')
        )
    )

export default sessionsHasNullItems;
