import { xmlToTree } from '.';

// Mocking the DOMParser environment to simplify the test
const xmlString = `<xacml3:policy xmlns:xacml3="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" policyid="access-document">
<xacml3:description>Test Description</xacml3:description>
</xacml3:policy>`;

describe('xmlToTree', () => {
    it('should convert a simple XML element into the correct tree structure', () => {
        // Create a new DOMParser instance to parse the XML string
        const parser = new DOMParser();

        // Parse the XML string into a DOM Document
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Extract the root element of the parsed XML document (the <xacml3:policy> tag)
        const xmlElement = xmlDoc.documentElement;

        // Call the function to convert the XML element to a tree structure
        const tree = xmlToTree(xmlElement);

        // Assert that the resulting tree matches the expected structure
        expect(tree).toEqual({
            tag: 'xacml3:policy',
            value: '',
            attributes: {
                'xmlns:xacml3':
                    'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17',
                policyid: 'access-document',
            },
            children: [
                {
                    tag: 'xacml3:description',
                    value: 'Test Description',
                    attributes: {},
                    children: [],
                },
            ],
        });
    });

    it('should handle XML elements with attributes correctly', () => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const xmlElement = xmlDoc.documentElement;

        const tree = xmlToTree(xmlElement);

        // Assert that the resulting tree matches the expected structure, which includes handling attributes
        expect(tree).toEqual({
            tag: 'xacml3:policy',
            value: '',
            attributes: {
                'xmlns:xacml3':
                    'urn:oasis:names:tc:xacml:3.0:core:schema:wd-17',
                policyid: 'access-document',
            },
            children: [
                {
                    tag: 'xacml3:description',
                    value: 'Test Description',
                    attributes: {},
                    children: [],
                },
            ],
        });
    });
});
