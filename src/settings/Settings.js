export const SETTINGS = {
    funCanvasDesktopSize: {
        width: 1200,
        height: 800
    },

    algorithms: [
        [
            {
                id: 1,
                name: 'negative',
                type: 'basic',
                argumentNumber: 1,
                isParametrized: false
            },
            {
                id: 2,
                name: 'addition',
                type: 'basic',
                argumentNumber: 2,
                isParametrized: false
            },
            {
                id: 3,
                name: 'subtraction',
                type: 'basic',
                argumentNumber: 2,
                isParametrized: false
            },
            {
                id: 4,
                name: 'linear-combination',
                type: 'basic',
                argumentNumber: 2,
                isParametrized: true
            },

            {
                id: 5,
                name: 'gaussian filter',
                type:'filter',
                argumentNumber:1,
                isParametrized: true
            },
            {
                id: 6,
                name: 'sobel filter',
                type:'filter',
                argumentNumber:1,
                isParametrized: true
            }
        ]
    ],

    parameters:
        [
            {
                id:1,
                name:'linear-combination-parameter',
                type:'range',
                min:0,
                max:1
            },

        ]
};

export const findActionNameById = (id) => {
    for (let action of SETTINGS.algorithms[0]) {
        if (action.id === parseInt(id)) {
            return action.name;
        }
    }
    return 'None';
};