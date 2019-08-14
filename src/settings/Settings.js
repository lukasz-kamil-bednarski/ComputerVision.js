export const SETTINGS = {
    funCanvasDesktopSize: {
        width: 1200,
        height: 800
    },

    funCanvasSmallDesktopSize: {
        width: 900,
        height: 600
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
                id: 4,
                name: 'gaussian filter',
                type: 'basic',
                argumentNumber: 2,
                isParametrized: true
            },
            {
                id: 6,
                name: 'laplacian filter',
                type:'filter',
                argumentNumber:1,
                isParametrized: true
            },
            {
                id: 7,
                name: 'own filter',
                type:'filter',
                argumentNumber:1,
                isParametrized: false
            },
            {
                id: 8,
                name: 'Gray-scale',
                type:'converter',
                argumentNumber:1,
                isParametrized: false,

            },
            {
                id: 9,
                name: 'erosion',
                type:'morphology',
                argumentNumber:1,
                isParametrized: false,
            },
            {
                id: 10,
                name: 'binarization',
                type:'segmentation',
                argumentNumber:1,
                isParametrized: true
            },
        ]
    ],

    parameters:
        [
            {
                id:1,
                name:'linear-combination-parameter',
                type:'range',
                min:0,
                max:1,
                step:0.01,
                defaultValue: 0.5
            },

            {
                id:2,
                name:'filter-apply-number',
                type:'range',
                min:1,
                max:10,
                step:1,
                defaultValue: 1
            },
            {
                id:3,
                name:'binarization-threshold',
                type:'range',
                inputType: 'number',
                min: 0,
                max: 255,
                step:1
            },

            {
                id:4,
                name:'kernel',
                type:'matrix',
                inputType: 'number',
                min: -10,
                max: 10,
                step:1
            }

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