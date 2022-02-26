/*eslint-disable*/

import React from 'react';
import { {{ pascalCase name }}Props } from './types'
//@ts-ignore
import styles from './styles.scss';

const {{ pascalCase name }} = ({ }: {{ pascalCase name }}Props) => (
    <div className={styles.{{ camelCase name }} }>
        {{ pascalCase name }} Component
    </div>
)

export default React.memo({{ pascalCase name }});