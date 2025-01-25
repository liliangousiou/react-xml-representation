import { formatNodeAttrValue } from 'utils';

describe('formatNodeAttrValue function', () => {
    test('should correctly format value with multiple colons', () => {
        const value = 'urn:org:apache:tomcat:user-attr:clearance';

        const result = formatNodeAttrValue(value);

        // The expected output after splitting and grouping by colons
        expect(result).toEqual([
            'urn org',
            'apache tomcat',
            'user-attr clearance',
        ]);
    });

    test('should return a single value when there are no colons', () => {
        const value = 'false';

        const result = formatNodeAttrValue(value);

        // Should return the value as an array with one element
        expect(result).toEqual(['false']);
    });

    test('should return a single value when there is one part (no colon)', () => {
        const value = 'urn';

        const result = formatNodeAttrValue(value);

        // Should return the value as an array with one element
        expect(result).toEqual(['urn']);
    });

    test('should correctly handle values with only one pair', () => {
        const value = 'category:access-subject';

        const result = formatNodeAttrValue(value);

        // Should pair category and access-subject
        expect(result).toEqual(['category access-subject']);
    });
});
