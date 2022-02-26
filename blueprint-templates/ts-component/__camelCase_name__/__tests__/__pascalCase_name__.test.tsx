import React from 'react';
import {{ pascalCase name }} from '../'
import { cleanup, render } from '@testing-library/react';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('{{ pascalCase name }} test', () => {

    test('is {{ pascalCase name }} exist', () => {
        const {{ pascalCase name }}Component = render(
            <{{ pascalCase name }}/>
        );
    })
})