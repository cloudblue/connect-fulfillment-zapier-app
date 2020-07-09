module.exports = {
    id: "PRM-252-831-230-0001",
    name: "param_a",
    title: "Title of the Parameter A",
    description: "Description of the Parameter A",
    type: "text",
    scope: "asset",
    phase: "fulfillment",
    constraints: {
        required: true,
        hidden: false,
        unique: false,
        reconciliation: false
    },
    position: 10000,
    events: {
        created: {
            at: "2020-07-07T11:38:41+00:00"
        },
        updated: {
            at: "2020-07-07T11:38:41+00:00"
        }
    }
};
