// Create a workspace for Blockly
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: `
    <xml xmlns="https://developers.google.com/blockly/xml">
        <block type="extension_metadata"></block>
        <block type="block_definition"></block>
        <block type="math_addition"></block>
    </xml>
    `
});

// Define the blocks
Blockly.defineBlocksWithJsonArray([
    {
        "type": "extension_metadata",
        "message0": "Extension Name %1 Extension ID %2",
        "args0": [
            {
                "type": "field_input",
                "name": "EXT_NAME",
                "text": "MyExtension"
            },
            {
                "type": "field_input",
                "name": "EXT_ID",
                "text": "myextension"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Define the metadata for your extension"
    },
    {
        "type": "block_definition",
        "message0": "Block %1 %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "BLOCK_TYPE",
                "options": [
                    ["Reporter", "REPORTER"],
                    ["Command", "COMMAND"],
                    ["Boolean", "BOOLEAN"]
                ]
            },
            {
                "type": "field_input",
                "name": "BLOCK_TEXT",
                "text": "add [NUM1] + [NUM2]"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Define a custom block"
    },
    {
        "type": "math_addition",
        "message0": "add %1 + %2",
        "args0": [
            {
                "type": "input_value",
                "name": "NUM1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "NUM2",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Add two numbers",
        "helpUrl": ""
    }
]);

// Function to generate JavaScript code from blocks
function generateCode() {
    const extensionName = workspace.getAllBlocks().find(b => b.type === 'extension_metadata')?.getFieldValue('EXT_NAME') || "MyExtension";
    const extensionID = workspace.getAllBlocks().find(b => b.type === 'extension_metadata')?.getFieldValue('EXT_ID') || "myextension";

    let blocks = workspace.getAllBlocks().filter(b => b.type === 'block_definition');
    let blockDefinitions = blocks.map(block => {
        const blockType = block.getFieldValue('BLOCK_TYPE');
        const blockText = block.getFieldValue('BLOCK_TEXT');
        return `
            {
                opcode: '${blockText.replace(/\s/g, '')}',
                blockType: Scratch.BlockType.${blockType},
                text: '${blockText}',
                arguments: {
                    NUM1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                    NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                }
            }`;
    }).join(',');

    const code = `
(function(Scratch) {
    'use strict';
    
    class ${extensionName} {
        getInfo() {
            return {
                id: '${extensionID}',
                name: '${extensionName}',
                blocks: [
                    ${blockDefinitions}
                ]
            };
        }

        // Define the functionality for the blocks
        ${blocks.map(block => `
        ${block.getFieldValue('BLOCK_TEXT').replace(/\s/g, '')}(args) {
            return args.NUM1 + args.NUM2;
        }`).join('')}
    }
    
    Scratch.extensions.register(new ${extensionName}());
})(Scratch);
`;

    return code;
}

// Generate code and display it in the textarea
workspace.addChangeListener(() => {
    const code = generateCode();
    document.getElementById('codeArea').value = code;
});

// Export the generated code to a JS file
document.getElementById('exportButton').addEventListener('click', () => {
    const code = generateCode();
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myCustomExtension.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
