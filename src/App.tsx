import React from 'react';

import Title from 'components/Title';
import UploadForm from 'components/UploadForm';

const App: React.FC = () => {
    return (
        <div className='container mx-auto p-4'>
            <Title />
            <UploadForm />
        </div>
    );
};

export default App;
