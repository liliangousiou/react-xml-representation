import { vi } from 'vitest';

import { parseXML, xmlToTree } from '.';

const xmlString = `
  <xacml3:policy xmlns:xacml3="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" policyid="access-document">
    <xacml3:description>Test Description</xacml3:description>
    <xacml3:target>
      <xacml3:anyof>
        <xacml3:allof>
          <xacml3:match matchid="urn:oasis:names:tc:xacml:1.0:function:string-equal">
            <xacml3:attributevalue>manager</xacml3:attributevalue>
          </xacml3:match>
        </xacml3:allof>
      </xacml3:anyof>
    </xacml3:target>
  </xacml3:policy>
`;

describe('parseXML', () => {
    it('should correctly parse XML into a tree structure', () => {
        // Spy on xmlToTree and mock its implementation
        const mockXmlToTree = vi
            .spyOn({ xmlToTree }, 'xmlToTree')
            .mockImplementationOnce(node => ({
                tag: node.tagName,
                value: node.firstChild
                    ? node.firstChild.textContent?.trim()
                    : '',
                attributes: Array.from(node.attributes).reduce((acc, attr) => {
                    // @ts-ignore
                    acc[attr.name] = attr.value;
                    return acc;
                }, {}),
                children: Array.from(node.children).map(child =>
                    xmlToTree(child),
                ), // Recursively handle children
            }));

        const result = parseXML(xmlString);

        expect(result).toEqual({
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
                {
                    tag: 'xacml3:target',
                    value: '',
                    attributes: {},
                    children: [
                        {
                            tag: 'xacml3:anyof',
                            value: '',
                            attributes: {},
                            children: [
                                {
                                    tag: 'xacml3:allof',
                                    value: '',
                                    attributes: {},
                                    children: [
                                        {
                                            tag: 'xacml3:match',
                                            value: '',
                                            attributes: {
                                                matchid:
                                                    'urn:oasis:names:tc:xacml:1.0:function:string-equal',
                                            },
                                            children: [
                                                {
                                                    tag: 'xacml3:attributevalue',
                                                    value: 'manager',
                                                    attributes: {},
                                                    children: [],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Clean up the spy after the test
        mockXmlToTree.mockRestore();
    });

    it('should throw an error for invalid XML', () => {
        const invalidXmlString =
            '<xacml3:policy><xacml3:description>Test</xacml3:description>'; // Invalid XML (missing closing tag)

        // Expect parseXML to throw an error indicating invalid XML
        expect(() => {
            parseXML(invalidXmlString);
        }).toThrow('Invalid XML: parse error');
    });

    it('should handle empty XML correctly', () => {
        const emptyXmlString = '<root></root>'; // Valid but empty XML

        const result = parseXML(emptyXmlString);

        // Expect an empty structure for the root element
        expect(result).toEqual({
            tag: 'root',
            value: '',
            attributes: {},
            children: [],
        });
    });
});
