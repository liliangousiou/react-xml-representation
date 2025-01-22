import React from 'react';

import Title from 'components/Title';
import UploadForm from 'components/UploadForm';

const App: React.FC = () => (
    <div className="h-screen flex items-start justify-center">
        <div className="container w-full p-4">
            <Title />
            <UploadForm />
        </div>
    </div>
);

export default App;
