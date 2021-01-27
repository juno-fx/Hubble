import React from 'react';

export default props => {
    const params = new URLSearchParams(window.location.search);
    const workstation = params.get('workstation');
    const host = `http://${workstation}:8081/vnc.html?autoconnect=true&password=password&resize=remote&quality=9&compression=9`;

    return (
        <iframe
            src={host}
            className="App-viewer"
            frameBorder={0}
        />
    )
}



