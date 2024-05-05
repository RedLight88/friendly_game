// Character and sign setup
let charX = canvas.width / 2;
let charY = canvas.height / 2;
let speed = 6;
let direction = 'left';
let isModalVisible = false;
let currentOverlay = null;





const sceneConfigurations = {
    'farm': {
        'signPositions': {
            sign1: { x: 400, y: 200 },
            sign2: { x: 775, y: 180 },
            sign3: { x: 1200, y: 384 },
            sign4: { x: 390, y: 576 },
            sign5: {x: 100, y: 100}
        },
        'modalMessages': {
            sign1: "TE IUBESC",
            sign2: "Spre parc",
            sign3: "Pentru final pe aici",
            sign4: "Spre Geea",
            sign5: "Am stat zi si noapte sa fac ce am facut, e scris cu curul, dar merge, sper ca te-a distrat"
        },
        'transitions': {
            left: 'city',
            right: 'birth',
            up: 'sunny',
            down: 'farm'
        }
    },
    'sunny': {
        'signPositions': {
            sign1: {x: 700, y:650},
            sign2: {x: 900, y:650},
            sign3: {x: 1100, y:650}
        },
        'modalMessages': {
            sign1: "Aici am facut prima citire in tarot",
            sign2: "Nu ai idee cat tin la tine si cum tot ce ai facut m-a ajutat",
            sign3:"Esti cea mai buna ascultatoare"
        },
        'transitions': {
            down: 'farm'
        }
    },
    'city': {
        'signPositions': {},
        'modalMessages': {},
        'transitions': {
            right: 'farm'
        }
    },
    'birth':{
        'signPositions': {
           sign1: { x: 750, y: 512 },
           sign2: { x: 850, y: 300 },
           sign3: { x: 1000, y: 300 },
           sign4: { x: 850, y: 512 },
            sign5: { x: 1100, y: 512 },
            sign6: { x: 1000, y: 512 },
            sign7: { x: 1050, y: 412 },
            sign8: { x: 800, y: 412 }
        },
        'modalMessages': {
            sign1: "Stiai ca esti foarte desteapta?",
            sign2: "Extrem de seducatoare?",
            sign3: "Are rost sa vorbesc despre frumusete?",
            sign4: "semnat Robert",
            sign5: "Camera stanga din inima mea",
            sign6: "LA MULTI ANI",
            sign7: "Te pot asculta toata ziua",
            sign8: "Foarte interesanta si ti-o zice un om cu standarde mari",

        },
        'transitions':{
            up: 'farm'
        }
    }
};
